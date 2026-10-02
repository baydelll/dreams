const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

window.addEventListener("load", () => {
  setTimeout(() => $("#loader").classList.add("is-hidden"), 550);
});

const sections = $$(".scene");
const dots = $$(".dot");
const progress = $("#progress");
const count = $("#count");
const glow = $("#cursorGlow");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll(".reveal").forEach((el, i) => {
        setTimeout(() => el.classList.add("is-visible"), i * 120);
      });
      const index = Number(entry.target.dataset.section);
      dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
    }
  });
}, { threshold: 0.35 });
sections.forEach(s => observer.observe(s));

dots.forEach(dot => {
  dot.addEventListener("click", () => {
    sections[Number(dot.dataset.to)].scrollIntoView({behavior:"smooth"});
  });
});

window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  const pct = Math.min(100, Math.max(0, scrollY / max * 100));
  progress.style.width = pct + "%";
  count.textContent = String(Math.round(pct)).padStart(2, "0") + "%";
});

let mx = innerWidth / 2, my = innerHeight / 2;
addEventListener("pointermove", e => {
  mx = e.clientX; my = e.clientY;
  glow.style.left = mx + "px";
  glow.style.top = my + "px";
});

const hero = $(".hero");
addEventListener("scroll", () => {
  const y = Math.min(scrollY, hero.offsetHeight);
  const fx = y * .12;
  $(".fx--one").style.transform = `translate3d(0, ${fx}px, 0)`;
  $(".fx--two").style.transform = `translate3d(0, ${-fx*.7}px, 0)`;
}, {passive:true});

$("#replay").addEventListener("click", () => {
  window.scrollTo({top:0, behavior:"smooth"});
});
