/* <media-slot id="..." placeholder="..."> — drag-and-drop or click to upload a VIDEO (mp4/webm/mov) or image.
   Renders into a shadow root so React-owned light DOM is never touched.
   Files are kept in IndexedDB (videos are far too large for localStorage) so a drop survives reload. */
(function () {
  if (window.customElements && customElements.get('media-slot')) return;

  var DB = 'wise-media-slots', STORE = 'files', _db = null;
  function db() {
    if (_db) return _db;
    _db = new Promise(function (res, rej) {
      var r = indexedDB.open(DB, 1);
      r.onupgradeneeded = function () { r.result.createObjectStore(STORE); };
      r.onsuccess = function () { res(r.result); };
      r.onerror = function () { rej(r.error); };
    });
    return _db;
  }
  function put(key, blob) {
    return db().then(function (d) {
      return new Promise(function (res, rej) {
        var tx = d.transaction(STORE, 'readwrite');
        tx.objectStore(STORE).put(blob, key);
        tx.oncomplete = res; tx.onerror = function () { rej(tx.error); };
      });
    });
  }
  function get(key) {
    return db().then(function (d) {
      return new Promise(function (res, rej) {
        var tx = d.transaction(STORE, 'readonly'), rq = tx.objectStore(STORE).get(key);
        rq.onsuccess = function () { res(rq.result || null); };
        rq.onerror = function () { rej(rq.error); };
      });
    });
  }
  function del(key) {
    return db().then(function (d) {
      var tx = d.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).delete(key);
      return new Promise(function (res) { tx.oncomplete = res; });
    });
  }

  var STYLE =
    ':host{position:absolute;inset:0;display:block;overflow:hidden;}' +
    ':host([data-over]){outline:2px solid var(--wuerth-red,#E30613);outline-offset:-2px;}' +
    '.fill{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;}' +
    '.empty{font:inherit;position:absolute;inset:0;width:100%;height:100%;display:flex;flex-direction:column;' +
      'align-items:center;justify-content:center;gap:9px;padding:16px;background:transparent;border:0;' +
      'cursor:pointer;text-align:center;color:var(--fg3,#8a8a8a);}' +
    '.empty:hover{background:rgba(0,0,0,.035);}' +
    '.empty svg{opacity:.8;}' +
    '.lab{font-family:var(--font-sans,inherit);font-weight:700;text-transform:uppercase;font-size:10px;letter-spacing:.11em;}' +
    '.sub{font-family:var(--font-sans,inherit);font-size:10.5px;opacity:.75;}' +
    '.clear{font:inherit;position:absolute;top:8px;right:8px;z-index:2;width:26px;height:26px;display:flex;' +
      'align-items:center;justify-content:center;font-size:14px;line-height:1;color:#fff;' +
      'background:rgba(0,0,0,.55);border:0;border-radius:2px;cursor:pointer;}' +
    'input[type=file]{display:none;}' +
    ':host(:fullscreen){position:fixed;inset:0;width:100vw;height:100vh;background:#000;}' +
    ':host(:fullscreen) .fill{object-fit:contain;}' +
    ':host(:-webkit-full-screen){position:fixed;inset:0;width:100vw;height:100vh;background:#000;}' +
    ':host(:-webkit-full-screen) .fill{object-fit:contain;}' +
    '.expand{font:inherit;position:absolute;top:8px;right:40px;z-index:2;width:26px;height:26px;display:flex;' +
      'align-items:center;justify-content:center;color:#fff;background:rgba(0,0,0,.55);border:0;border-radius:2px;cursor:pointer;}' +
    ':host(:fullscreen) .expand{right:8px;}' +
    ':host(:fullscreen) .clear{display:none;}';

  class MediaSlot extends HTMLElement {
    connectedCallback() {
      if (this._built) return;
      this._built = true;
      this._key = this.getAttribute('id') || ('slot-' + Math.random().toString(36).slice(2));
      var root = this.shadowRoot || this.attachShadow({ mode: 'open', clonable: true });
      root.innerHTML = '<style>' + STYLE + '</style><div data-stage></div><input type="file" accept="video/*,image/*">';
      this._stage = root.querySelector('[data-stage]');
      this._input = root.querySelector('input[type=file]');
      this._input.addEventListener('change', function () {
        var f = this._input.files && this._input.files[0];
        if (f) this._accept(f);
      }.bind(this));
      this._wireDnd();
      this._renderEmpty();
      get(this._key).then(function (b) { if (b) this._show(b); }.bind(this)).catch(function () {});
    }

    disconnectedCallback() {
      this._closeTheater();
      if (this._url) { URL.revokeObjectURL(this._url); this._url = null; }
    }

    _renderEmpty() {
      var ph = this.getAttribute('placeholder') || 'Drop a video or image';
      this._stage.innerHTML =
        '<button type="button" class="empty">' +
          '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">' +
            '<rect x="2.5" y="5.5" width="13" height="13" rx="1.5"></rect><path d="M15.5 10.5 21.5 7v10l-6-3.5z"></path></svg>' +
          '<span class="lab">' + ph + '</span>' +
          '<span class="sub">MP4, WebM, MOV or image — click or drag in</span>' +
        '</button>';
      this._stage.querySelector('.empty').addEventListener('click', function () { this._input.click(); }.bind(this));
    }

    _wireDnd() {
      var self = this;
      ['dragenter', 'dragover'].forEach(function (t) {
        self.addEventListener(t, function (e) { e.preventDefault(); self.setAttribute('data-over', ''); });
      });
      ['dragleave', 'drop'].forEach(function (t) {
        self.addEventListener(t, function () { self.removeAttribute('data-over'); });
      });
      self.addEventListener('drop', function (e) {
        e.preventDefault();
        var f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) self._accept(f);
      });
    }

    _accept(file) {
      if (!/^(video|image)\//.test(file.type)) return;
      put(this._key, file).catch(function () {});
      this._show(file);
    }

    toggleFullscreen() {
      var doc = document;
      var active = doc.fullscreenElement || doc.webkitFullscreenElement;
      if (active === this) {
        if (doc.exitFullscreen) doc.exitFullscreen();
        else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen();
        return;
      }
      if (this._theater) { this._closeTheater(); return; }

      var supported = doc.fullscreenEnabled || doc.webkitFullscreenEnabled;
      var req = this.requestFullscreen || this.webkitRequestFullscreen;
      if (supported && req) {
        var self = this;
        try {
          var p = req.call(this);
          if (p && p.then) {
            p.then(function () { self._armInlineMedia(); })
             .catch(function () { self._openTheater(); });
            return;
          }
          this._armInlineMedia();
          return;
        } catch (e) { /* fall through to theater */ }
      }
      this._openTheater();
    }

    _armInlineMedia() {
      var v = this._stage && this._stage.querySelector('video');
      if (v) { v.controls = true; v.muted = false; }
    }

    /* In-page theater: a fixed overlay on <body>, so no ancestor (sticky panel,
       scrolling modal) can clip it — used when the Fullscreen API is blocked. */
    _openTheater() {
      if (!this._url || this._theater) return;
      var self = this;
      var isVideo = /^video\//.test(this._type || '');

      var ov = document.createElement('div');
      ov.setAttribute('data-media-theater', '');
      ov.style.cssText = 'position:fixed;inset:0;z-index:2000;background:#000;display:flex;' +
        'align-items:center;justify-content:center;padding:0;';

      var el = document.createElement(isVideo ? 'video' : 'img');
      el.src = this._url;
      el.style.cssText = 'max-width:100vw;max-height:100vh;width:100%;height:100%;object-fit:contain;display:block;';
      if (isVideo) { el.autoplay = true; el.loop = true; el.controls = true; el.playsInline = true; }

      var close = document.createElement('button');
      close.type = 'button';
      close.setAttribute('aria-label', 'Close full screen');
      close.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"></path></svg>';
      close.style.cssText = 'position:absolute;top:18px;right:18px;z-index:2;width:40px;height:40px;display:flex;' +
        'align-items:center;justify-content:center;color:#fff;background:rgba(255,255,255,.14);' +
        'border:1px solid rgba(255,255,255,.3);border-radius:4px;cursor:pointer;';

      ov.appendChild(el);
      ov.appendChild(close);
      document.body.appendChild(ov);

      close.addEventListener('click', function (e) { e.stopPropagation(); self._closeTheater(); });
      ov.addEventListener('click', function (e) { if (e.target === ov) self._closeTheater(); });
      this._esc = function (e) { if (e.key === 'Escape') { e.stopPropagation(); self._closeTheater(); } };
      window.addEventListener('keydown', this._esc, true);

      this._theater = ov;
    }

    _closeTheater() {
      if (this._esc) { window.removeEventListener('keydown', this._esc, true); this._esc = null; }
      if (this._theater) { this._theater.remove(); this._theater = null; }
    }

    _show(blob) {
      if (this._url) URL.revokeObjectURL(this._url);
      this._url = URL.createObjectURL(blob);
      this._type = blob.type || '';
      var isVideo = /^video\//.test(blob.type || '');
      this._stage.innerHTML =
        (isVideo
          ? '<video class="fill" src="' + this._url + '" autoplay muted loop playsinline></video>'
          : '<img class="fill" src="' + this._url + '" alt="">') +
        '<button type="button" class="expand" title="Full screen">' +
          '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M9 3H3v6M15 3h6v6M15 21h6v-6M9 21H3v-6"></path></svg>' +
        '</button>' +
        '<button type="button" class="clear" title="Remove">\u00D7</button>';
      var self = this;
      var media = this._stage.querySelector('.fill');
      this._stage.querySelector('.expand').addEventListener('click', function (e) {
        e.stopPropagation();
        self.toggleFullscreen();
      });
      if (media) media.addEventListener('dblclick', function (e) { e.stopPropagation(); self.toggleFullscreen(); });
      this._stage.querySelector('.clear').addEventListener('click', function (e) {
        e.stopPropagation();
        self._closeTheater();
        del(self._key).catch(function () {});
        if (self._url) { URL.revokeObjectURL(self._url); self._url = null; }
        self._renderEmpty();
      });
    }
  }

  customElements.define('media-slot', MediaSlot);
})();
