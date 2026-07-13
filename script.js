// Inject copy buttons into all <pre> blocks
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('pre').forEach(pre => {
    if (pre.closest('.compare-bad, .compare-good')) return;
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = '복사';
    btn.addEventListener('click', () => {
      const text = (pre.querySelector('code')?.innerText ?? pre.innerText).trim();
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = '복사됨 ✓';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = '복사';
          btn.classList.remove('copied');
        }, 1500);
      });
    });
    pre.appendChild(btn);
  });
});

function switchTab(btn, id) {
  const tabsContainer = btn.closest('.os-tabs');
  tabsContainer.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  tabsContainer.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(id).classList.add('active');
}

// Active nav highlight on scroll
const sections = document.querySelectorAll('.step-section, .hero');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}, { rootMargin: '-20% 0px -70% 0px' });

document.querySelectorAll('[id]').forEach(el => observer.observe(el));
