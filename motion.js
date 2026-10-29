import { animate, inView, scroll, stagger, hover } from "https://cdn.jsdelivr.net/npm/motion@12.23.0/+esm";

const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (q, r = document) => [...r.querySelectorAll(q)];

if (!calm) {
  const ease = [0.22, 1, 0.36, 1];
  const spring = { type: "spring", stiffness: 260, damping: 22 };

  // quick-contact buttons pop in
  const fabs = $(".fab a");
  fabs.forEach(el => (el.style.opacity = 0));
  animate(fabs, { opacity: [0, 1], scale: [0.4, 1] }, { type: "spring", stiffness: 300, damping: 18, delay: stagger(0.1, { startDelay: 1.2 }) });

  // reading progress bar
  const bar = $(".progress-bar")[0];
  if (bar) scroll(animate(bar, { scaleX: [0, 1] }, { ease: "linear" }));

  // hero entrance
  const heroBits = $(".hero-copy > *, .hero-visual .photo, .hero-visual .sticker, .hero-visual .note");
  heroBits.forEach(el => (el.style.opacity = 0));
  animate(heroBits, { opacity: [0, 1], y: [30, 0] }, { duration: 0.9, delay: stagger(0.09), ease });

  // headlines: soft mask reveal
  $("h2").filter(h => !h.closest(".gym")).forEach(h => {
    h.style.opacity = 0;
    inView(h, () => {
      animate(h, { opacity: [0, 1], y: [34, 0], clipPath: ["inset(0 0 100% 0)", "inset(-10% -5% -25% -5%)"] }, { duration: 0.9, ease });
    }, { amount: 0.5 });
  });

  // staggered groups
  [".cards .card", ".plans .plan", ".steps li"].forEach(sel => {
    const items = $(sel);
    if (!items.length) return;
    items.forEach(el => (el.style.opacity = 0));
    inView(items[0].parentElement, () => {
      animate(items, { opacity: [0, 1], y: [48, 0], scale: [0.94, 1] }, { duration: 0.8, delay: stagger(0.1), ease });
    }, { amount: 0.2 });
  });

  // gym panel
  const gymPhoto = $(".gym-photo")[0];
  const gymBits = $(".gym-copy > *, .gym-grid li");
  if (gymPhoto) {
    gymPhoto.style.opacity = 0;
    gymBits.forEach(el => (el.style.opacity = 0));
    inView(".gym", () => {
      animate(gymPhoto, { opacity: [0, 1], x: [-50, 0], clipPath: ["inset(0 100% 0 0 round 24px)", "inset(0 0% 0 0 round 24px)"] }, { duration: 1, ease });
      animate(gymBits, { opacity: [0, 1], y: [24, 0] }, { duration: 0.7, delay: stagger(0.07, { startDelay: 0.2 }), ease });
    }, { amount: 0.25 });
  }

  // food gallery + progress
  const fuel = $(".fuel figure");
  fuel.forEach(el => (el.style.opacity = 0));
  if (fuel.length) inView(".fuel", () => {
    animate(fuel, { opacity: [0, 1], y: [40, 0], scale: [0.94, 1] }, { duration: 0.8, delay: stagger(0.12), ease });
  }, { amount: 0.2 });

  const prog = $(".progress")[0];
  if (prog) {
    prog.style.opacity = 0;
    const img = $(".crop img", prog)[0];
    inView(prog, () => {
      animate(prog, { opacity: [0, 1], y: [32, 0] }, { duration: 0.8, ease });
      if (img) animate(img, { clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"] }, { duration: 1.2, delay: 0.2, ease });
    }, { amount: 0.25 });
  }

  // photo parallax
  const heroImg = $(".hero-visual .photo img")[0];
  if (heroImg) scroll(animate(heroImg, { y: [0, -40] }, { ease: "linear" }), { target: heroImg.parentElement, offset: ["start end", "end start"] });
  if (gymPhoto) {
    const gymImg = $("img", gymPhoto)[0];
    gymImg.style.scale = 1.12;
    scroll(animate(gymImg, { y: ["-6%", "6%"] }, { ease: "linear" }), { target: gymPhoto, offset: ["start end", "end start"] });
  }

  // (decorative boxes stay still: scroll-linked motion on a dozen of them cost more than it gave)

  // magnetic buttons
  if (matchMedia("(hover:hover)").matches) {
    $(".btn").forEach(b => {
      b.addEventListener("pointermove", e => {
        const r = b.getBoundingClientRect();
        animate(b, { x: (e.clientX - r.left - r.width / 2) * 0.22, y: (e.clientY - r.top - r.height / 2) * 0.3 }, spring);
      });
      b.addEventListener("pointerleave", () => animate(b, { x: 0, y: 0 }, spring));
    });
  }

  // manifesto: words light up as you scroll
  const mf = $("#manifesto")[0];
  let stopMf = null;
  const buildMf = () => {
    if (stopMf) stopMf();
    const words = mf.textContent.trim().split(/\s+/);
    mf.innerHTML = words.map(w => `<span>${w}</span>`).join(" ");
    const spans = $("span", mf);
    spans.forEach(sp => (sp.style.opacity = 0.2));
    stopMf = scroll(p => {
      const n = spans.length;
      spans.forEach((sp, i) => {
        const v = (Math.min(1, Math.max(0.2, (p * (n + 4) - i) / 3 + 0.2))).toFixed(2);
        if (sp.dataset.o !== v) { sp.dataset.o = v; sp.style.opacity = v; }
      });
    }, { target: mf, offset: ["start 85%", "end 55%"] });
  };
  if (mf) {
    const rebuildPlain = () => { mf.textContent = mf.textContent.replace(/\s+/g, " "); };
    buildMf();
    document.addEventListener("langchange", () => { rebuildPlain(); buildMf(); });
  }

  // moments: gallery glides sideways while you scroll past
  const mo = $(".moments")[0], track = $(".moments-track")[0];
  if (mo && track) {
    mo.style.overflowX = "hidden";
    scroll(p => {
      const dist = Math.max(0, track.scrollWidth - innerWidth);
      track.style.transform = `translateX(${-p * dist}px)`;
    }, { target: mo, offset: ["start end", "end start"] });
  }
}
