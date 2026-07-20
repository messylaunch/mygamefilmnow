/* ============================================================
   GameFilmNow — "LIGHTS ON." pure-code scroll film (Lane A)
   Scenes: BLACKOUT → LIGHTS → THE DRIVE → THE PLAY → funnel.
   Dev contract: ?jump=<y> lands settled; window.__ready gates
   the screenshot harness. Respects prefers-reduced-motion.
   ============================================================ */
(function () {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const JUMP = new URLSearchParams(location.search).get('jump');
  if (JUMP !== null) history.scrollRestoration = 'manual';

  /* ---------- char split (before any layout reads) ---------- */
  document.querySelectorAll('.split-chars').forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    for (const ch of text) {
      const s = document.createElement('span');
      s.className = 'ch';
      s.textContent = ch === ' ' ? ' ' : ch;
      el.appendChild(s);
    }
  });

  /* ---------- static fallback: no motion, everything visible ---------- */
  if (reduced || !window.gsap) {
    document.documentElement.classList.remove('js'); // un-hide .rv content
    document.querySelectorAll('.beam,.field-glow').forEach(el => el.style.opacity = '.5');
    document.querySelectorAll('.counter').forEach(c => c.textContent = c.dataset.to);
    window.__ready = true;
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ---------- smooth scroll (skipped under ?jump) ---------- */
  let lenis = null;
  if (JUMP === null && window.Lenis) {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  const chapters = [];
  const chapterAt = (trigger, name) => chapters.push({ trigger, name });

  /* ════════ PINNED SCENES FIRST (ordering law) ════════ */

  /* ---- SCENE 1: BLACKOUT → LIGHTS ---- */
  const chars = gsap.utils.toArray('#scHero .ch');
  gsap.set('#heroLead,#heroCta,#liveChip', { opacity: 0, y: 26 });
  gsap.set(chars, { yPercent: 120, opacity: 0 });

  const heroTl = gsap.timeline({
    scrollTrigger: { trigger: '#scHero', start: 'top top', end: '+=170%', pin: true, scrub: 0.6 }
  });
  heroTl
    .to('#beamL', { opacity: 1, rotate: -4, duration: 0.16, ease: 'power2.inOut' }, 0.02)
    .to('#beamR', { opacity: 1, rotate: 4, duration: 0.16, ease: 'power2.inOut' }, 0.08)
    .to('#fieldGlow', { opacity: 1, duration: 0.2 }, 0.12)
    .to(chars, { yPercent: 0, opacity: 1, stagger: 0.012, duration: 0.3, ease: 'power4.out' }, 0.16)
    .to('#liveChip', { opacity: 1, y: 0, duration: 0.12 }, 0.42)
    .to('#heroLead', { opacity: 1, y: 0, duration: 0.14 }, 0.46)
    .to('#heroCta', { opacity: 1, y: 0, duration: 0.14 }, 0.52)
    .to('#scrollCue', { opacity: 0, duration: 0.08 }, 0.5)
    .to('#scHero .inner', { yPercent: -14, opacity: 0.25, duration: 0.3 }, 0.78)
    .to('#beamL,#beamR', { opacity: 0.25, duration: 0.3 }, 0.78);
  chapterAt('#scHero', 'Lights on');

  /* ---- SCENE 2: THE DRIVE (horizontal run) ---- */
  const track = document.getElementById('driveTrack');
  const driveScroll = () => -(track.scrollWidth - innerWidth);
  const driveTween = gsap.to(track, {
    x: driveScroll,
    ease: 'none',
    scrollTrigger: {
      trigger: '#scDrive', start: 'top top', end: '+=250%',
      pin: true, scrub: 0.6, invalidateOnRefresh: true
    }
  });
  gsap.utils.toArray('.drive-word').forEach(w => {
    gsap.to(w, {
      xPercent: -22 * (parseFloat(w.dataset.depth) || 0.4) * 4,
      ease: 'none',
      scrollTrigger: { trigger: w, containerAnimation: driveTween, start: 'left right', end: 'right left', scrub: true }
    });
  });
  gsap.utils.toArray('.drive-card').forEach(c => {
    gsap.from(c, {
      y: 60, opacity: 0, ease: 'power2.out',
      scrollTrigger: { trigger: c, containerAnimation: driveTween, start: 'left 88%', end: 'left 55%', scrub: true }
    });
  });
  chapterAt('#scDrive', 'The drive');

  /* ---- SCENE 3: THE PLAY (clip-path slit → full) ---- */
  gsap.set('#playFrame', { clipPath: 'inset(46% 12% 46% 12% round 18px)', scale: 0.94 });
  gsap.set('.play-score', { opacity: 0, y: 24 });
  gsap.set('.play-caption', { opacity: 0 });
  const playTl = gsap.timeline({
    scrollTrigger: { trigger: '#scPlay', start: 'top top', end: '+=140%', pin: true, scrub: 0.6 }
  });
  playTl
    .to('#playFrame', { clipPath: 'inset(0% 0% 0% 0% round 18px)', scale: 1, duration: 0.5, ease: 'power2.inOut' }, 0)
    .to('.play-score', { opacity: 1, y: 0, duration: 0.15 }, 0.42)
    .to('.play-caption', { opacity: 1, duration: 0.15 }, 0.55);
  chapterAt('#scPlay', 'The play');

  /* ════════ AFTER THE PINS: ambient + content triggers ════════ */

  /* score counters inside the pinned play scene (scrubbed with it) */
  document.querySelectorAll('.play-score .counter').forEach(c => {
    playTl.to(c, { textContent: +c.dataset.to, snap: { textContent: 1 }, duration: 0.4, ease: 'power1.in' }, 0.35);
  });

  /* stat counters — fire once when visible */
  document.querySelectorAll('.stats .counter').forEach(c => {
    gsap.to(c, {
      textContent: +c.dataset.to, snap: { textContent: 1 }, duration: 1.4, ease: 'power2.out',
      scrollTrigger: { trigger: c, start: 'top 88%', once: true }
    });
  });

  /* marquee drift + velocity skew */
  const mq = document.getElementById('marquee');
  gsap.to(mq, { xPercent: -50, ease: 'none', duration: 22, repeat: -1 });
  const skew = gsap.quickTo(mq, 'skewX', { duration: 0.4, ease: 'power2.out' });
  ScrollTrigger.create({
    onUpdate: self => skew(gsap.utils.clamp(-8, 8, self.getVelocity() / -260))
  });

  /* reveal batches for after-film content */
  const rvTargets = document.querySelectorAll(
    'section .card, section .step, .faq details, .stats .stat, .mock, .section-head, .cta-band'
  );
  rvTargets.forEach(el => el.classList.add('rv'));
  ScrollTrigger.batch('.rv', {
    start: 'top 90%',
    once: true,
    onEnter: batch => gsap.fromTo(batch,
      { opacity: 0, y: 34 },
      { opacity: 1, y: 0, stagger: 0.07, duration: 0.7, ease: 'power3.out', overwrite: true })
  });

  /* timecode + chapter readout */
  const tc = document.getElementById('tc'), tcChap = document.getElementById('tcChap');
  const chapterFor = () => {
    let name = 'Blackout';
    for (const c of chapters) {
      const el = document.querySelector(c.trigger);
      if (el && el.getBoundingClientRect().top <= innerHeight * 0.5) name = c.name;
    }
    if (scrollY + innerHeight >= document.body.scrollHeight - 200) name = 'Every screen';
    else if (document.getElementById('how').getBoundingClientRect().top < innerHeight * 0.6) name = 'The funnel';
    return name;
  };
  let tcRaf = 0;
  const updTc = () => {
    const max = document.body.scrollHeight - innerHeight;
    const p = max > 0 ? scrollY / max : 0;
    const totalF = Math.round(p * 24 * 90); // 90s of "film" at 24fps
    const s = Math.floor(totalF / 24), f = totalF % 24;
    tc.textContent = `00:${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}:${String(f).padStart(2, '0')}`;
    tcChap.textContent = chapterFor();
    tcRaf = 0;
  };
  addEventListener('scroll', () => { if (!tcRaf) tcRaf = requestAnimationFrame(updTc); }, { passive: true });
  updTc();

  /* ambient dust over the hero, fading out across first ~7% of scroll */
  (function dust() {
    const cv = document.getElementById('dust'), ctx = cv.getContext('2d');
    const sprite = document.createElement('canvas'); sprite.width = sprite.height = 32;
    const sctx = sprite.getContext('2d');
    const g = sctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    g.addColorStop(0, 'rgba(255,235,160,.9)'); g.addColorStop(1, 'rgba(255,235,160,0)');
    sctx.fillStyle = g; sctx.fillRect(0, 0, 32, 32);
    let W, H, parts = [], alpha = 1;
    const size = () => { W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight; };
    size(); addEventListener('resize', size);
    for (let i = 0; i < 42; i++) parts.push({ x: Math.random(), y: Math.random(), z: 0.3 + Math.random() * 0.7, ph: Math.random() * 6.28 });
    let t = 0;
    (function frame() {
      alpha = 1 - Math.min(1, scrollY / (innerHeight * 1.1));
      if (alpha <= 0) { ctx.clearRect(0, 0, W, H); requestAnimationFrame(frame); return; }
      t += 0.016; ctx.clearRect(0, 0, W, H); ctx.globalAlpha = alpha;
      for (const p of parts) {
        const tw = 0.55 + 0.45 * Math.sin(t * 1.4 + p.ph);
        const s = 4 + p.z * 12;
        ctx.globalAlpha = alpha * tw * p.z * 0.8;
        ctx.drawImage(sprite, (p.x * W + t * 14 * p.z) % W, (p.y * H + Math.sin(t * 0.5 + p.ph) * 24 * p.z + H) % H, s, s);
      }
      requestAnimationFrame(frame);
    })();
  })();

  /* jank meter (console) — judge p95/max, never avg fps */
  (function jank() {
    let last = performance.now(), deltas = [];
    (function loop(now) { deltas.push(now - last); last = now; requestAnimationFrame(loop); })(last);
    setInterval(() => {
      if (!deltas.length) return;
      const max = Math.max(...deltas);
      window.__jankMax = max;
      deltas = [];
    }, 2000);
  })();

  /* ---------- dev contract: settle + ready ---------- */
  const settle = () => {
    if (JUMP !== null) {
      scrollTo(0, +JUMP || 0);
      ScrollTrigger.update();
      ScrollTrigger.refresh();
      scrollTo(0, +JUMP || 0);
      ScrollTrigger.update();
      updTc();
    }
    window.__ready = true;
  };
  if (document.readyState === 'complete') setTimeout(settle, 150);
  else addEventListener('load', () => setTimeout(settle, 150));
})();
