document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================================
  // 1. BOTÃO FLUTUANTE DO WHATSAPP
  // ==========================================================
  const whatsappFloat = document.querySelector('.whatsapp-float');
  const whatsappTriggerPoint = 200; // Aparece após rolar 200px

  if (whatsappFloat) {
    const checkWhatsAppVisibility = () => {
      if (window.scrollY > whatsappTriggerPoint) {
        whatsappFloat.classList.add('is-visible');
      } else {
        whatsappFloat.classList.remove('is-visible');
      }
    };

    checkWhatsAppVisibility();
    window.addEventListener('scroll', checkWhatsAppVisibility, { passive: true });
  }

  // ==========================================================
  // 2. TRANSIÇÕES SUAVES (SCROLL REVEAL)
  // ==========================================================
  const revealElements = document.querySelectorAll(
    '.hero__badge, .hero__title, .hero__text, .hero__actions, .hero__image, ' +
    '.eyebrow, .section__title, ' +
    '.card-info, .card-modalidade, .modalidade__img, .card-depoimento, .cta-box'
  );

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => {
      el.classList.add('reveal-init');
      revealObserver.observe(el);
    });

  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // ==========================================================
  // 3. AUTOPLAY DOS CARROSSEIS DE FOTOS (Modalidades)
  // ==========================================================
  const sliders = document.querySelectorAll('.js-slider');
  
  sliders.forEach(slider => {
    let isHovered = false;
    let autoplayInterval;
    const delay = 3000; // Tempo em milissegundos (3 segundos)

    // Função que faz a troca da foto
    const nextSlide = () => {
      // Se o mouse estiver em cima ou dedo na tela, não avança
      if (isHovered) return; 

      const scrollWidth = slider.clientWidth;
      const maxScroll = slider.scrollWidth - scrollWidth;
      const currentScroll = slider.scrollLeft;

      // Se chegou na última foto (com uma margem de erro de 10px), volta para a primeira
      if (currentScroll >= maxScroll - 10) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Se não, rola para a próxima foto
        slider.scrollBy({ left: scrollWidth, behavior: 'smooth' });
      }
    };

    // Inicia o autoplay
    const startAutoplay = () => {
      clearInterval(autoplayInterval);
      autoplayInterval = setInterval(nextSlide, delay);
    };

    // Inicia o loop automaticamente
    startAutoplay();

    // Pausa o autoplay ao passar o mouse (Desktop)
    slider.addEventListener('mouseenter', () => { isHovered = true; });
    slider.addEventListener('mouseleave', () => { isHovered = false; });

    // Pausa ao tocar (Mobile) e retoma após 2s que o dedo saiu
    slider.addEventListener('touchstart', () => { isHovered = true; }, { passive: true });
    slider.addEventListener('touchend', () => { 
      setTimeout(() => { isHovered = false; }, 2000); 
    }, { passive: true });
  });

});