<#
.SYNOPSIS
  Pull the latest Claude Design handoff bundle into this repo, then optionally commit + deploy.

.DESCRIPTION
  This repo is a MIRROR of a Claude Design project. Nobody hand-edits the site files --
  every change starts in Claude Design (claude.ai/design), gets exported as a handoff
  bundle, and lands here through this script.

  The script is idempotent and destructive-by-design on the mirrored folders:
  `_ds/` and `assets/` are wiped before each sync, because Claude Design renames the
  design-system folder (it carries a UUID) whenever the design system is re-exported.
  Without the wipe, stale copies would pile up and get deployed.

.PARAMETER Bundle
  Path to the extracted handoff folder. Defaults to the newest folder in ~\Downloads
  whose name contains "handoff".

.PARAMETER DesignFile
  Which .dc.html inside the bundle is the site. Defaults to design.config.json's
  designFile. Passing this updates the config, so the next sync remembers it.

.PARAMETER Commit
  Also `git add -A` and commit the result.

.PARAMETER PublishMockup
  Push the result to the THROWAWAY mockup host in design.config.json. This repo has no
  real deployment target wired in -- the site is going to Azure. Use this only to refresh
  the temporary presentation link.

.EXAMPLE
  .\scripts\sync-from-claude-design.ps1
  .\scripts\sync-from-claude-design.ps1 -Commit
  .\scripts\sync-from-claude-design.ps1 -DesignFile "WISE Portfolio v3.dc.html" -Commit
#>
[CmdletBinding()]
param(
  [string]$Bundle,
  [string]$DesignFile,
  [switch]$Commit,
  [switch]$PublishMockup
)

$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent $PSScriptRoot
$configPath = Join-Path $repo 'design.config.json'

function Say($msg)  { Write-Host "  $msg" }
function Step($msg) { Write-Host "`n== $msg" -ForegroundColor Cyan }
function Die($msg)  { Write-Host "`nX  $msg" -ForegroundColor Red; exit 1 }

$config = Get-Content -LiteralPath $configPath -Raw | ConvertFrom-Json

# ---------------------------------------------------------------- locate bundle
Step 'Locating the handoff bundle'
if (-not $Bundle) {
  $downloads = Join-Path $env:USERPROFILE 'Downloads'
  $Bundle = Get-ChildItem -LiteralPath $downloads -Directory -ErrorAction SilentlyContinue |
            Where-Object { $_.Name -like '*handoff*' } |
            Sort-Object LastWriteTime -Descending |
            Select-Object -First 1 -ExpandProperty FullName
  if (-not $Bundle) { Die "No '*handoff*' folder found in $downloads. Pass -Bundle <path>." }
  Say "auto-picked newest: $Bundle"
}
if (-not (Test-Path -LiteralPath $Bundle)) { Die "Bundle not found: $Bundle" }

# The export nests one level: <bundle>\<project-slug>\project\
$projectDir = Get-ChildItem -LiteralPath $Bundle -Directory -Recurse -Depth 2 |
              Where-Object { $_.Name -eq 'project' } |
              Sort-Object LastWriteTime -Descending |
              Select-Object -First 1 -ExpandProperty FullName
if (-not $projectDir) { Die "No 'project' folder inside the bundle: $Bundle" }
Say "project dir: $projectDir"

# ------------------------------------------------------------ pick design file
Step 'Choosing the design file'
if (-not $DesignFile) { $DesignFile = $config.designFile }
$designPath = Join-Path $projectDir $DesignFile
if (-not (Test-Path -LiteralPath $designPath)) {
  Write-Host "`nX  '$DesignFile' is not in this bundle." -ForegroundColor Red
  Write-Host "   Designs available:" -ForegroundColor Yellow
  Get-ChildItem -LiteralPath $projectDir -Filter '*.dc.html' |
    ForEach-Object { Write-Host "     -DesignFile `"$($_.Name)`"" }
  Die 'Re-run with one of the -DesignFile values above.'
}
Say "using: $DesignFile"

# ------------------------------------------------------------------- mirror in
Step 'Mirroring bundle -> repo'
# Wipe first: the _ds folder name carries a UUID that changes between exports.
foreach ($dir in 'assets', '_ds') {
  $target = Join-Path $repo $dir
  if (Test-Path -LiteralPath $target) { Remove-Item -LiteralPath $target -Recurse -Force }
  $source = Join-Path $projectDir $dir
  if (Test-Path -LiteralPath $source) { Copy-Item -LiteralPath $source -Destination $target -Recurse; Say "$dir/  copied" }
}
Get-ChildItem -LiteralPath $repo -Filter '*.js' -File | Remove-Item -Force
Get-ChildItem -LiteralPath $projectDir -Filter '*.js' -File |
  ForEach-Object { Copy-Item -LiteralPath $_.FullName -Destination (Join-Path $repo $_.Name); Say "$($_.Name)  copied" }

# ---------------------------------------------------------- html -> index.html
Step 'Writing index.html'
$html = [System.IO.File]::ReadAllText($designPath)
# Claude Design exports have no <title>, so the browser tab would show the bare URL.
# Inject one; skip if a future export starts shipping its own.
if ($html -notmatch '(?i)<title[\s>]') {
  $anchor = '</head>'
  if ($html.Contains($anchor)) {
    $html = $html.Replace($anchor, "<title>$($config.title)</title>`n$anchor")
    Say "injected <title>$($config.title)</title>"
  } else {
    Say 'WARNING: no </head> found -- title not injected'
  }
} else {
  Say 'design already has a <title>; left alone'
}
[System.IO.File]::WriteAllText((Join-Path $repo 'index.html'), $html, (New-Object System.Text.UTF8Encoding($false)))

# --------------------------------------------------------------- remember file
if ($config.designFile -ne $DesignFile) {
  $config.designFile = $DesignFile
  $config | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $configPath -Encoding utf8
  Say "design.config.json updated -> $DesignFile"
}

# ------------------------------------------------------------------ what moved
Step 'Changes'
Push-Location $repo
try {
  $status = git status --porcelain
  if (-not $status) { Say 'nothing changed -- repo already matches the bundle' }
  else { $status | ForEach-Object { Say $_ } }

  if ($Commit -and $status) {
    Step 'Committing'
    git add -A
    git commit -m "design: sync from Claude Design handoff ($DesignFile)" | Out-Null
    Say (git log -1 --oneline)
  }

  if ($PublishMockup) {
    $mock = $config.mockupHost
    Step "Publishing to the TEMPORARY mockup host ($($mock.provider))"
    Write-Host "   Throwaway presentation link, NOT this repo's deployment target." -ForegroundColor Yellow
    Write-Host "   The real target is Azure. Do not build anything on top of this URL." -ForegroundColor Yellow
    # Link on demand and tear the link down again, so the repo stays host-agnostic at rest.
    try {
      vercel link --cwd $repo --yes --project $mock.project --scope $mock.scope
      vercel deploy $repo --prod --yes --scope $mock.scope
      Say "live: $($mock.url)"
    }
    finally {
      $linkState = Join-Path $repo '.vercel'
      if (Test-Path -LiteralPath $linkState) { Remove-Item -LiteralPath $linkState -Recurse -Force; Say 'link state torn down' }
    }
  }
}
finally { Pop-Location }

Write-Host "`nDone." -ForegroundColor Green
