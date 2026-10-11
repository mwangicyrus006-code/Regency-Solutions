// ===== EMAILJS SETUP (see README) =====
const CFG = { PUBLIC_KEY: 'YOUR_PUBLIC_KEY', SERVICE_ID: 'YOUR_SERVICE_ID', TEMPLATE_COMPANY: 'template_company', TEMPLATE_REPLY: 'template_autoreply', COMPANY_EMAIL: 'solutionsregency@gmail.com' };
const ready = CFG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY'; if (ready) emailjs.init({ publicKey: CFG.PUBLIC_KEY });
const m = document.getElementById('m');
document.addEventListener('click', e => {
  const a = e.target.closest('.pl'); if (a) { e.preventDefault(); m.querySelector('[name=service]').value = a.dataset.service; m.classList.add('open') }
  if (e.target.matches('.x') || e.target === m) m.classList.remove('open')
});
document.querySelectorAll('.rf').forEach(f => f.addEventListener('submit', async e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(f)), box = f.querySelector('.msg'), btn = f.querySelector('button.btn');
  d.to_company = CFG.COMPANY_EMAIL; d.page = location.pathname; d.time = new Date().toLocaleString();
  d.subject = f.dataset.kind == 'news' ? 'New newsletter subscriber' : f.dataset.reply ? `Pricing plan request: ${d.service}` : f.dataset.kind == 'query' ? 'New website query' : `New project enquiry: ${d.service}`;
  d.message = f.dataset.kind == 'news' ? `${d.email} subscribed to the newsletter` : f.dataset.reply ? `${d.name} (${d.email}) requested the pricing plan for: ${d.service}` : d.enquiry + (d.start_date ? `\nStart: ${d.start_date}\nDeadline: ${d.deadline}\nPhone: ${d.phone}` : '');
  if (!ready) { location.href = `mailto:${CFG.COMPANY_EMAIL}?subject=${encodeURIComponent(d.subject)}&body=${encodeURIComponent(d.message)}`; return }
  btn.disabled = true; box.textContent = 'Sending...';
  try {
    await emailjs.send(CFG.SERVICE_ID, CFG.TEMPLATE_COMPANY, d); if (f.dataset.reply) await emailjs.send(CFG.SERVICE_ID, CFG.TEMPLATE_REPLY, d);
    box.textContent = f.dataset.kind == 'news' ? 'Subscribed. Thank you!' : f.dataset.reply ? 'Done. Check your inbox for the pricing plan.' : 'Thank you. We will be in touch shortly.'; f.reset()
  }
  catch (x) { box.textContent = 'Something went wrong. Please try again or email us directly.' } btn.disabled = false
}));
