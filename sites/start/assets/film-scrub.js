/* ============================================================
   GameFilmNow — "LIGHTS ON." footage scrub engine (Lane B)
   One continuous Higgsfield-generated shot, scrubbed on canvas.
   ImageBitmap sliding window (anti-jank core), lerped playhead,
   beat overlays, timecode/chapter readout, ambient dust,
   ?jump/__ready dev contract. Falls back to the static poster
   under reduced-motion / no frames.
   ============================================================ */
(function () {
  const FRAME_COUNT = window.FILM_FRAMES || 300;
  const FRAME_PATH = i => `assets/frames/f_${String(i).padStart(4, '0')}.jpg`;
  const SEAM = window.FILM_SEAM || '#0a0a0c';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const JUMP = new URLSearchParams(location.search).get('jump');
  if (JUMP !== null) history.scrollRestoration = 'manual';

  const stage = document.getElementById('filmStage');
  const canvas = document.getElementById('filmCanvas');
  if (!stage || !canvas) { window.__ready = true; return; }

  /* ---------- static fallback ---------- */
  if (reduced) {
    document.documentElement.classList.add('static-film');
    canvas.style.display = 'none';
    document.querySelectorAll('.beat').forEach(b => { b.style.opacity = 1; b.style.position = 'relative'; });
    window.__ready = true;
    return;
  }

  const ctx = canvas.getContext('2d');
  const DPR = Math.min(devicePixelRatio || 1, 1.5);

  /* ---------- frame store: ImageBitmap sliding window ---------- */
  const bitmaps = new Array(FRAME_COUNT + 1);
  const loading = new Set();
  let inFlight = 0;
  const AHEAD = 18, EVICT = 28, MAX_CONC = 6;

  function pump(center) {
    for (let d = 0; d <= AHEAD && inFlight < MAX_CONC; d++) {
      for (const i of [center + d, center - d]) {
        if (i < 1 || i > FRAME_COUNT || bitmaps[i] || loading.has(i)) continue;
        loading.add(i); inFlight++;
        fetch(FRAME_PATH(i))
          .then(r => { if (!r.ok) throw 0; return r.blob(); })
          .then(createImageBitmap)
          .then(bm => { bitmaps[i] = bm; })
          .catch(() => {})
          .finally(() => { loading.delete(i); inFlight--; });
        if (inFlight >= MAX_CONC) break;
      }
    }
    for (let i = 1; i <= FRAME_COUNT; i++) {
      if (bitmaps[i] && Math.abs(i - center) > EVICT) { bitmaps[i].close(); bitmaps[i] = null; }
    }
  }
  function nearest(i) {
    if (bitmaps[i]) return bitmaps[i];
    for (let d = 1; d < FRAME_COUNT; d++) {
      if (bitmaps[i - d]) return bitmaps[i - d];
      if (bitmaps[i + d]) return bitmaps[i + d];
    }
    return null;
  }

  /* ---------- layout ---------- */
  function size() {
    canvas.width = innerWidth * DPR;
    canvas.height = innerHeight * DPR;
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
  }
  size(); addEventListener('resize', size);

  function draw(bm) {
    if (!bm) return;
    const cw = canvas.width, ch = canvas.height;
    const s = Math.max(cw / bm.width, ch / bm.height);
    const w = bm.width * s, h = bm.height * s;
    ctx.drawImage(bm, (cw - w) / 2, (ch - h) / 2, w, h);
  }

  /* ---------- scroll → progress ---------- */
  let target = 1, current = 1, lastDrawn = -1;
  function progress() {
    const r = stage.getBoundingClientRect();
    const total = r.height - innerHeight;
    const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
    target = 1 + p * (FRAME_COUNT - 1);
    return p;
  }

  /* ---------- beats (copy over the film) ---------- */
  const beats = Array.from(document.querySelectorAll('.beat')).map(el => ({
    el, from: +el.dataset.from, to: +el.dataset.to
  }));
  const chapters = [
    [0.00, 'Blackout'], [0.06, 'Lights on'], [0.22, 'The drive'],
    [0.42, 'The play'], [0.62, 'The lens'], [0.80, 'Every screen']
  ];
  const tc = document.getElementById('tc'), tcChap = document.getElementById('tcChap');
  const hdr = document.querySelector('.site-header');

  function overlays(p) {
    for (const b of beats) {
      const inR = p >= b.from && p <= b.to;
      let o = 0;
      if (inR) {
        const span = b.to - b.from, e = 0.18 * span;
        o = Math.min(1, (p - b.from) / e, (b.to - p) / e);
      }
      b.el.style.opacity = o.toFixed(3);
      b.el.style.visibility = o > 0.01 ? 'visible' : 'hidden';
    }
    if (tc) {
      const totalF = Math.round(p * 24 * 30);
      const s = Math.floor(totalF / 24), f = totalF % 24;
      tc.textContent = `00:00:${String(s).padStart(2, '0')}:${String(f).padStart(2, '0')}`;
      let name = chapters[0][1];
      for (const [at, n] of chapters) if (p >= at) name = n;
      const post = document.getElementById('afterFilm');
      if (post && post.getBoundingClientRect().top < innerHeight * 0.5) name = 'The funnel';
      tcChap.textContent = name;
    }
  }

  /* adaptive header: sample the drawn frame's top strip */
  let lastLum = 0;
  setInterval(() => {
    if (lastDrawn < 0) return;
    try {
      const d = ctx.getImageData(0, 0, Math.min(canvas.width, 600), 24).data;
      let sum = 0, n = 0;
      for (let i = 0; i < d.length; i += 40) { sum += 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]; n++; }
      lastLum = sum / n;
      hdr && hdr.classList.toggle('on-light', lastLum > 140);
    } catch (e) { }
  }, 180);

  /* ---------- ambient dust over first 7% ---------- */
  const dustC = document.getElementById('filmDust');
  let dustAlpha = 1;
  if (dustC) {
    const dctx = dustC.getContext('2d');
    const spr = document.createElement('canvas'); spr.width = spr.height = 32;
    const sc = spr.getContext('2d');
    const g = sc.createRadialGradient(16, 16, 0, 16, 16, 16);
    g.addColorStop(0, 'rgba(255,235,160,.9)'); g.addColorStop(1, 'rgba(255,235,160,0)');
    sc.fillStyle = g; sc.fillRect(0, 0, 32, 32);
    const parts = Array.from({ length: 40 }, () => ({ x: Math.random(), y: Math.random(), z: .3 + Math.random() * .7, ph: Math.random() * 6.28 }));
    let t = 0;
    const dsize = () => { dustC.width = dustC.offsetWidth; dustC.height = dustC.offsetHeight; };
    dsize(); addEventListener('resize', dsize);
    (function df() {
      if (dustAlpha > 0) {
        t += .016; dctx.clearRect(0, 0, dustC.width, dustC.height);
        for (const p of parts) {
          const tw = .55 + .45 * Math.sin(t * 1.4 + p.ph), s = 4 + p.z * 12;
          dctx.globalAlpha = dustAlpha * tw * p.z * .8;
          dctx.drawImage(spr, (p.x * dustC.width + t * 14 * p.z) % dustC.width, (p.y * dustC.height + Math.sin(t * .5 + p.ph) * 24 * p.z + dustC.height) % dustC.height, s, s);
        }
      } else dctx.clearRect(0, 0, dustC.width, dustC.height);
      requestAnimationFrame(df);
    })();
  }

  /* ---------- main loop ---------- */
  let jankLast = performance.now(), jankDeltas = [];
  function tick(now) {
    const p = progress();
    current += (target - current) * 0.14;
    const idx = Math.round(current);
    const bm = nearest(idx);
    if (bm && idx !== lastDrawn) { draw(bm); lastDrawn = idx; }
    pump(idx);
    overlays(p);
    dustAlpha = Math.max(0, 1 - p / 0.06);
    jankDeltas.push(now - jankLast); jankLast = now;
    requestAnimationFrame(tick);
  }
  setInterval(() => { if (jankDeltas.length) { window.__jankMax = Math.max(...jankDeltas); jankDeltas = []; } }, 2000);

  /* ---------- smooth scroll ---------- */
  if (JUMP === null && window.Lenis) {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
  }

  /* ---------- boot: decode first frame, then contract ---------- */
  fetch(FRAME_PATH(1)).then(r => r.blob()).then(createImageBitmap).then(bm => {
    bitmaps[1] = bm; draw(bm); lastDrawn = 1;
    requestAnimationFrame(tick);
    const settle = () => {
      if (JUMP !== null) {
        scrollTo(0, +JUMP || 0);
        const p = progress();
        current = target; // force-settle the lerp
        const idx = Math.round(current);
        const b2 = nearest(idx); if (b2) { draw(b2); lastDrawn = idx; }
        overlays(p);
        // wait for the exact frame before declaring ready
        const t0 = Date.now();
        (function waitFrame() {
          if (bitmaps[idx] || Date.now() - t0 > 6000) {
            const b3 = nearest(idx); if (b3) { draw(b3); lastDrawn = idx; }
            window.__ready = true;
          } else { pump(idx); setTimeout(waitFrame, 120); }
        })();
      } else window.__ready = true;
    };
    if (document.readyState === 'complete') setTimeout(settle, 120);
    else addEventListener('load', () => setTimeout(settle, 120));
  }).catch(() => {
    // frames missing → static poster fallback
    document.documentElement.classList.add('static-film');
    canvas.style.display = 'none';
    window.__ready = true;
  });
})();
