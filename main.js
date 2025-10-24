const header = null; // không còn header cố định
const nav = document.getElementById('mainNav');
const navLinks = nav.querySelectorAll('.nav-link');

function smoothScrollTo(id) {
  const el = document.querySelector(id);
  if (!el) return;
  const headerHeight = 0; // không cần trừ header nữa
  const top = el.getBoundingClientRect().top + window.scrollY - headerHeight + 10;
  window.scrollTo({ top, behavior: 'smooth' });
}

navLinks.forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      smoothScrollTo(href);
      history.pushState(null, '', href);
    }
  });
});

const page = document.body.dataset.page;
if (page === 'site') {
  // code menu/topnav
}
if (page === 'pixel-mask') {
  // code cho pixel-mask
}

// Active link theo section
const sections = [...document.querySelectorAll('section[id]')];
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const link = nav.querySelector(`.nav-link[href="#${id}"]`);
    if (!link) return;
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { root: null, threshold: 0.5 });

sections.forEach(sec => io.observe(sec));
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('mainNav');
    if (!nav) return;               // Không có #mainNav thì thoát, tránh lỗi
  
    const navLinks = nav.querySelectorAll('.nav-link');
    // ... phần code xử lý navLinks của bạn ở dưới
  });
  