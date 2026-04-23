'use strict';
/* ═══════════════════════════════════════════════════
   TEMPLATE 05 — MODERN SOUTH INDIAN GRAND — script.js
   12 MICRO-INTERACTIONS:
   01 Temple Cursor   02 Indigo Preloader  03 Gopuram+Couple Parallax
   04 Spark Ascent    05 Lamp Breathe (CSS) 06 Toran Sway (CSS)
   07 Card Bloom (CSS) 08 Icon Magnetic    09 Kolam Spin (CSS)
   10 Knowledge Bloom (CSS) 11 Ashoka Burst  12 Kolam Underline
═══════════════════════════════════════════════════ */
const isTouch = window.matchMedia('(pointer:coarse)').matches;

/* ─── 01 TEMPLE CURSOR ──────────────────────────── */
(function initCursor() {
  if (isTouch) return;
  const ring = document.getElementById('cRing'), dot = document.getElementById('cDot');
  if (!ring || !dot) return;
  let rx = 0, ry = 0, dx = -200, dy = -200, hasMoved = false;
  document.addEventListener('mousemove', e => {
    dx = e.clientX; dy = e.clientY;
    dot.style.left = dx + 'px'; dot.style.top = dy + 'px';
    if (!hasMoved) { hasMoved = true; document.body.classList.add('cursor-active'); }
  });
  (function loop() {
    rx += (dx - rx) * .082; ry += (dy - ry) * .082;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    // Gold bloom over interactive, purple glow on default — T05 palette
    ring.style.boxShadow = document.body.classList.contains('ch')
      ? '0 0 36px 12px rgba(200,150,10,.40)'
      : '0 0 12px 2px rgba(74,30,110,.18)';
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a,button,.ev-node,.tt,.gal-item,.rsvp-wa-btn').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('ch'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('ch'));
  });
})();

/* ─── 02 INDIGO PRELOADER ──────────────────────── */
function revealHero() {
  document.body.classList.remove('pl-active');
  const subjectD = document.getElementById('hlSubjectDesktop');
  const subjectM = document.getElementById('hlSubjectMobile');
  const copy = document.getElementById('heroCopy');
  if (subjectD) subjectD.classList.add('in');
  if (subjectM) subjectM.classList.add('in');
  if (copy) copy.classList.add('in');
}
function runPreloader() {
  const pl = document.getElementById('preloader');
  if (!pl) { revealHero(); return; }
  setTimeout(() => pl.classList.add('li'), 340);
  setTimeout(() => pl.classList.add('ni'), 820);
  setTimeout(() => {
    pl.classList.add('away');
    setTimeout(() => { pl.style.display = 'none'; revealHero(); }, 750);
  }, 1900);
}
document.body.classList.add('pl-active');
if (document.readyState === 'complete') { runPreloader(); }
else { window.addEventListener('load', runPreloader); }
setTimeout(() => {
  if (document.body.classList.contains('pl-active')) {
    revealHero();
    const pl = document.getElementById('preloader');
    if (pl) pl.style.display = 'none';
  }
}, 5500);

/* ─── 04 SPARK ASCENT — temple lamp flames ─────── */
(function initSparks() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  const COUNT = isTouch ? 7 : 22;
  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'hp';
    const x = 3 + Math.random() * 94;
    const dur = 8 + Math.random() * 18;
    const del = Math.random() * -24;
    const dx = (Math.random() - 0.5) * 70;
    // Temple lamp flame colours: amber, gold, ivory, deep rose
    const colours = ['#C8960A', '#E8A820', '#F8F2E4', '#E8C890', '#C84060'];
    const weights = [3, 3, 1, 2, 1]; // weighted toward gold/amber
    let pick = 0, rnd = Math.random() * 10;
    for (let w = 0, j = 0; j < colours.length; j++) { w += weights[j]; if (rnd < w) { pick = j; break; } }
    const col = colours[pick];
    const size = Math.random() < 0.28 ? 3.5 : (Math.random() < 0.58 ? 2.5 : 1.5);
    p.style.cssText = `left:${x}%;--dur:${dur}s;--del:${del}s;--dx:${dx}px;width:${size}px;height:${size}px;background:${col};opacity:0`;
    container.appendChild(p);
  }
})();

/* ─── 03 HERO PARALLAX — DISABLED FOR STATIC HERO ──── */
const scrollNudge = document.getElementById('scrollNudge');
var _snFired = false; 
var _snTimer = setTimeout(function () { 
  if (scrollNudge && !_snFired) { 
    _snFired = true; 
    scrollNudge.style.animation = 'snAttention 0.9s ease-in-out forwards'; 
    setTimeout(function () { 
      if (scrollNudge) scrollNudge.style.animation = 'snPulse 2.5s ease-in-out infinite'; 
    }, 900); 
  } 
}, 4000); 

window.addEventListener('scroll', function () { 
  if (!_snFired) { _snFired = true; clearTimeout(_snTimer); } 
}, { once: true, passive: true });

/* ─── WATER BRIDGE — no JS needed, pure CSS ──────── */

/* ─── PETAL RAIN — Ashoka red ──────────────────── */
class Petals {
  constructor(id, opts = {}) {
    this.el = document.getElementById(id);
    this.max = opts.max || 7;
    this.rate = opts.rate || 1400;
    this.src = 'assets/Element_2.png';
    this.active = false; this.pool = new Set(); this._iv = null;
  }
  spawn() {
    if (!this.el) return;
    if (this.pool.size >= this.max) { const f = this.pool.values().next().value; f?.remove(); this.pool.delete(f); }
    if (this.pool.size >= this.max) return;
    const sz = 42 + Math.random() * 36;
    const x = 5 + Math.random() * 90;
    const dur = 7 + Math.random() * 7;
    const drift = (Math.random() - 0.5) * 130;
    const wrap = document.createElement('div');
    wrap.style.cssText = `position:absolute;width:${sz}px;height:${sz}px;left:${x}%;top:-${sz}px;pointer-events:none`;
    const img = document.createElement('img');
    img.src = this.src;
    // Ashoka red petal with warm glow
    img.style.cssText = 'width:100%;height:100%;object-fit:contain;mix-blend-mode:multiply;opacity:0.60;filter:drop-shadow(0 0 8px rgba(200,64,96,.45))';
    wrap.appendChild(img);
    const anim = wrap.animate([
      { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 0 },
      { transform: `translateY(7vh) translateX(${drift * .25}px) rotate(75deg)`, opacity: .58, offset: .07 },
      { transform: `translateY(80vh) translateX(${drift}px) rotate(310deg)`, opacity: .42, offset: .88 },
      { transform: `translateY(108vh) translateX(${drift}px) rotate(370deg)`, opacity: 0 },
    ], { duration: dur * 1000, easing: 'linear', fill: 'forwards' });
    anim.onfinish = () => { wrap.remove(); this.pool.delete(wrap); };
    this.el.appendChild(wrap); this.pool.add(wrap);
  }
  start() { if (this.active || !this.el) return; this.active = true; const rate = isTouch ? this.rate * 2 : this.rate; this._iv = setInterval(() => { if (this.active) this.spawn(); }, rate); this.spawn(); }
  stop() { this.active = false; clearInterval(this._iv); }
}
const PS = {
  hero: new Petals('petalHero', { max: isTouch ? 3 : 7, rate: isTouch ? 2800 : 1400 }),
  invite: new Petals('petalInvite', { max: isTouch ? 2 : 4, rate: isTouch ? 5600 : 2800 }),
  events: new Petals('petalEvents', { max: isTouch ? 2 : 5, rate: isTouch ? 6400 : 3200 }),
  things: new Petals('petalThings', { max: isTouch ? 1 : 3, rate: isTouch ? 8000 : 4000 }),
  rsvp: new Petals('petalRsvp', { max: isTouch ? 2 : 4, rate: isTouch ? 5200 : 2600 }),
};
const sIO = new IntersectionObserver(entries => {
  entries.forEach(({ target, isIntersecting }) => {
    const id = target.id;
    const sys = id === 'heroWrap' ? PS.hero : PS[id];
    if (sys) isIntersecting ? sys.start() : sys.stop();
  });
}, { threshold: 0.08 });
['heroWrap', 'invite', 'events', 'things', 'rsvp'].forEach(id => { const el = document.getElementById(id); if (el) sIO.observe(el); });

/* ─── SCROLL REVEAL ─────────────────────────────── */
const rIO = new IntersectionObserver(entries => {
  entries.forEach(({ target, isIntersecting }) => {
    if (isIntersecting) { target.classList.add('vis'); rIO.unobserve(target); }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.scroll-in').forEach(el => rIO.observe(el));
const inviteCard = document.querySelector('.invite-card');
if (inviteCard) rIO.observe(inviteCard);

/* ─── 12 KOLAM UNDERLINE ───────────────────────── */
(function initKolamLines() {
  const wraps = document.querySelectorAll('.sh-line-wrap');
  if (!wraps.length) return;
  const lineIO = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) { setTimeout(() => target.classList.add('drawn'), 440); lineIO.unobserve(target); }
    });
  }, { threshold: 0.5 });
  wraps.forEach(w => lineIO.observe(w));
})();



/* ─── EVENTS AUTO OPEN ──────────────────────────── */
function initEventsAutoOpen() {
  const nodes = Array.from(document.querySelectorAll('.ev-node'));
  if (!nodes.length) return;
  const revealed = new Set();
  function check() {
    const tl = window.innerHeight * .60;
    nodes.forEach(n => {
      if (revealed.has(n)) return;
      const r = n.getBoundingClientRect();
      if (r.top + r.height / 2 < tl) { revealed.add(n); requestAnimationFrame(() => n.classList.add('ev-active')); }
    });
  }
  window.addEventListener('scroll', check, { passive: true });
  window.addEventListener('load', check);
  check();
}
initEventsAutoOpen();

/* ─── 3D CARD TILT — events + gallery ─────────── */
(function initCardTilt() {
  function attachMouseTilt(el) {
    if (el._tiltAttached) return;
    el._tiltAttached = true;
    el.addEventListener('mousemove', function (e) {
      const r = this.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      this.style.transition = 'transform 0.08s ease';
      this.style.transform = `perspective(900px) rotateX(${(y * -10).toFixed(2)}deg) rotateY(${(x * 12).toFixed(2)}deg) scale(1.025)`;
    });
    el.addEventListener('mouseleave', function () {
      this.style.transition = 'transform 0.7s cubic-bezier(0.34,1.56,0.64,1)';
      this.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  }
  function attachTouchTilt(el) {
    if (el._touchTiltAttached) return;
    el._touchTiltAttached = true;
    el.addEventListener('touchmove', function (e) {
      if (e.touches.length !== 1) return;
      const r = this.getBoundingClientRect();
      const x = (e.touches[0].clientX - r.left) / r.width - 0.5;
      const y = (e.touches[0].clientY - r.top) / r.height - 0.5;
      this.style.transition = 'transform 0.05s ease';
      this.style.transform = `perspective(700px) rotateX(${(y * -6).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg) scale(1.018)`;
    }, { passive: true });
    el.addEventListener('touchend', function () {
      this.style.transition = 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1)';
      this.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  }
  function attachTilt(el) { attachMouseTilt(el); attachTouchTilt(el); }
  document.querySelectorAll('.ev-node,.gal-item').forEach(attachTilt);
  const _orig = window.initEventsAutoOpen;
  window.initEventsAutoOpen = function () {
    if (typeof _orig === 'function') _orig();
    document.querySelectorAll('.ev-node').forEach(attachTilt);
  };
})();

/* ─── HERO COUNTDOWN TIMER ──────────────────────── */
(function initCountdown() {
  const el = document.getElementById('heroCountdown');
  if (!el) return;
  function getTarget() {
    // try {
    //   if (typeof WEDDING_CONFIG !== 'undefined' && WEDDING_CONFIG.couple && WEDDING_CONFIG.couple.date) {
    //     const d = new Date(WEDDING_CONFIG.couple.date + 'T00:00:00');
    //     if (!isNaN(d)) return d;
    //   }
    // } catch (e) { }
    return new Date('2026-06-07T06:00:00+05:30');
  }
  function pad(n) { return String(n).padStart(2, '0'); }
  function tick() {
    const diff = getTarget() - Date.now();
    if (diff <= 0) {
      el.innerHTML = '<span class="hc-cd-unit"><span class="hc-cd-num" style="font-size:clamp(.6rem,1.4vw,.85rem)">We\'re Married ♥</span></span>';
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    el.innerHTML =
      `<span class="hc-cd-unit"><span class="hc-cd-num">${d}</span><span class="hc-cd-label">Days</span></span>` +
      `<span class="hc-cd-sep">·</span>` +
      `<span class="hc-cd-unit"><span class="hc-cd-num">${pad(h)}</span><span class="hc-cd-label">Hrs</span></span>` +
      `<span class="hc-cd-sep">·</span>` +
      `<span class="hc-cd-unit"><span class="hc-cd-num">${pad(m)}</span><span class="hc-cd-label">Min</span></span>` +
      `<span class="hc-cd-sep">·</span>` +
      `<span class="hc-cd-unit"><span class="hc-cd-num">${pad(s)}</span><span class="hc-cd-label">Sec</span></span>`;
  }
  tick();
  setInterval(tick, 1000);
})();

/* ─── 08 ICON MAGNETIC ─────────────────────────── */
(function initIconMagnetic() {
  if (isTouch) return;
  document.querySelectorAll('.ev-node').forEach(node => {
    const wrap = node.querySelector('.ev-icon-wrap');
    if (!wrap) return;
    node.addEventListener('mousemove', e => {
      const r = node.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) / r.width * 11;
      const dy = (e.clientY - r.top - r.height / 2) / r.height * 9;
      wrap.style.transform = `translate(${dx}px,${dy}px) scale(1.07)`;
      wrap.style.animationPlayState = 'paused';
    });
    node.addEventListener('mouseleave', () => {
      wrap.style.transform = '';
      wrap.style.animationPlayState = '';
    });
  });
})();

/* ─── CURTAIN REVEAL ─────────────────────────────── */
(function initCurtainReveal() {
  const section = document.getElementById('story');
  const stage = document.getElementById('stStage');
  const bride = document.getElementById('stBride');
  const groom = document.getElementById('stGroom');
  const curtL = document.getElementById('stCurtL');
  const curtR = document.getElementById('stCurtR');
  const reveal = document.getElementById('stReveal');
  const petalsEl = document.getElementById('stPetals');
  if (!section || !stage || !bride || !curtL || !curtR) return;
  let seqDone = false, openEnabled = false, revealed = false, lastP = 0;

  function spawnPetal() {
    if (!petalsEl) return;
    const sz = 5 + Math.random() * 9;
    const x = 10 + Math.random() * 80;
    const dur = 5500 + Math.random() * 4500;
    const dx = (Math.random() - 0.5) * 88;
    // Ashoka red + temple gold + amber — sacred South Indian palette
    const COLS = ['rgba(200,64,96,.22)', 'rgba(200,150,10,.26)', 'rgba(232,200,144,.30)', 'rgba(74,30,110,.18)'];
    const col = COLS[Math.floor(Math.random() * COLS.length)];
    const el = document.createElement('div');
    el.style.cssText = `position:absolute;width:${sz}px;height:${sz}px;left:${x}%;top:-${sz}px;pointer-events:none;border-radius:50% 10% 50% 10%;background:${col};mix-blend-mode:multiply`;
    petalsEl.appendChild(el);
    el.animate([
      { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 0 },
      { transform: `translateY(4vh) translateX(${dx * .08}px) rotate(45deg)`, opacity: .88, offset: .05 },
      { transform: `translateY(58vh) translateX(${dx * .88}px) rotate(255deg)`, opacity: .35, offset: .87 },
      { transform: `translateY(90vh) translateX(${dx}px) rotate(370deg)`, opacity: 0 },
    ], { duration: dur, easing: 'linear', fill: 'forwards' }).onfinish = () => el.remove();
  }

  function runSequence() {
    if (seqDone) return;
    seqDone = true;
    bride.classList.add('st-pull'); groom.classList.add('st-pull');
    setTimeout(() => {
      bride.classList.remove('st-pull'); groom.classList.remove('st-pull');
      bride.classList.add('st-tension'); groom.classList.add('st-tension');
    }, 735);
    setTimeout(() => {
      bride.classList.remove('st-tension'); groom.classList.remove('st-tension');
      openEnabled = true; applyProgress(getCurtainProgress());
    }, 1255);
  }

  function getCurtainProgress() {
    if (!openEnabled) return 0;
    const r = section.getBoundingClientRect();
    const start = window.innerHeight * .55;
    const range = window.innerHeight * .90;
    return Math.min(1, Math.max(0, (start - r.top) / range));
  }

  function applyProgress(p) {
    if (Math.abs(p - lastP) < 0.002) return;
    lastP = p;
    const eased = p < 1 ? 1 - Math.pow(1 - p, 3.2) : 1;
    curtL.style.transform = `translateX(-${(eased * 100).toFixed(2)}%)`;
    curtR.style.transform = `translateX(${(eased * 100).toFixed(2)}%)`;
    // Growing drop-shadow as curtains part — physical weight
    curtL.style.filter = `drop-shadow(${(eased * 24).toFixed(1)}px 0 30px rgba(26,12,46,${(eased * .28).toFixed(2)}))`;
    curtR.style.filter = `drop-shadow(-${(eased * 24).toFixed(1)}px 0 30px rgba(26,12,46,${(eased * .28).toFixed(2)}))`;
    const drift = eased * 26; const sc = 1 - eased * .034;
    bride.style.transform = `translateX(-${drift.toFixed(1)}px) scale(${sc.toFixed(3)})`;
    groom.style.transform = `translateX(${drift.toFixed(1)}px) scale(${sc.toFixed(3)})`;
    if (eased >= 0.68 && !revealed) {
      revealed = true; reveal.classList.add('revealed');
      let n = 0;
      const iv = setInterval(() => { spawnPetal(); if (++n >= 28) clearInterval(iv); }, 140);
    }
  }
  window.addEventListener('scroll', () => applyProgress(getCurtainProgress()), { passive: true });
  const io = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && entries[0].intersectionRatio >= 0.20) { runSequence(); io.disconnect(); }
  }, { threshold: [0.20] });
  io.observe(section);
  let rTO; window.addEventListener('resize', () => { clearTimeout(rTO); rTO = setTimeout(() => applyProgress(getCurtainProgress()), 150); });
})();

/* ─── 11 ASHOKA BURST ───────────────────────────── */
function burstPetals(fromEl) {
  const r = fromEl.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  const src = 'assets/Element_2.png';
  for (let i = 0; i < 22; i++) {
    const el = document.createElement('div');
    el.className = 'burst-p';
    const sz = 10 + Math.random() * 18;
    const ang = (i / 22) * 360 + Math.random() * 16;
    const dst = 70 + Math.random() * 100;
    const tx = Math.cos(ang * Math.PI / 180) * dst;
    const ty = Math.sin(ang * Math.PI / 180) * dst;
    el.style.cssText = `left:${cx}px;top:${cy}px;width:${sz}px;height:${sz}px;transform:translate(-50%,-50%);position:fixed;pointer-events:none;z-index:9000`;
    const img = document.createElement('img');
    img.src = src;
    img.style.cssText = 'width:100%;height:100%;object-fit:contain;mix-blend-mode:multiply;opacity:0.72';
    el.appendChild(img);
    document.body.appendChild(el);
    el.animate([
      { transform: 'translate(-50%,-50%) scale(.2) rotate(0deg)', opacity: .8 },
      { transform: `translate(calc(-50% + ${tx}px),calc(-50% + ${ty}px)) scale(1.2) rotate(${Math.random() * 360}deg)`, opacity: .68, offset: .40 },
      { transform: `translate(calc(-50% + ${tx * 1.65}px),calc(-50% + ${ty * 1.65 + 65}px)) scale(.22) rotate(${Math.random() * 600}deg)`, opacity: 0 },
    ], { duration: 1000 + Math.random() * 380, easing: 'ease-out', fill: 'forwards' })
      .onfinish = () => el.remove();
  }
}
(function initRsvpBtn() {
  const btn = document.getElementById('rsvpWaBtn');
  if (!btn) return;
  btn.addEventListener('click', () => burstPetals(btn));
})();