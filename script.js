const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (event) => { glow.style.left = `${event.clientX}px`; glow.style.top = `${event.clientY}px`; });

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); }), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.desktop-nav');
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') === 'true'; menuButton.setAttribute('aria-expanded', String(!open)); nav.classList.toggle('mobile-open', !open); });
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { menuButton.setAttribute('aria-expanded', 'false'); nav.classList.remove('mobile-open'); }));

const certificateModal = document.querySelector('#certificate-modal');
const certificateCard = document.querySelector('.cert-card');
const closeCertificate = () => { certificateModal.hidden = true; document.body.classList.remove('modal-open'); };
certificateCard.addEventListener('click', () => { certificateModal.hidden = false; document.body.classList.add('modal-open'); });
certificateModal.querySelectorAll('[data-close-certificate], .modal-close').forEach((element) => element.addEventListener('click', closeCertificate));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !certificateModal.hidden) closeCertificate(); });
