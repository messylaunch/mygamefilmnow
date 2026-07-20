/* ============================================================
   GameFilmNow — after-film content motion (marquee, counters,
   reveal batches). The film itself is film-scrub.js. Respects
   prefers-reduced-motion; safe with no JS (classes added here).
   ============================================================ */
(function () {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !window.gsap) {
    document.querySelectorAll('.counter').forEach(c => c.textContent = c.dataset.to);
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  /* stat counters — once, when visible */
  document.querySelectorAll('.stats .counter').forEach(c => {
    gsap.to(c, {
      textContent: +c.dataset.to, snap: { textContent: 1 }, duration: 1.4, ease: 'power2.out',
      scrollTrigger: { trigger: c, start: 'top 88%', once: true }
    });
  });

  /* marquee drift + velocity skew */
  const mq = document.getElementById('marquee');
  if (mq) {
    gsap.to(mq, { xPercent: -50, ease: 'none', duration: 22, repeat: -1 });
    const skew = gsap.quickTo(mq, 'skewX', { duration: 0.4, ease: 'power2.out' });
    ScrollTrigger.create({ onUpdate: s => skew(gsap.utils.clamp(-8, 8, s.getVelocity() / -260)) });
  }

  /* reveal batches for content sections */
  const rv = document.querySelectorAll('section .card, section .step, .faq details, .stats .stat, .mock, .section-head, .cta-band');
  rv.forEach(el => el.classList.add('rv'));
  ScrollTrigger.batch('.rv', {
    start: 'top 90%',
    once: true,
    onEnter: b => gsap.fromTo(b, { opacity: 0, y: 34 },
      { opacity: 1, y: 0, stagger: 0.07, duration: 0.7, ease: 'power3.out', overwrite: true })
  });
})();
