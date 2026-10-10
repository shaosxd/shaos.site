/*
 * Cuando estén listas las páginas de contacto, reemplazar "" por cada ruta.
 * Ejemplo: shaosmc: "contacto-shaosmc.html"
 * También admite direcciones completas HTTPS o enlaces mailto:.
 * Las tres opciones permanecen independientes.
 */
const CONTACT_DESTINATIONS = {
  shaoskrr: "",
  shaosmc: "",
  shaosxd: ""
};

const CHANNEL_NAMES = {
  shaoskrr: "Shaoskrr",
  shaosmc: "ShaosMC",
  shaosxd: "ShaosXD"
};

const dialog = document.getElementById("contact-dialog");
const dialogTitle = document.getElementById("dialog-title");
const dialogDescription = document.getElementById("dialog-description");
const closeButton = document.getElementById("dialog-close");
const backButton = document.getElementById("dialog-back");

function openContact(channel) {
  if (!Object.hasOwn(CHANNEL_NAMES, channel)) return;

  const destination = CONTACT_DESTINATIONS[channel].trim();
  if (destination) {
    // Evitar esquemas peligrosos al conectar nuevas direcciones.
    const valid = destination.startsWith("https://") || destination.startsWith("mailto:") || /^[a-z0-9][a-z0-9/_.-]*\.html(?:[?#].*)?$/i.test(destination);
    if (valid) window.location.href = destination;
    return;
  }

  dialogTitle.textContent = `Contacto · ${CHANNEL_NAMES[channel]}`;
  dialogDescription.textContent = `La página de contacto de ${CHANNEL_NAMES[channel]} todavía se está preparando. Cada canal tendrá su propio contacto.`;
  dialog.showModal();
}

document.querySelectorAll("[data-contact]").forEach(button => {
  button.addEventListener("click", () => openContact(button.dataset.contact));
});

closeButton.addEventListener("click", () => dialog.close());
backButton.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", e => {
  if (e.target === dialog) dialog.close();
});
