import { useEffect } from 'react';

const NAVBAR_SELECTOR = '.navbar';
const HIDDEN_TOP_OFFSET = '-100px';

/**
 * Attaches scroll listener to show/hide navbar on scroll direction.
 * Navbar moves up when scrolling down, reappears when scrolling up.
 */
export function useScrollNav(): void {
  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const navbar = document.querySelector<HTMLElement>(NAVBAR_SELECTOR);
      if (navbar) {
        if (prevScrollPos > currentScrollPos) {
          navbar.style.top = '0';
        } else {
          navbar.style.top = HIDDEN_TOP_OFFSET;
        }
      }
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}
