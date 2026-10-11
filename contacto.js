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

/* ==========================================================
   ANIMACIONES DE ENTRADA Y SCROLL · no altera formularios.
   ========================================================== */
(() => {
  if (!document.body.classList.contains('channel-page')) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;
  document.body.classList.add('motion-enabled');

  // Cifra de alcance: animación de 0 a su valor histórico, solo al abrir.
  // Se conserva exactamente el texto original al finalizar.
  const reachNumber = document.querySelector('.reach-number');
  if (reachNumber) {
    const original = reachNumber.textContent.trim();
    const match = original.match(/^(\d+(?:[,.]\d+)?)\s*(M)$/i);
    if (match) {
      const value = Number(match[1].replace(',', '.'));
      const decimal = match[1].includes(',') || match[1].includes('.');
      if (Number.isFinite(value)) {
        const started = performance.now() + 490;
        const duration = 1700;
        const formatter = new Intl.NumberFormat('es-AR', {
          minimumFractionDigits: decimal ? 1 : 0,
          maximumFractionDigits: decimal ? 1 : 0
        });
        function countFrame(now) {
          if (!reachNumber.isConnected) return;
          const progress = Math.max(0, Math.min(1, (now - started) / duration));
          // Desaceleración hacia el valor final.
          const ease = 1 - Math.pow(1 - progress, 3);
          reachNumber.textContent = progress >= 1 ? original : `${formatter.format(value * ease)} M`;
          if (progress < 1) window.requestAnimationFrame(countFrame);
        }
        window.requestAnimationFrame(countFrame);
      }
    }
  }

  // Los bloques fuera de pantalla se revelan gradualmente al desplazarse.
  // No se oculta nada que ya está visible al cargar la página.
  if (!('IntersectionObserver' in window)) return;
  const targets = document.querySelectorAll([
    '.audience-section .section-heading',
    '.audience-section .glass-panel',
    '.videos-section .section-heading',
    '.videos-section .video-card',
    '.collab-section .section-heading',
    '.collab-section .collab-item',
    '.contact-section-new'
  ].join(','));

  const observer = new IntersectionObserver((entries, ob) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      element.classList.add('motion-visible');
      ob.unobserve(element);
    });
  }, { rootMargin: '0px 0px 85px 0px', threshold: 0.05 });

  targets.forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight - 55) return;
    el.style.setProperty('--reveal-delay', `${(i % 3) * 75}ms`);
    el.classList.add('motion-reveal');
    observer.observe(el);
  });

  // Relleno de barras porcentuales una sola vez al entrar en pantalla.
  const barPanels = document.querySelectorAll('.glass-panel:has(.bar-track)');
  const barObserver = new IntersectionObserver((entries, ob) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('bars-visible');
      ob.unobserve(entry.target);
    });
  }, {rootMargin:'0px 0px 25px 0px',threshold:0.1});
  barPanels.forEach(panel => barObserver.observe(panel));
})();
