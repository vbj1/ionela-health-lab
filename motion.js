import { animate, inView, scroll, stagger } from "https://cdn.jsdelivr.net/npm/motion@12.23.0/+esm";

const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!calm) {
  const ease = [0.22, 1, 0.36, 1];

  // hero entrance
  const heroBits = document.querySelectorAll(".hero-copy > *, .hero-visual .photo, .hero-visual .sticker");
  heroBits.forEach(el => (el.style.opacity = 0));
  animate(heroBits, { opacity: [0, 1], y: [28, 0] }, { duration: 0.9, delay: stagger(0.09), ease });

  // gym panel: photo + tiles
  const gymPhoto = document.querySelector(".gym-photo");
  const gymBits = document.querySelectorAll(".gym-copy > *, .gym-grid li");
  if (gymPhoto) {
    gymPhoto.style.opacity = 0;
    gymBits.forEach(el => (el.style.opacity = 0));
    inView(".gym", () => {
      animate(gymPhoto, { opacity: [0, 1], x: [-40, 0] }, { duration: 0.9, ease });
      animate(gymBits, { opacity: [0, 1], y: [24, 0] }, { duration: 0.7, delay: stagger(0.07, { startDelay: 0.15 }), ease });
    }, { amount: 0.25 });
  }

  // food gallery + progress card
  const fuel = document.querySelectorAll(".fuel figure");
  fuel.forEach(el => (el.style.opacity = 0));
  const fuelWrap = document.querySelector(".fuel");
  if (fuelWrap) inView(fuelWrap, () => {
    animate(fuel, { opacity: [0, 1], y: [40, 0], scale: [0.95, 1] }, { duration: 0.8, delay: stagger(0.12), ease });
  }, { amount: 0.2 });

  const prog = document.querySelector(".progress");
  if (prog) {
    prog.style.opacity = 0;
    inView(prog, () => { animate(prog, { opacity: [0, 1], y: [32, 0] }, { duration: 0.9, ease }); }, { amount: 0.25 });
  }

  // scroll parallax on photos
  const hero = document.querySelector(".hero-visual .photo img");
  if (hero) scroll(animate(hero, { y: [0, -40] }, { ease: "linear" }), { target: hero.parentElement, offset: ["start end", "end start"] });
  const gymImg = document.querySelector(".gym-photo img");
  if (gymImg) {
    gymImg.style.scale = 1.12;
    scroll(animate(gymImg, { y: ["-6%", "6%"] }, { ease: "linear" }), { target: gymPhoto, offset: ["start end", "end start"] });
  }
}
