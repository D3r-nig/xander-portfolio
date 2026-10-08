const glow = document.querySelector('.cursor-glow');
if (glow) window.addEventListener('pointermove', (event) => { glow.style.left = `${event.clientX}px`; glow.style.top = `${event.clientY}px`; });

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); }), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.desktop-nav');
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') === 'true'; menuButton.setAttribute('aria-expanded', String(!open)); menuButton.setAttribute('aria-label', open ? 'Open menu' : 'Close menu'); nav.classList.toggle('mobile-open', !open); });
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open menu'); nav.classList.remove('mobile-open'); }));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { menuButton.click(); menuButton.focus(); } });

const certificateModal = document.querySelector('#certificate-modal');
const certificateCard = document.querySelector('.cert-card');
let certificateTrigger;
const closeCertificate = () => { certificateModal.hidden = true; document.body.classList.remove('modal-open'); certificateTrigger?.focus(); };
certificateCard.addEventListener('click', () => { certificateTrigger = document.activeElement; certificateModal.hidden = false; document.body.classList.add('modal-open'); certificateModal.querySelector('.modal-close').focus(); });
certificateModal.querySelectorAll('[data-close-certificate], .modal-close').forEach((element) => element.addEventListener('click', closeCertificate));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !certificateModal.hidden) closeCertificate(); });

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
contactForm.addEventListener('submit', (event) => { event.preventDefault(); formStatus.textContent = ''; if (!contactForm.checkValidity()) { contactForm.reportValidity(); return; } formStatus.textContent = 'Thanks! Your message is ready to send. I will get back to you soon.'; contactForm.reset(); });
