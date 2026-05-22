'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CalendarCard from '@/components/ui/CalendarCard/CalendarCard';
import { TaskCard, BoardCard, ProgressCard } from '@/components/ui/MarqueeCards/MarqueeCards';
import Insight from '@/sections/insight/Insight';
import Team from '@/sections/team/Team';
import FAQ from '@/sections/faq/FAQ';
import Footer from '@/sections/footer/Footer';
import './Home.scss';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const marqueeItems = [
  { id: 'cal', Card: CalendarCard, label: 'Manage' },
  { id: 'task', Card: TaskCard, label: 'Organize' },
  { id: 'board', Card: BoardCard, label: 'Execute' },
  { id: 'progress', Card: ProgressCard, label: 'Track' },
] as const;

const easeOut = [0.16, 1, 0.3, 1] as const;

function scrollToSelector(selector: string) {
  const el = document.querySelector(selector);
  if (!el) return;
  const lenis = (window as Window & { lenis?: { scrollTo: (t: Element, o?: { offset?: number }) => void } }).lenis;
  if (lenis) {
    lenis.scrollTo(el as Element, { offset: -88 });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function HomeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia(`(max-width: 768px)`).matches;
    if (prefersReducedMotion || isMobile) return;

    const proxy = { skew: 0 };
    const skewSetter = gsap.quickSetter(marqueeRef.current, 'skewY', 'deg');
    const clamp = gsap.utils.clamp(-15, 15);

    const trigger = ScrollTrigger.create({
      onUpdate: (self) => {
        const skew = clamp(self.getVelocity() / -300);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: 'power3',
            overwrite: 'auto',
            onUpdate: () => skewSetter(proxy.skew),
          });
        }
      },
    });

    gsap.set(marqueeRef.current, { transformOrigin: 'center top', force3D: true });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div className="homeContainer" ref={containerRef}>
      <div className="gridBg" aria-hidden />

      <section className="heroSection">
        <div className="container">
          <div className="heroContent">
            <motion.div
              className="badge"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOut, delay: 0.1 }}
            >
              <span className="badgePulse" />
              <span>Culture OS 2.0 is now live</span>
            </motion.div>

            <h1 className="headline">
              <motion.span
                className="headlineLine"
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: easeOut, delay: 0.2 }}
              >
                Take Control Of Your
              </motion.span>

              <motion.div
                className="headlineRow"
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: easeOut, delay: 0.3 }}
              >
                <span className="boldText">Tasks</span>

                <div className="inlineMarquee" ref={marqueeRef} aria-label="Product preview cards">
                  <div className="marqueeTrack marqueeTrack--desktop">
                    {[...marqueeItems, ...marqueeItems].map((item, index) => (
                      <div className="marqueeItem" key={`${item.id}-${index}`}>
                        <item.Card />
                        <span className="fadedText">{item.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="heroCardsScroll">
                    <div className="heroCardsTrack">
                      {[...marqueeItems, ...marqueeItems].map((item, index) => (
                        <div className="heroCardSlide" key={`${item.id}-mobile-${index}`}>
                          <item.Card />
                          <span className="heroCardLabel">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </h1>

            <motion.p
              className="subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeOut, delay: 0.4 }}
            >
              A minimal futuristic workspace designed for high-performance teams.
              Consolidate tasks, docs, and sprints into one unified, elegant, and ultra-fast interface.
            </motion.p>

            <motion.div
              className="ctaGroup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeOut, delay: 0.5 }}
            >
              <button
                type="button"
                className="primaryCta"
                onClick={() => scrollToSelector('.footerCta')}
              >
                Get Started Free
              </button>
              <button
                type="button"
                className="secondaryCta"
                onClick={() => scrollToSelector('#insight')}
              >
                <span>Watch Product Demo</span>
                <span className="playIcon">
                  <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1 1.5L7 5L1 8.5V1.5Z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <Insight />
      <FAQ />
      <Team />
      <Footer />
    </div>
  );
}
