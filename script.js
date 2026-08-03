document.addEventListener('DOMContentLoaded', () => {

  /* ===== Footer year ===== */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ===== Navbar scroll state + progress bar + scrollspy ===== */
  const navbar = document.getElementById('navbar');
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main .section, .hero');

  function onScroll() {
    const scrollY = window.scrollY;
    navbar.classList.toggle('scrolled', scrollY > 40);
    backToTop.classList.toggle('show', scrollY > 500);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';

    let current = 'home';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (scrollY >= top) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active-link', link.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ===== Mobile menu ===== */
  const hamburger = document.getElementById('hamburger');
  const navLinksList = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksList.classList.toggle('open');
  });
  navLinksList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksList.classList.remove('open');
    });
  });

  /* ===== Theme toggle ===== */
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('resume-theme');
  if (savedTheme === 'light') document.body.classList.add('light-mode');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('resume-theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
  });

  /* ===== Typed text effect ===== */
  const typedTextEl = document.getElementById('typedText');
  const phrases = ['AI/ML.', 'Agentic AI.', 'Full-Stack Development.'];
  let phraseIndex = 0, charIndex = 0, deleting = false;

  function typeLoop() {
    const currentPhrase = phrases[phraseIndex];
    if (!deleting) {
      charIndex++;
      typedTextEl.textContent = currentPhrase.slice(0, charIndex);
      if (charIndex === currentPhrase.length) {
        deleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      charIndex--;
      typedTextEl.textContent = currentPhrase.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(typeLoop, deleting ? 40 : 90);
  }
  typeLoop();

  /* ===== Reveal on scroll ===== */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ===== Skill bars fill on visibility ===== */
  function fillVisibleBars(container) {
    container.querySelectorAll('.skill-bar').forEach(bar => {
      const fill = bar.querySelector('.bar-fill');
      const level = bar.dataset.level;
      fill.style.width = level + '%';
    });
  }
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        fillVisibleBars(entry.target);
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.tab-content').forEach(tc => skillObserver.observe(tc));

  /* ===== Skills tabs ===== */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(tc => tc.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById(btn.dataset.tab);
      target.classList.add('active');
      fillVisibleBars(target); // ensure bars fill immediately when switching tabs
    });
  });

  /* ===== Contact form (client-side demo) ===== */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    formStatus.textContent = `Thanks, ${name || 'friend'}! Your message has been noted. (Connect a backend or form service to receive real emails.)`;
    contactForm.reset();
    setTimeout(() => { formStatus.textContent = ''; }, 6000);
  });

  /* ===== Download resume placeholder ===== */
  document.getElementById('downloadResume').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Add your PDF resume file to this folder and update the link in index.html (id="downloadResume") to point to it, e.g. href="Srishti_Duggal_Resume.pdf" download.');
  });

});
