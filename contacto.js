/* SHAOS.SITE — Formulario comercial compartido.
 * Cambiá solo estos correos cuando estén listos los contactos individuales.
 * El CAPTCHA de FormSubmit está activado por defecto en el HTML.
 */
const CHANNEL_EMAILS = Object.freeze({
  shaoskrr: 'shaoscontact@gmail.com',
  shaosmc: 'shaoscontact@gmail.com',
  shaosxd: 'shaoscontact@gmail.com'
});

const form = document.querySelector('.contact-form[data-channel]');
if (form) {
  const channel = form.getAttribute('data-channel');
  const mail = CHANNEL_EMAILS[channel];
  if (mail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
    form.action = 'https://formsubmit.co/' + mail;
  }
  const proposalType = form.querySelector('#proposal-type');
  const serverBudget = form.querySelector('#server-budget');
  const budgetInput = form.querySelector('#budget');
  function updateProposalFields() {
    if (!proposalType || !serverBudget || !budgetInput) return;
    const isServer = proposalType.value === 'Servidor de Minecraft';
    serverBudget.hidden = !isServer;
    budgetInput.required = isServer;
    budgetInput.disabled = !isServer;
    if (!isServer) budgetInput.value = '';
  }
  proposalType?.addEventListener('change', updateProposalFields);
  updateProposalFields();
  if (new URLSearchParams(window.location.search).get('enviado') === '1') {
    document.querySelector('.success-note')?.classList.add('is-visible');
  }
}

const yearLabel = document.querySelector("[data-current-year]");
if (yearLabel) yearLabel.textContent = String(new Date().getFullYear());
