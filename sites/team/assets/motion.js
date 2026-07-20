/* ============================================================
   GameFilmNow — shared micro-motion (store & film room)
   Scroll-reveals borrowed from the start. scroll-film, kept
   light for dashboards. No dependencies; no-JS safe (classes
   are only added here); respects prefers-reduced-motion.
   ============================================================ */
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var els = document.querySelectorAll(
    '.card,.panel,.game-card,.stat-card,.team-hero,.profile-hero,.paywall,.grid-wrap,.cta-band,.form-card'
  );
  if (!els.length) return;
  els.forEach(function (el) { el.classList.add('mo'); });
  var slot = 0, lastTs = 0;
  var io = new IntersectionObserver(function (entries) {
    var now = performance.now();
    if (now - lastTs > 300) slot = 0;           // new batch → restart stagger
    lastTs = now;
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.style.transitionDelay = Math.min(slot++ * 65, 390) + 'ms';
      e.target.classList.add('mo-in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -7% 0px' });
  els.forEach(function (el) { io.observe(el); });
})();
