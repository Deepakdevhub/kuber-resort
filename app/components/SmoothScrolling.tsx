'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScrolling() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5, // Higher number = Heavier/Smoother feel (Luxury standard is 1.5)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // The "Physics" math
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}