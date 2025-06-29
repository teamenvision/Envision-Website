"use client";
import { useEffect, useState } from "react";

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button only after scrolling 300px
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const smoothScrollToTop = () => {
    const scrollElement = window.document.scrollingElement || document.documentElement;
    const start = scrollElement.scrollTop;
    const duration = 500;
    let startTime: number | null = null;

    const animateScroll = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        scrollElement.scrollTop = start * (1 - easeInOutQuad(progress));
        if (progress < 1) requestAnimationFrame(animateScroll);
    };

    const easeInOutQuad = (t: number) =>
        t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    requestAnimationFrame(animateScroll);
  };



  return isVisible ? (
    <button className="scroll-to-top" onClick={smoothScrollToTop}>
      ↑
    </button>
  ) : null;
};
