
import { useEffect } from 'react';

interface UseRevealAnimationProps {
  selector?: string;
  threshold?: number;
  rootMargin?: string;
}

export const useRevealAnimation = ({
  selector = '.reveal',
  threshold = 0.1,
  rootMargin = '0px'
}: UseRevealAnimationProps = {}) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold, rootMargin }
    );

    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, [selector, threshold, rootMargin]);
};

export default useRevealAnimation;
