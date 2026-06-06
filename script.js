console.log('Shaos.site listo');
/* =========================
   CONTADORES
========================= */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
(entries) => {

entries.forEach(entry => {

if (!entry.isIntersecting) return;

const counter = entry.target;

const target = Number(counter.dataset.target);

let current = 0;

const duration = 2500;

const increment = target / (duration / 16);

function updateCounter() {

current += increment;

if (current < target) {

if(target >= 1000000){

counter.innerText =
(Math.floor(current) / 1000000).toFixed(2) + "M+";

}
else{

counter.innerText =
Math.floor(current).toLocaleString();

}

requestAnimationFrame(updateCounter);

}
else{

if(target === 1290000){

counter.innerText = "1.29M+";

}
else if(target === 468000000){
    counter.innerText = "468M+";
}
else if(target === 38000000){

counter.innerText = "38M+";

}
else{

counter.innerText = target;

}

}

}

updateCounter();

counterObserver.unobserve(counter);

});

},
{
threshold:0.4
}
);

counters.forEach(counter=>{
counterObserver.observe(counter);
});

/* =========================
   REVEAL ANIMATION
========================= */

const revealElements = document.querySelectorAll(
".stat-card, .impact-card, .timeline-item, .contact-card, .about-section"
);

const revealObserver = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},
{
threshold:0.15
}
);

revealElements.forEach(el=>{

el.classList.add("hidden");

revealObserver.observe(el);

});

/* =========================
   NAVBAR SCROLL EFFECT
========================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

if(window.scrollY > 80){

navbar.style.background =
"rgba(5,6,10,.85)";

navbar.style.boxShadow =
"0 0 25px rgba(0,0,0,.4)";

}
else{

navbar.style.background =
"rgba(5,6,10,.45)";

navbar.style.boxShadow =
"none";

}

});

/* =========================
   PARTICULAS
========================= */

const particles =
document.querySelector(".particles");

for(let i = 0; i < 35; i++){

const particle =
document.createElement("div");

particle.classList.add("particle");

particle.style.left =
Math.random() * 100 + "%";

particle.style.top =
Math.random() * 100 + "%";

particle.style.animationDuration =
8 + Math.random() * 10 + "s";

particle.style.animationDelay =
Math.random() * 5 + "s";

particles.appendChild(particle);

}

/* =========================
   MOUSE GLOW
========================= */

const glow =
document.createElement("div");

glow.classList.add("mouse-glow");

document.body.appendChild(glow);

document.addEventListener("mousemove",(e)=>{

glow.style.left =
e.clientX + "px";

glow.style.top =
e.clientY + "px";

});

/* =========================
   HERO POP
========================= */

window.addEventListener("load",()=>{

document.querySelector(".hero-content")
.classList.add("hero-visible");

document.querySelector(".hero-image")
.classList.add("hero-visible");

});
