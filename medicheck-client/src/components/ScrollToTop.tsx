import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when pathname changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Optional: adds smooth scrolling animation
    });
  }, [pathname]);

  // This component doesn't render anything
  return null;
};

export default ScrollToTop;

// Alternative version with instant scroll (no animation)
export const ScrollToTopInstant = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Alternative version with conditional scrolling (skip certain routes)
export const ScrollToTopConditional = ({ skipRoutes = [] }: { skipRoutes?: string[] }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Skip scrolling for certain routes
    if (!skipRoutes.includes(pathname)) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [pathname, skipRoutes]);

  return null;
};