const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() {
  mobileNav.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
}
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  mobileNav.hidden = expanded;
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  menuToggle.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
window.matchMedia('(min-width: 801px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(filter => {
      const active = filter === button;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('[data-category]').forEach(card => {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    });
  });
});

const dialog = document.querySelector('#quote-dialog');
const form = document.querySelector('#quote-form');
const entry = document.querySelector('#quote-entry');
const result = document.querySelector('#quote-result');
const preview = document.querySelector('#brief-preview');
const status = document.querySelector('#brief-status');
let lastTrigger;
let brief = '';
function showEntry() {
  entry.hidden = false;
  result.hidden = true;
  dialog.setAttribute('aria-labelledby', 'quote-title');
  status.textContent = '';
}
document.querySelectorAll('[data-quote]').forEach(button => {
  button.addEventListener('click', () => {
    lastTrigger = button;
    closeMenu();
    showEntry();
    if (button.dataset.quote) form.elements.service.value = button.dataset.quote;
    dialog.showModal();
    document.body.classList.add('modal-open');
  });
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  lastTrigger?.focus();
});
form.addEventListener('submit', event => {
  event.preventDefault();
  const values = Object.fromEntries(new FormData(form));
  const date = values.date ? new Date(`${values.date}T12:00:00`).toLocaleDateString('en-IN', {day:'numeric',month:'long',year:'numeric'}) : 'Flexible / to discuss';
  brief = `PRINTZONE — PROJECT ENQUIRY\n\nName: ${values.name.trim()}\nEmail: ${values.email.trim()}\nService: ${values.service}\nQuantity: ${values.quantity.trim() || 'To discuss'}\nIdeal date: ${date}\n\nThe idea:\n${values.details.trim()}\n\nPlease let me know the next steps, available options and a quote. Thank you!`;
  preview.textContent = brief;
  entry.hidden = true;
  result.hidden = false;
  result.querySelector('h2').id = 'result-title';
  dialog.setAttribute('aria-labelledby', 'result-title');
  dialog.scrollTop = 0;
  document.querySelector('#copy-brief').focus();
});
document.querySelector('#edit-brief').addEventListener('click', () => { showEntry(); form.elements.name.focus(); });
document.querySelector('#copy-brief').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(brief);
    status.textContent = 'Copied! Open LinkedIn and paste your brief into a message to Printzone.';
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(preview);
    selection.removeAllRanges();
    selection.addRange(range);
    status.textContent = 'Your brief is selected. Use your device’s Copy command, or download it below.';
  }
});
document.querySelector('#download-brief').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([brief], {type: 'text/plain;charset=utf-8'}));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'printzone-project-brief.txt';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  status.textContent = 'Your project brief has been downloaded. Share it with Printzone when you’re ready.';
});
document.querySelector('#year').textContent = new Date().getFullYear();
