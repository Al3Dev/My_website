import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Registrar plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);

export const initAnimations = () => {
  // Timeline principal de entrada
  const mainTimeline = gsap.timeline();
  
  // Animación de entrada del hero
  mainTimeline
    .from('.floating-name h1', {
      duration: 1.5,
      y: 100,
      opacity: 0,
      ease: "power3.out"
    })
    .from('.character-overlay', {
      duration: 1.2,
      x: -200,
      opacity: 0,
      ease: "back.out(1.7)"
    }, "-=0.8")
    .from('.star', {
      duration: 1,
      scale: 0,
      opacity: 0,
      stagger: 0.2,
      ease: "back.out(1.7)"
    }, "-=0.5")
    .from('.game-buttons .pixel-btn', {
      duration: 0.8,
      y: 50,
      opacity: 0,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.3");

  // Animaciones de scroll mejoradas para TODAS las secciones
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
    gsap.utils.toArray(sectionSelector).forEach((section: any) => {
      // Animación principal de la sección
      gsap.fromTo(section, 
        {
          y: 60,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animación de los elementos internos de cada sección
      const elements = section.querySelectorAll('h1, h2, h3, p, .project-card, .service-card, .skill-tag, .timeline-item, .product-card, .video-card, .gallery-item');
      
      elements.forEach((element: any, index: number) => {
        gsap.fromTo(element,
          {
            y: 30,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    });
  });

  // Animación especial para títulos de sección
  gsap.utils.toArray('.section-title, .about-title, .projects-title, .services-title, .music-title, .game-title, .store-title, .creations-title, .stories-title').forEach((title: any) => {
    gsap.fromTo(title,
      {
        y: 40,
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: title,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Animación de las estrellas flotantes (más suave)
  gsap.to('.star', {
    y: -15,
    duration: 4,
    ease: "power1.inOut",
    stagger: 0.8,
    repeat: -1,
    yoyo: true
  });

  // Animación del navbar (más elegante)
  gsap.from('.navbar', {
    duration: 1.2,
    y: -80,
    opacity: 0,
    ease: "power3.out"
  });

  // Animación de los botones del juego (más sutil)
  gsap.to('.pixel-btn', {
    scale: 1.02,
    duration: 2,
    ease: "power1.inOut",
    stagger: 0.2,
    repeat: -1,
    yoyo: true,
    repeatDelay: 3
  });

  // Animación de texto typing para el título
  gsap.to('.floating-name h1', {
    duration: 2.5,
    text: "AlleRoDI",
    ease: "none",
    delay: 0.8
  });

  // Animación mejorada para las tarjetas de proyectos
  gsap.utils.toArray('.project-card').forEach((card: any, index: number) => {
    gsap.fromTo(card,
      {
        scale: 0.9,
        opacity: 0,
        rotationY: 15
      },
      {
        scale: 1,
        opacity: 1,
        rotationY: 0,
        duration: 1,
        ease: "back.out(1.4)",
        delay: index * 0.15,
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Animación mejorada para las habilidades
  gsap.utils.toArray('.skill-tag').forEach((skill: any, index: number) => {
    gsap.fromTo(skill,
      {
        x: -30,
        opacity: 0,
        scale: 0.8
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: "back.out(1.7)",
        delay: index * 0.08,
        scrollTrigger: {
          trigger: skill,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Animación del chatbot (más elegante)
  gsap.from('.chatbot-fab', {
    duration: 1.5,
    scale: 0,
    rotation: 180,
    ease: "back.out(1.7)",
    delay: 2.5
  });

  // Animación de entrada del chat (más suave)
  gsap.from('.chatbot-window', {
    duration: 0.6,
    scale: 0.9,
    opacity: 0,
    ease: "back.out(1.4)"
  });

  // Animación de las partículas de destrucción
  gsap.utils.toArray('.particle').forEach((particle: any) => {
    gsap.to(particle, {
      x: gsap.utils.random(-150, 150),
      y: gsap.utils.random(-150, 150),
      rotation: gsap.utils.random(-360, 360),
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
      delay: gsap.utils.random(0, 0.3)
    });
  });

  // Animación especial para imágenes
  gsap.utils.toArray('img').forEach((img: any) => {
    gsap.fromTo(img,
      {
        scale: 0.95,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: img,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Animación para el footer
  gsap.from('.pixel-footer', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power2.out",
    scrollTrigger: {
      trigger: '.pixel-footer',
      start: "top 90%",
      toggleActions: "play none none reverse"
    }
  });
};

// Función para animar elementos al hacer hover (más suave)
export const animateHover = (element: HTMLElement) => {
  gsap.to(element, {
    scale: 1.03,
    duration: 0.4,
    ease: "power2.out"
  });
};

export const animateHoverOut = (element: HTMLElement) => {
  gsap.to(element, {
    scale: 1,
    duration: 0.4,
    ease: "power2.out"
  });
};

// Función para animar el scroll suave (más fluido)
export const smoothScrollTo = (target: string) => {
  gsap.to(window, {
    duration: 2,
    scrollTo: target,
    ease: "power2.inOut"
  });
}; 