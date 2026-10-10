/*
 * CONTACTOS POR CANAL
 * Por ahora los tres formularios usan el correo ya configurado en tu web original.
 * Cuando tengas los 3 emails, cambiá SOLO los valores de este objeto.
 * No hace falta editar las páginas HTML.
 */
const CHANNEL_EMAILS = {
  shaoskrr: 'shaoscontact@gmail.com',
  shaosmc: 'shaoscontact@gmail.com',
  shaosxd: 'shaoscontact@gmail.com'
};

const form = document.querySelector('.contact-form[data-channel]');
if (form) {
  const channel = form.dataset.channel;
  const email = CHANNEL_EMAILS[channel];
  if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    form.action = 'https://formsubmit.co/' + email;
  }
  if (new URLSearchParams(window.location.search).get('enviado') === '1') {
    document.querySelector('.success-note')?.classList.add('is-visible');
  }
}
