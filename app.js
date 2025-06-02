// Dados da aplicação
const appData = {
  competidores_internacionais: [
    { pais: "Austrália", participacao: 60 },
    { pais: "México", participacao: 15 },
    { pais: "Etiópia", participacao: 10 },
    { pais: "Brasil", participacao: 8 },
    { pais: "Outros", participacao: 7 }
  ],
  imagens: [
    {
      url: "https://pplx-res.cloudinary.com/image/upload/v1748897844/pplx_project_search_images/5ccdfa715e7a93596f80bcf709c9c8f89f9845e5.jpg",
      caption: "Coleção de anéis de opala em prata"
    },
    {
      url: "https://pplx-res.cloudinary.com/image/upload/v1748897843/pplx_project_search_images/d80eb3d6f246cc23df74ff183394c6a17c38675e.jpg",
      caption: "Vista aérea de Pedro II, Piauí"
    },
    {
      url: "https://pplx-res.cloudinary.com/image/upload/v1748897412/pplx_project_search_images/8d08ccddab4cf6973a21415a4b5254816e17d9a6.jpg",
      caption: "Joias artesanais de opala feitas à mão"
    },
    {
      url: "https://pplx-res.cloudinary.com/image/upload/v1748897843/pplx_project_search_images/519c31d501adbc6fc35cb13e19b7ff6b14afcbf2.jpg",
      caption: "Campo de futebol em Pedro II, Piauí"
    },
    {
      url: "https://pplx-res.cloudinary.com/image/upload/v1748897437/pplx_project_search_images/8aaa7d5cb14c4f2c770eeaf107a2d451c1d65e81.jpg",
      caption: "Igreja iluminada em Pedro II ao entardecer"
    },
    {
      url: "https://pplx-res.cloudinary.com/image/upload/v1748897437/pplx_project_search_images/21c110285f4d0465dbd677d54b864920799513c6.jpg",
      caption: "Mirante panorâmico em Pedro II, Piauí"
    },
    {
      url: "https://pplx-res.cloudinary.com/image/upload/v1748897843/pplx_project_search_images/e59411a8596f58f2b23ae5adfa05ea081522d241.jpg",
      caption: "Igreja Matriz de São José à noite"
    }
  ]
};

// Variável global para armazenar a instância do gráfico
let marketChartInstance = null;

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function() {
  console.log('Iniciando aplicação...');
  initNavigation();
  initCollapseSections();
  initGallery();
  initLightbox();
  initScrollSpy();
  initAnimations();
  
  // Aguardar um pouco antes de inicializar o gráfico para garantir que Chart.js carregou
  setTimeout(() => {
    initChart();
  }, 500);
});

// Navegação
function initNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav__link');

  // Toggle menu mobile
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  }

  // Navegação suave
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Fechar menu mobile
        navMenu.classList.remove('active');
        
        // Atualizar link ativo
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
}

// Seções colapsáveis
function initCollapseSections() {
  const collapseTriggers = document.querySelectorAll('.collapse__trigger');
  
  collapseTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      const collapseSection = this.parentElement;
      const content = collapseSection.querySelector('.collapse__content');
      
      // Toggle active state
      collapseSection.classList.toggle('active');
      content.classList.toggle('active');
      
      // Atualizar ícone
      const icon = this.querySelector('.collapse__icon');
      if (collapseSection.classList.contains('active')) {
        icon.textContent = '−';
      } else {
        icon.textContent = '+';
      }
    });
  });
}

// Gráfico de mercado
function initChart() {
  const ctx = document.getElementById('marketChart');
  if (!ctx) {
    console.warn('Elemento marketChart não encontrado');
    return;
  }
  
  // Verificar se Chart.js está disponível
  if (typeof Chart === 'undefined') {
    console.error('Chart.js não carregado');
    return;
  }
  
  try {
    // Destruir gráfico existente se houver
    if (marketChartInstance) {
      marketChartInstance.destroy();
    }
    
    const chartConfig = {
      type: 'doughnut',
      data: {
        labels: appData.competidores_internacionais.map(item => item.pais),
        datasets: [{
          data: appData.competidores_internacionais.map(item => item.participacao),
          backgroundColor: [
            '#1FB8CD',
            '#FFC185', 
            '#B4413C',
            '#ECEBD5',
            '#5D878F'
          ],
          borderWidth: 2,
          borderColor: '#ffffff',
          hoverBorderWidth: 4,
          hoverBorderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              font: {
                size: 14
              },
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.label + ': ' + context.parsed + '%';
              }
            },
            backgroundColor: 'rgba(19, 52, 59, 0.9)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: '#1FB8CD',
            borderWidth: 1,
            cornerRadius: 8
          }
        },
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 1000
        }
      }
    };
    
    marketChartInstance = new Chart(ctx, chartConfig);
    console.log('Gráfico criado com sucesso');
    
  } catch (error) {
    console.error('Erro ao criar gráfico:', error);
  }
}

// Galeria
function initGallery() {
  const galeriaGrid = document.getElementById('galeriaGrid');
  if (!galeriaGrid) {
    console.warn('Elemento galeriaGrid não encontrado');
    return;
  }
  
  // Limpar grid
  galeriaGrid.innerHTML = '';
  
  // Adicionar imagens
  appData.imagens.forEach((imagem, index) => {
    const galeriaItem = document.createElement('div');
    galeriaItem.className = 'galeria__item';
    galeriaItem.innerHTML = `
      <img src="${imagem.url}" alt="${imagem.caption}" loading="lazy">
      <div class="galeria__overlay">
        <div class="galeria__caption">${imagem.caption}</div>
      </div>
    `;
    
    // Adicionar evento de click para lightbox
    galeriaItem.addEventListener('click', function() {
      openLightbox(imagem.url, imagem.caption);
    });
    
    galeriaGrid.appendChild(galeriaItem);
  });
  
  console.log('Galeria inicializada com', appData.imagens.length, 'imagens');
}

// Lightbox
function initLightbox() {
  const lightboxClose = document.querySelector('.lightbox__close');
  const lightbox = document.getElementById('lightbox');
  
  if (!lightbox) {
    console.warn('Elemento lightbox não encontrado');
    return;
  }
  
  if (lightboxClose) {
    lightboxClose.addEventListener('click', function(e) {
      e.stopPropagation();
      closeLightbox();
    });
  }
  
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Fechar com ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
  
  console.log('Lightbox inicializado');
}

function openLightbox(imageSrc, caption) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  
  if (lightbox && lightboxImage && lightboxCaption) {
    lightboxImage.src = imageSrc;
    lightboxImage.alt = caption;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    console.log('Lightbox aberto:', caption);
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    console.log('Lightbox fechado');
  }
}

// Scroll Spy
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  
  function updateActiveLink() {
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  // Throttle scroll events para melhor performance
  let ticking = false;
  function throttledUpdateActiveLink() {
    if (!ticking) {
      requestAnimationFrame(function() {
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', throttledUpdateActiveLink);
  updateActiveLink(); // Executar uma vez no carregamento
}

// Animações de entrada
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        
        // Animação especial para stat cards
        if (entry.target.classList.contains('stat-card')) {
          entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
          entry.target.classList.add('animate-in');
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observar elementos para animação
  const animatedElements = document.querySelectorAll('.stat-card, .card, .galeria__item');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Funcionalidades de botões
document.addEventListener('click', function(e) {
  // Botão Hero CTA
  if (e.target.classList.contains('hero__cta')) {
    e.preventDefault();
    const sobreSection = document.getElementById('sobre');
    if (sobreSection) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = sobreSection.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }
  
  // Botão Turismo
  if (e.target.textContent === 'Planeje sua Visita') {
    e.preventDefault();
    alert('Em breve disponibilizaremos informações completas sobre turismo mineral em Pedro II. Entre em contato conosco para mais detalhes!');
  }
});

// Efeitos visuais adicionais
function addVisualEffects() {
  // Efeito shimmer nos stat cards
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.background = 'linear-gradient(45deg, var(--color-background), var(--color-opal-crystal))';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.background = 'var(--color-background)';
    });
  });
  
  // Parallax suave no hero
  let parallaxTicking = false;
  window.addEventListener('scroll', function() {
    if (!parallaxTicking) {
      requestAnimationFrame(function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero__image img');
        
        if (heroImage && scrolled < window.innerHeight) {
          heroImage.style.transform = `translateY(${scrolled * 0.2}px) scale(1.02)`;
        }
        parallaxTicking = false;
      });
      parallaxTicking = true;
    }
  });
}

// Funcionalidades de acessibilidade
function initAccessibility() {
  // Navegação por teclado
  const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
  
  focusableElements.forEach(element => {
    element.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        if (this.classList.contains('collapse__trigger')) {
          e.preventDefault();
          this.click();
        }
        if (this.classList.contains('galeria__item')) {
          e.preventDefault();
          this.click();
        }
      }
    });
  });
}

// Tratamento de erro para imagens
function handleImageErrors() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('error', function() {
      console.warn('Erro ao carregar imagem:', this.src);
      this.style.opacity = '0.3';
      this.alt = 'Imagem não disponível';
    });
    
    img.addEventListener('load', function() {
      this.style.opacity = '1';
      this.classList.remove('loading-shimmer');
    });
  });
}

// Performance e otimizações
function optimizePerformance() {
  // Lazy loading para imagens
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loading-shimmer');
          imageObserver.unobserve(img);
        }
      });
    });
    
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => imageObserver.observe(img));
  }
}

// Inicializar funcionalidades adicionais após DOM carregado
document.addEventListener('DOMContentLoaded', function() {
  addVisualEffects();
  initAccessibility();
  handleImageErrors();
  optimizePerformance();
});

// Fallback para Chart.js se não carregar
window.addEventListener('load', function() {
  if (typeof Chart === 'undefined') {
    console.warn('Chart.js não carregou, tentando novamente...');
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = function() {
      console.log('Chart.js carregado via fallback');
      setTimeout(initChart, 100);
    };
    document.head.appendChild(script);
  }
});

// Estado da aplicação
const appState = {
  currentSection: 'inicio',
  lightboxOpen: false,
  menuOpen: false
};

// Debug info
console.log('Aplicativo Opala Brasileira carregado!');
console.log('Dados disponíveis:', appData);