'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    // Global handler to surface unhandled promise rejections with more detail
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      try {
        const reason = event?.reason;
        console.error('UNHANDLED_PROMISE_REJECTION', reason, reason && (reason.stack || null));
      } catch (err) {
        console.error('UNHANDLED_PROMISE_REJECTION: failed to serialize reason', err);
      }
    };

    // Capture uncaught exceptions as well
    const handleWindowError = (event: ErrorEvent) => {
      try {
        console.error('UNCAUGHT_ERROR', event.message, event.filename, event.lineno, event.colno, event.error && event.error.stack);
      } catch (err) {
        console.error('UNCAUGHT_ERROR: failed to serialize', err);
      }
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection as EventListener);
    window.addEventListener('error', handleWindowError as EventListener);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for premium Apple/Linear feel
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    // Store in global window for GSAP ScrollTrigger to sync
    (window as any).lenis = lenis;

    return () => {
      lenis.destroy();
      cancelAnimationFrame(animationFrameId);
      (window as any).lenis = undefined;
      window.removeEventListener('unhandledrejection', handleUnhandledRejection as EventListener);
      window.removeEventListener('error', handleWindowError as EventListener);
    };
  }, []);

  return <>{children}</>;
}
