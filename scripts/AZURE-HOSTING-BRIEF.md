# Azure hosting brief — where this site can actually live

**Written 2026-08-05, from the Co-worker hub at Keven's instruction.** It carries the Azure
ground truth as of that date into this repo and answers the one open question in `README.md`:
*"This repo has no deployment target wired in. It is going to Azure"* — going **where**, exactly.

Read this before anyone opens an IT ticket or picks a host. Nothing in this file is an
instruction to change code; it is a decision brief.

---

## Headline

**Nothing in this repo is stale.** The big Azure breakthrough of the last week — a proven deploy
channel — changes nothing here, because this repo never claimed a deploy problem in the first
place. What *does* land here is two live Azure reads that decide the hosting question:

1. The `Modify` policy that walls off every other Würth app **matches `Microsoft.Web/sites` only
   and never touches Static Web Apps.** No policy in this tenant mentions `staticSites` at all.
2. **Azure Static Web Apps is not offered in Germany West Central**, where every other resource
   we own lives.

So the candidate list is short and the trade-off is sharp: a region question, or an ingress
question. Pick deliberately, and put both into one ticket.

---

## STALE — none

This is the honest result, not a disappointment. The hub's two loudest corrections this week were
aimed at repos that believed *"there is no proven deploy channel"* and *"the private endpoint is
the deploy channel."* **Neither sentence, nor anything like it, exists in this repo.**

Verified by `grep -n -i -E "azure|deploy|blocked|blocker|private endpoint|ingress|no proven|ticket"`
across `README.md`, `design.config.json`, `scripts/PENDING-BACKFILL.md`,
`scripts/sync-from-claude-design.ps1` and `.vercelignore` → **zero hits for blocker language.**
The strongest hosting claim the repo makes is `README.md:7`:

> **This repo has no deployment target wired in. It is going to Azure**

Still true on 2026-08-05. **Do not send this project a correction notice.** Send it the hosting
decision below instead.

---

## UNBLOCKED — the estate's defining wall does not reach a Static Web App

Every other Würth project on this subscription is shaped by one central `Modify` policy that
forces `publicNetworkAccess=Disabled`. **It cannot apply to a Static Web App.** Read live
2026-08-05:

```
az policy definition list \
  --query "[?displayName=='Configure App Service apps to disable public network access']"
```

Definition `2374605e-3e0b-492b-9046-229af202562c`, `policyRule.if.allOf[0]`:

```json
{ "field": "type", "equals": "Microsoft.Web/sites" }
```

`Microsoft.Web/staticSites` is a **different resource type** and does not match. Widening the
search confirms there is no second policy waiting:

| Live query (2026-08-05) | Result |
|---|---|
| `length([?contains(to_string(policyRule),'staticSites')])` | **0** |
| `length([?contains(displayName,'Static Web')])` | **0** |
| `length(@)` / `length([?policyType=='Custom'])` | 3,900 definitions total, 226 of them tenant-custom |

The **role** side is already settled and needs no ticket —
`Co-worker/library/wurth-azure/MIGRATION-PLAYBOOK.md:311` records `Microsoft.Web` as appearing
*"not once, in any form"* in the 50-entry `notActions` list, naming **`staticSites`** explicitly
as permitted by role.

> ⚠️ **ASK Würth IT — do not exploit this.** Absence of a policy is not permission. A public,
> unauthenticated, Würth-branded page is precisely what those guardrails exist to prevent, and
> shipping one through a gap in resource-type matching is how a project acquires an enemy in
> governance. Suggested wording:
>
> *"Static Web Apps appears to sit outside the App Service guardrails initiative — is that
> intentional, and will you permit a public `*.azurestaticapps.net` hostname on a Würth-branded
> page?"*

*(Skill: `azure-rbac` — 28 official Microsoft Azure skills are now installed at user scope and
load in every session, including this repo's.)*

---

## NOW EASIER — but with two new constraints that must go in the SAME ticket

### 1. Static Web Apps is not available in our region

```
az provider show -n Microsoft.Web \
  --query "resourceTypes[?resourceType=='staticSites'].locations"
→ ["Central US", "East US 2", "West US 2", "West Europe", "East Asia"]
```

Provider `registrationState: Registered`. **Germany West Central is absent.** Every App Service we
run (`cpstaging-app`, `wise-brain-app`, `wise-around-player`) and all four of our resource groups
are in Germany West Central.

⇒ **If SWA is the answer, it means West Europe, and that is a data-residency question, not a
config detail.** Put region and permission in one ticket rather than discovering the region
constraint after IT has already said yes to the resource type.

*(Skill: `azure-resource-lookup`.)*

### 2. Storage static website (`$web`) is region-compatible, but comes pre-shaped

Two custom policy definitions read live 2026-08-05 already decide most of this shape:

| Definition | What it means here |
|---|---|
| `Deny-StorageAccount-CustomDomain` — *"Storage Accounts with custom domains assigned should be denied"* | **No custom domain on the storage account.** The URL would stay `*.z*.web.core.windows.net`. |
| `DNS-Microsoft.Storage-storageAccounts-web` — *"Private Endpoint DNS-Integration"*, targeting the storage **`web`** sub-resource specifically | The tenant's paved road for `$web` is a **private endpoint** — i.e. internal-only. |

That second row lands you back on the estate's real critical path.
`MIGRATION-PLAYBOOK.md:158` — *"the deploy channel is no longer the thing that blocks a migration
on this estate. **Ingress for users still is**"*.

⇒ **Cost the two shapes side by side before the ask:**

- **(a) SWA in West Europe** — public by default, no policy governs it, wrong region.
- **(b) Storage `$web` in Germany West Central** — right region, no custom domain possible,
  private-endpoint DNS machinery already exists which implies internal-only.

Note `allowSharedKey=false` does **not** kill SAS (playbook §0.2, corrected 2026-08-04) if signed
reads ever become useful.

*(Skill: `azure-storage`.)*

> **If the answer ever turns out to be an App Service after all** — and only then — the ask is an
> **exemption**, never an exclusion, and it needs **two** permissions:
> `Microsoft.Authorization/policyExemptions/write` **and**
> `Microsoft.Authorization/policyAssignments/exempt/action` on **both** assignments
> (`0fd72897451b4c31ad716bb3` inside initiative `Enforce-Guardrails-AppServices`, and standalone
> `2556b05e99ac4f4ea89e66a0`). Grant only the first and the exemption silently cannot be created.
> ⚠️ **UNVERIFIED:** whether an exemption actually suppresses a `Modify` effect specifically. The
> docs imply it; no page states it. **Do not promise IT an outcome we cannot cite.**

---

## UNCHANGED — the honest list

**Three of the loudest items in the hub's ground truth do not apply here. Scope them out
explicitly so nobody re-derives them in three weeks:**

- The proven `WEBSITE_RUN_FROM_PACKAGE` deploy channel, the `/robots933456.txt` startup
  crash-loop trap, and the container start timeout are **all irrelevant to this repo.** It is pure
  static: `git ls-files` (excluding the mirrored `assets/` and `_ds/`) is exactly ten files — no
  `package.json`, no Dockerfile, no `infra/`, no bicep, no server process. "Deploy" here is one
  `az storage blob upload-batch` or one SWA CLI push. It was never the blocker.
- `.claude/launch.json:7` binds `127.0.0.1`, but that is the **local** `python -m http.server`
  preview and is correct there. There is no production bind address to get wrong.

**Undocumented, and the most consequential thing found in the repo:** the page loads **executable
third-party JavaScript from a CDN with no integrity pin**, and `README.md` does not mention it.

```js
// index.html:73
const dm = await import('https://esm.sh/dotted-map@2.2.1');
```

A dynamic ES-module import **cannot carry an `integrity` attribute**, so whatever `esm.sh` returns
executes with this page's origin. It is failure-tolerant (`index.html:76` catches and sets
`window.__WISE_DOTMAP_ERR`) — tolerant of *failure*, not of *substitution*. The README's "Things
worth knowing" block (`README.md:52-66`) documents `flagcdn` only, and frames it as a presentation
risk. **Route to Kai.** Options are vendoring the `dotted-map` bundle into `_ds/` via Claude
Design, or accepting and documenting the risk. Nothing in the Azure material helps — this is a
supply-chain question, not a hosting one.

**The served page contacts FOUR external hosts on every load; the README documents one.** This is
the real "will it even render inside Würth" question, and it is **independent of which host you
pick**:

| Host | Where | Pinned? | Conditional? |
|---|---|---|---|
| `esm.sh` (`dotted-map@2.2.1`) | `index.html:73` | **No — cannot be** | no |
| `unpkg.com` (React + ReactDOM 18.3.1) | `support.js:1073`/`1075`, SRI at `1074`/`1076` | yes (SRI) | **No — unconditional** |
| `flagcdn.com` | 24 `<img src>` from `index.html:990` | n/a | no |
| `unpkg.com` (`@babel/standalone`) | const `support.js:1077`, `ensureBabel()` `support.js:1106` | yes (SRI) | lazy — **UNVERIFIED** whether it fires on this page |

The React fetch is genuinely unconditional: `loadReactUmd().then(init)` runs at `support.js:1837`
in a top-level IIFE, its only short-circuit is `if (w.React && w.ReactDOM)` at `support.js:1770`,
and `index.html` defines no override map (`grep -c "__resources" index.html` → 0; `__resourceBlobs`
→ 0). `support.js` is loaded at `index.html:6`.

> ✂️ **Correction to an earlier draft of this brief: `unsplash` is NOT a runtime dependency.**
> `grep -c -i "unsplash" index.html` → **0**. The only reference is a referral-URL constant at
> `image-slot.js:108-109` inside attribution/credit-validator machinery carried by the Claude
> Design export. No Unsplash photo is on the site. **Keep it out of the IT ticket.**

**The one open item with a destructive deadline** — `scripts/PENDING-BACKFILL.md:3-5`:

> **Added 2026-08-04. This change is NOT in Claude Design and WILL be wiped by the next
> `sync-from-claude-design.ps1` run.**

The wipe is real, not theoretical. `scripts/sync-from-claude-design.ps1:103-117` reads the
`.dc.html` and does a wholesale `File.WriteAllText(index.html, ...)`; lines `91-99` additionally
`Remove-Item -Recurse` on `assets/` and `_ds/` and delete every root `*.js` before copying. The
logo shipped as commit `188881a`. **Nothing in the Azure material helps — this needs a Claude
Design session, and it should happen before anyone runs the sync script again.**

**A deferred CI question is coupled to the hosting decision.** `scripts/PENDING-BACKFILL.md:62-66`:

> The nav WISE mark is the violet→magenta **gradient** variant, which `CD-RULES.md` §"SANCTIONED
> EXCEPTION" restricts to internal team-identity surfaces and prohibits on external/customer-facing
> ones. Keven's call on 2026-08-04 was to leave it as out of scope for this change.

Every candidate host above makes this site customer-facing, and the exposure already exists today
— `README.md:54-55`: *"**The mock-up link is public.** No password, no deployment protection."*
**Settle with Brigitte AFTER the host is chosen, not before** — the answer depends on whether the
endpoint is public. The fix, if needed, is the solid `#CC0000` `WISE-logo2026-Image-BG.png`
(`scripts/PENDING-BACKFILL.md:65`).

**Housekeeping, low priority.** The Vercel CLI still lives in `scripts/sync-from-claude-design.ps1:148-149`
(`vercel link` / `vercel deploy`) under the pre-rename scope in `design.config.json:8-9`
(`"provider": "vercel"`, `"scope": "rebt"`). `.claude/` is untracked (`git status --porcelain` →
`?? .claude/`), there is no `CLAUDE.md`, and `assets/hero-loop.mp4` is 19,254,281 bytes — **84% of
a 22 MB repo**, for a file `README.md:61-62` already flags as unused. *(Note: the hub retired the
Vercel **plugin** in commit `ca5064b` — the Claude plugin, not the CLI. This is a loose end, not a
contradiction.)*

---

## What to do in your next session

1. **Load the site once from inside the Würth network with devtools open** and record which of the
   four external hosts resolve. Ten minutes, no ticket, no permission — and it decides whether an
   internal-only Azure host renders a complete page or a broken one. **Do this first; it may
   change which host you want.**
2. **Re-apply the Würth logo in Claude Design** (*Redesign website Wise colors* →
   `WISE Portfolio v2.dc.html`) using the markup and CSS already written out at
   `scripts/PENDING-BACKFILL.md:26-48`, then delete that file. This is the only item here with a
   destructive deadline — the next sync wipes it.
3. **Pick a shape: SWA in West Europe, or Storage `$web` in Germany West Central.** Cost both
   before you write anything to IT.
4. **Send Würth IT ONE ticket** carrying resource type *and* region together — the SWA-guardrails
   question and the West Europe residency question in the same message.
5. **Route the `esm.sh` unpinned dynamic import to Kai** (`index.html:73`). Independent of
   everything above.
6. **Then, once the host is known:** settle the gradient-WISE-mark question with Brigitte, replace
   `-PublishMockup` rather than leaving it beside the new path, commit `.claude/launch.json`, add a
   short `CLAUDE.md` carrying the one rule (`README.md:18`), and drop `hero-loop.mp4` from the
   upload set. Skip a native agent team — not warranted for a mirror repo with one rule and one
   script.

---

## สรุปสั้นๆ

- **ไม่มีอะไรใน repo นี้ล้าสมัย** ข่าวใหญ่เรื่อง Azure สัปดาห์นี้ (หา deploy channel เจอแล้ว)
  ไม่กระทบที่นี่ เพราะ repo นี้ไม่เคยบอกว่าติดปัญหา deploy ตั้งแต่แรก
- คำถามเดียวที่ยังเปิดอยู่คือ **จะเอาเว็บไปวางที่ไหนบน Azure** และมีสองทางเลือก:
  - **Static Web Apps** — policy ตัวที่กั้นแอปอื่นๆ ทั้งหมด **ใช้กับ SWA ไม่ได้** แต่
    **ไม่มีให้ใช้ที่ Germany West Central** ต้องไป West Europe = เรื่อง data residency
  - **Storage `$web`** — region ถูก แต่ **ใส่ custom domain ไม่ได้** และ tenant นี้วางทางไว้ให้เป็น
    private endpoint = เข้าได้เฉพาะภายใน
- **ห้ามเงียบๆ ไปสร้าง SWA เอง** — การที่ไม่มี policy ห้าม ไม่ได้แปลว่าอนุญาต ต้องถาม IT ก่อน
  และถามทั้งสองเรื่อง (ชนิด resource + region) ในตั๋วใบเดียว
- **สิ่งที่ต้องทำก่อนเพื่อน:** เปิดเว็บจากในเน็ตเวิร์ค Würth ดูสัก 10 นาที ว่า CDN ภายนอก 4 เจ้า
  โหลดผ่านไหม — ไม่ต้องขออนุญาตใคร แต่ตัดสินใจได้เลยว่าโฮสต์แบบภายในอย่างเดียวจะใช้ได้หรือเว็บพัง
- **ของที่มีเดดไลน์จริง:** โลโก้ Würth ที่แก้มือไว้จะโดน sync ทับหาย ต้องเอาไปใส่ใน Claude Design
  ก่อนรันสคริปต์ sync รอบหน้า
