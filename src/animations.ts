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

  // Animaciones de scroll para secciones
  gsap.utils.toArray('.section, .about-section, .projects-section, .services-section, .music-section').forEach((section: any) => {
    gsap.fromTo(section, 
      {
        y: 100,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Animación de las estrellas flotantes
  gsap.to('.star', {
    y: -20,
    duration: 3,
    ease: "power1.inOut",
    stagger: 0.5,
    repeat: -1,
    yoyo: true
  });

  // Animación del navbar
  gsap.from('.navbar', {
    duration: 1,
    y: -100,
    opacity: 0,
    ease: "power2.out"
  });

  // Animación de los botones del juego
  gsap.to('.pixel-btn', {
    scale: 1.05,
    duration: 0.3,
    ease: "power2.out",
    stagger: 0.1,
    repeat: -1,
    yoyo: true,
    repeatDelay: 2
  });

  // Animación de texto typing para el título
  gsap.to('.floating-name h1', {
    duration: 2,
    text: "AlleRoDI",
    ease: "none",
    delay: 0.5
  });

  // Animación de las tarjetas de proyectos
  gsap.utils.toArray('.project-card').forEach((card: any, index: number) => {
    gsap.fromTo(card,
      {
        scale: 0.8,
        opacity: 0,
        rotationY: 45
      },
      {
        scale: 1,
        opacity: 1,
        rotationY: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: index * 0.2,
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Animación de las habilidades
  gsap.utils.toArray('.skill-tag').forEach((skill: any, index: number) => {
    gsap.fromTo(skill,
      {
        x: -50,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        delay: index * 0.1,
        scrollTrigger: {
          trigger: skill,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Animación del chatbot
  gsap.from('.chatbot-fab', {
    duration: 1,
    scale: 0,
    rotation: 180,
    ease: "back.out(1.7)",
    delay: 2
  });

  // Animación de entrada del chat
  gsap.from('.chatbot-window', {
    duration: 0.5,
    scale: 0.8,
    opacity: 0,
    ease: "back.out(1.7)"
  });

  // Animación de las partículas de destrucción
  gsap.utils.toArray('.particle').forEach((particle: any) => {
    gsap.to(particle, {
      x: gsap.utils.random(-200, 200),
      y: gsap.utils.random(-200, 200),
      rotation: gsap.utils.random(-360, 360),
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      delay: gsap.utils.random(0, 0.5)
    });
  });
};

// Función para animar elementos al hacer hover
export const animateHover = (element: HTMLElement) => {
  gsap.to(element, {
    scale: 1.05,
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

// Función para animar el scroll suave
export const smoothScrollTo = (target: string) => {
  gsap.to(window, {
    duration: 1.5,
    scrollTo: target,
    ease: "power2.inOut"
  });
}; 