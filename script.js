/*
 * SHAOS.SITE — Portada de los tres canales
 * Actualización: cielo nocturno discreto, luna cuadrada estilo Minecraft
 * y partículas pequeñas que flotan lentamente.
 *
 * Página principal: al tocar CONTACTO se abre la página individual de cada canal.
 * Mantiene el fondo nocturno, luna y partículas originales.
 */

// Cuando estén listas las páginas de contacto, completar cada ruta aquí.
// Ejemplos: "contacto-shaoskrr.html" o "mailto:correo@ejemplo.com".
const CONTACT_DESTINATIONS = {
  shaoskrr: "contacto-shaoskrr.html",
  shaosmc: "contacto-shaosmc.html",
  shaosxd: "contacto-shaosxd.html"
};

const CHANNEL_NAMES = {
  shaoskrr: "Shaoskrr",
  shaosmc: "ShaosMC",
  shaosxd: "ShaosXD"
};

// =========================
// BOTONES DE CONTACTO
// =========================
const dialog = document.getElementById("contact-dialog");
const dialogTitle = document.getElementById("dialog-title");
const dialogDescription = document.getElementById("dialog-description");
const closeButton = document.getElementById("dialog-close");
const backButton = document.getElementById("dialog-back");

function openContact(channel) {
  if (!Object.prototype.hasOwnProperty.call(CHANNEL_NAMES, channel)) return;

  const destination = CONTACT_DESTINATIONS[channel].trim();
  if (destination) {
    // Los enlaces de contacto se definen manualmente aquí.
    const isSafe = destination.startsWith("https://") ||
      destination.startsWith("mailto:") ||
      /^[a-z0-9][a-z0-9/_.-]*\.html(?:[?#].*)?$/i.test(destination);
    if (isSafe) window.location.href = destination;
    return;
  }

  if (!dialog || !dialogTitle || !dialogDescription) return;
  dialogTitle.textContent = `Contacto · ${CHANNEL_NAMES[channel]}`;
  dialogDescription.textContent =
    `La página de contacto de ${CHANNEL_NAMES[channel]} todavía se está preparando. Cada canal tendrá su propio contacto.`;
  dialog.showModal();
}

document.querySelectorAll("[data-contact]").forEach(button => {
  button.addEventListener("click", () => openContact(button.dataset.contact));
});

if (dialog) {
  if (closeButton) closeButton.addEventListener("click", () => dialog.close());
  if (backButton) backButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
}

// =========================
// NUEVO FONDO NOCTURNO
// =========================
(function createNightBackground() {
  const scene = document.querySelector(".scene");
  if (!scene) return;

  // La luna es una textura de 16 x 16 píxeles, dibujada en el navegador.
  // Así no hace falta subir ningún archivo adicional a assets.
  const moonPixels = [
    "AAAABBBBBBAAAAAA",
    "AABBBBBBBBBBAAAA",
    "ABBBCCCCBBBAABAA",
    "ABCCCCCCBBBAABBA",
    "BBCDDCCBBABBABBA",
    "BBCDDCCBBBBAABBA",
    "BBCCCCBBABBAABBA",
    "BBBCBBBBAABBABBA",
    "BBBBCBBBABBBABBA",
    "ABBBBAAABCCBBBBA",
    "AABBAAAACDDCBBAA",
    "AABBAABBCDDCBBAA",
    "AABBBABBBCCBBBAA",
    "AABBBBBBBBBAAAAA",
    "AAABBBBBBBAAAAAA",
    "AAAAABBBBAAAAAAA"
  ];
  const colors = {
    A: "#9db5d5", // borde sombreado
    B: "#c0d4eb", // superficie
    C: "#d9e6f6", // reflejos
    D: "#91aed2"  // cráteres
  };
  const moonCanvas = document.createElement("canvas");
  moonCanvas.width = 16;
  moonCanvas.height = 16;
  const ctx = moonCanvas.getContext("2d");
  if (ctx) {
    moonPixels.forEach((row, y) => {
      [...row.slice(0, 16)].forEach((pixel, x) => {
        ctx.fillStyle = colors[pixel] || colors.B;
        ctx.fillRect(x, y, 1, 1);
      });
    });
  }

  // Se agregan estos estilos desde JS para que SOLO tengas que reemplazar script.js.
  const style = document.createElement("style");
  style.id = "shaos-night-background";
  style.textContent = `
    body { background: #080e1d; }

    .scene {
      inset: 0 !important;
      transform: none !important;
      filter: none !important;
      overflow: hidden;
      background:
        radial-gradient(ellipse 54% 45% at 50% 50%, rgba(33,51,87,.34), transparent 85%),
        radial-gradient(ellipse 48% 35% at 66% 0%, rgba(28,49,91,.40), transparent 95%),
        linear-gradient(180deg, #0a1428 0%, #0a1122 58%, #080d1a 100%) !important;
    }

    .scene-shade {
      background:
        radial-gradient(ellipse 100% 85% at 50% 45%, transparent 51%, rgba(2,5,12,.28) 100%) !important;
    }

    .night-moon {
      position: absolute;
      top: clamp(22px, 5vh, 65px);
      left: 55%;
      width: clamp(65px, 7vw, 94px);
      aspect-ratio: 1 / 1;
      background: url("${ctx ? moonCanvas.toDataURL("image/png") : ""}") center / 100% 100% no-repeat;
      image-rendering: pixelated;
      opacity: .82;
      box-shadow: 0 0 28px 9px rgba(143,175,242,.10), 0 0 65px 19px rgba(104,136,215,.07);
      pointer-events: none;
    }

    .night-cloud {
      position: absolute;
      width: 175px;
      height: 36px;
      opacity: .11;
      background: #405676;
      clip-path: polygon(0 56%,18% 56%,18% 29%,39% 29%,39% 0,69% 0,69% 28%,88% 28%,88% 57%,100% 57%,100% 100%,0 100%);
      pointer-events: none;
    }
    .night-cloud--left { top: 16%; left: -22px; }
    .night-cloud--right { top: 28%; right: -28px; transform: scale(.83); }
    .night-cloud--bottom { top: 73%; left: 7%; transform: scale(.9); opacity: .065; }

    .night-particle {
      position: absolute;
      display: block;
      border-radius: 1px;
      background: #b8ceff;
      opacity: 0;
      box-shadow: 0 0 7px 1px rgba(147,176,255,.30);
      pointer-events: none;
      animation: shaos-night-float var(--float-duration) linear var(--float-delay) infinite;
    }
    .night-particle--purple {
      background: #ae9afc;
      box-shadow: 0 0 7px 1px rgba(158,122,245,.23);
    }

    @keyframes shaos-night-float {
      0%   { transform: translate3d(0,24px,0); opacity: 0; }
      18%  { opacity: var(--float-opacity); }
      60%  { opacity: var(--float-opacity); }
      86%  { opacity: var(--float-opacity); }
      100% { transform: translate3d(var(--float-drift),-76px,0); opacity: 0; }
    }

    @media (max-width: 700px) {
      .night-moon { left: auto; right: 7%; top: 14px; width: 54px; opacity: .60; }
      .night-cloud--bottom { display: none; }
    }
    @media (prefers-reduced-motion: reduce) {
      .night-particle { animation: none !important; opacity: .25 !important; }
    }
  `;
  document.head.appendChild(style);

  const moon = document.createElement("div");
  moon.className = "night-moon";
  moon.setAttribute("aria-hidden", "true");
  scene.appendChild(moon);

  ["left", "right", "bottom"].forEach(position => {
    const cloud = document.createElement("div");
    cloud.className = `night-cloud night-cloud--${position}`;
    cloud.setAttribute("aria-hidden", "true");
    scene.appendChild(cloud);
  });

  // Repartición estable: las estrellas no saltan de lugar en cada recarga.
  let seed = 20261010;
  function random() {
    seed = (1664525 * seed + 1013904223) >>> 0;
    return seed / 4294967296;
  }

  // Poquitas partículas: se elevan apenas 100 píxeles durante 25–45 segundos.
  const particleCount = window.matchMedia("(max-width: 700px)").matches ? 18 : 30;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("span");
    particle.className = `night-particle${random() > .81 ? " night-particle--purple" : ""}`;
    const size = random() > .85 ? 3 : (random() > .43 ? 2 : 1);
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${2 + random() * 96}%`;
    particle.style.top = `${8 + random() * 88}%`;
    particle.style.setProperty("--float-duration", `${25 + random() * 20}s`);
    particle.style.setProperty("--float-delay", `${-random() * 45}s`);
    particle.style.setProperty("--float-opacity", `${.20 + random() * .27}`);
    particle.style.setProperty("--float-drift", `${-15 + random() * 30}px`);
    scene.appendChild(particle);
  }
})();
