import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Registrar plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);

export const initAnimations = () => {
  // Timeline principal de entrada (más suave)
  const mainTimeline = gsap.timeline();
  
  // Animación de entrada del hero (más ligera)
  const name = document.querySelector('.floating-name h1');
  const character = document.querySelector('.character-overlay');
  const star = document.querySelector('.star');
  if (name) {
    mainTimeline
      .from(name, {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power2.out"
      })
      .from(character, {
        duration: 0.8,
        x: -100,
        opacity: 0,
        ease: "power2.out"
      }, "-=0.5")
      .from(star, {
        duration: 0.6,
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.3")
      .from('.game-buttons .pixel-btn', {
        duration: 0.5,
        y: 20,
        opacity: 0,
        stagger: 0.05,
        ease: "power2.out"
      }, "-=0.2");
  }

  // Animaciones de scroll más ligeras y optimizadas
  const sections = [
    '.about-section',
    '.projects-section', 
    '.services-section',
    '.music-section',
    '.game-section',
    '.store-project-section',
    '.creations-page',
    '.stories-page',
    '.store-page',
    '.section',
    '.gallery-section',
    '.inspiration-section',
    '.character-section'
  ];

  sections.forEach((sectionSelector) => {
    const sectionElements = document.querySelectorAll(sectionSelector);
    sectionElements.forEach((section: any) => {
      // Animación principal de la sección (más suave)
      gsap.fromTo(section, 
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  });

  // Animación especial para títulos de sección (más simple)
  gsap.utils.toArray('.section-title, .about-title, .projects-title, .services-title, .music-title, .game-title, .store-title, .creations-title, .stories-title').forEach((title: any) => {
    gsap.fromTo(title,
      {
        y: 20,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: title,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      }
    );
  });

  // Animación de las estrellas flotantes (más suave)
  gsap.to('.star', {
    y: -10,
    duration: 3,
    ease: "power1.inOut",
    stagger: 0.5,
    repeat: -1,
    yoyo: true
  });

  // Animación del navbar (más simple)
  gsap.from('.navbar', {
    duration: 0.8,
    y: -50,
    opacity: 0,
    ease: "power2.out"
  });

  // Animación de los botones del juego (más sutil y sin desaparecer)
  gsap.to('.pixel-btn', {
    scale: 1.01,
    duration: 3,
    ease: "power1.inOut",
    stagger: 0.3,
    repeat: -1,
    yoyo: true,
    repeatDelay: 4
  });

  // Animación de texto typing para el título (más rápida)
  gsap.to('.floating-name h1', {
    duration: 1.5,
    text: "AlleRoDI",
    ease: "none",
    delay: 0.5
  });

  // Animación mejorada para las tarjetas de proyectos (más simple)
  gsap.utils.toArray('.project-card').forEach((card: any, index: number) => {
    gsap.fromTo(card,
      {
        scale: 0.95,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        delay: index * 0.1,
        scrollTrigger: {
          trigger: card,
          start: "top 95%",
          toggleActions: "play none none none"
        }
      }
    );
  });

  // Animación mejorada para las habilidades (más simple)
  gsap.utils.toArray('.skill-tag').forEach((skill: any, index: number) => {
    gsap.fromTo(skill,
      {
        x: -20,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        delay: index * 0.05,
        scrollTrigger: {
          trigger: skill,
          start: "top 95%",
          toggleActions: "play none none none"
        }
      }
    );
  });

  // Animación de entrada del chat (más simple)
  const chatWindow = document.querySelector('.chatbot-window');
  if (chatWindow) {
    gsap.from(chatWindow, {
      duration: 0.4,
      scale: 0.95,
      opacity: 0,
      ease: "power2.out"
    });
  }

  // Animación de las partículas de destrucción (más simple)
  gsap.utils.toArray('.particle').forEach((particle: any) => {
    gsap.to(particle, {
      x: gsap.utils.random(-100, 100),
      y: gsap.utils.random(-100, 100),
      rotation: gsap.utils.random(-180, 180),
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: gsap.utils.random(0, 0.2)
    });
  });

  // Animación especial para imágenes (más simple)
  gsap.utils.toArray('img').forEach((img: any) => {
    gsap.fromTo(img,
      {
        scale: 0.98,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: img,
          start: "top 95%",
          toggleActions: "play none none none"
        }
      }
    );
  });

  // Animación para el footer (más simple)
  const footer = document.querySelector('.pixel-footer');
  if (footer) {
    gsap.from(footer, {
      duration: 0.6,
      y: 30,
      opacity: 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: footer,
        start: "top 95%",
        toggleActions: "play none none none"
      }
    });
  }

  // Asegurar que los botones del juego siempre sean visibles
  gsap.set('.game-buttons .pixel-btn', {
    opacity: 1,
    visibility: 'visible'
  });
};

// Función para animar elementos al hacer hover (más suave)
export const animateHover = (element: HTMLElement) => {
  gsap.to(element, {
    scale: 1.02,
    duration: 0.3,
    ease: "power2.out"
  });
};

export const animateHoverOut = (element: HTMLElement) => {
  gsap.to(element, {
    scale: 1,
    duration: 0.3,
    ease: "power2.out"
  });
};

// Función para animar el scroll suave (más fluido)
export const smoothScrollTo = (target: string) => {
  gsap.to(window, {
    duration: 1.5,
    scrollTo: target,
    ease: "power2.inOut"
  });
};

export const animateLoadingScreen = () => {
  const el = document.querySelector('.loading-screen');
  if (!el) return;
  gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' });
};

export const hideLoadingScreen = () => {
  const el = document.querySelector('.loading-screen');
  if (!el) return;
  gsap.to(el, {
    opacity: 0,
    duration: 0.7,
    ease: 'power2.in',
    onComplete: () => {
      (el as HTMLElement).style.display = 'none';
    }
  });
}; 