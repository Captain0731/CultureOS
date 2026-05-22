'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CalendarCard from '../../../components/CalendarCard';
import { TaskCard, BoardCard, ProgressCard } from '../../../components/MarqueeCards';
// import Drivers from '../Drivers/Drivers';
import Insight from '../Insight/Insight';
import Team from '../Team/Team';
import FAQ from '../FAQ/FAQ';
import Footer from '../Footer/Footer';
import './Home.scss';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. GSAP ScrollTrigger for Hero elements parallax / skew speed adjustment
    if (marqueeRef.current) {
      let proxy = { skew: 0 },
          skewSetter = gsap.quickSetter(marqueeRef.current, "skewY", "deg"),
          clamp = gsap.utils.clamp(-15, 15); // limit skew

      ScrollTrigger.create({
        onUpdate: (self) => {
          let skew = clamp(self.getVelocity() / -300);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.8,
              ease: "power3",
              overwrite: "auto",
              onUpdate: () => skewSetter(proxy.skew)
            });
          }
        }
      });
      // Set origin for skewing
      gsap.set(marqueeRef.current, { transformOrigin: "center top", force3D: true });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="homeContainer" ref={containerRef}>
      {/* Background radial soft light grid */}
      <div className="gridBg" />

      {/* Hero Section */}
      <section className="heroSection">
        <div className="container">
          <div className="heroContent">
            {/* Pill Badge */}
            <motion.div 
              className="badge"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 }}
            >
              <span className="badgePulse" />
              <span>Culture OS 2.0 is now live</span>
            </motion.div>

            {/* Main Typographic Headline */}
            <h1 className="headline">
              <motion.span 
                className="headlineLine"
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 }}
              >
                Take Control Of Your
              </motion.span>
              
              <motion.div 
                className="headlineRow"
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.3 }}
              >
                <span className="boldText">Tasks</span>
                
                {/* Infinite Scrolling Ticker (Image & Text together) */}
                <div className="inlineMarquee" ref={marqueeRef}>
                  <div className="marqueeTrack">
                    {/* Item Set 1 */}
                    <div className="marqueeItem">
                      <CalendarCard />
                      <span className="fadedText">Manage</span>
                    </div>
                    <div className="marqueeItem">
                      <TaskCard />
                      <span className="fadedText">Organize</span>
                    </div>
                    <div className="marqueeItem">
                      <BoardCard />
                      <span className="fadedText">Execute</span>
                    </div>
                    <div className="marqueeItem">
                      <ProgressCard />
                      <span className="fadedText">Track</span>
                    </div>

                    {/* Item Set 2 (Duplicated for seamless loop) */}
                    <div className="marqueeItem">
                      <CalendarCard />
                      <span className="fadedText">Manage</span>
                    </div>
                    <div className="marqueeItem">
                      <TaskCard />
                      <span className="fadedText">Organize</span>
                    </div>
                    <div className="marqueeItem">
                      <BoardCard />
                      <span className="fadedText">Execute</span>
                    </div>
                    <div className="marqueeItem">
                      <ProgressCard />
                      <span className="fadedText">Track</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </h1>

            {/* Subtitle */}
            <motion.p 
              className="subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.4 }}
            >
              A minimal futuristic workspace designed for high-performance teams. 
              Consolidate tasks, docs, and sprints into one unified, elegant, and ultra-fast interface.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="ctaGroup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.5 }}
            >
              <a href="#get-started" className="primaryCta">
                Get Started Free
              </a>
              <a href="#demo" className="secondaryCta">
                <span>Watch Product Demo</span>
                <span className="playIcon">
                  <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L7 5L1 8.5V1.5Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Foster a highly engaged, committed, and productive workforce Section */}
      {/* <Drivers /> */}

      {/* Real-time Workforce Insight Scroll Section */}
      <Insight />

      {/* FAQ Section */}
      <FAQ />

      {/* Team Leaders Section */}
      <Team />

      {/* Footer */}
      <Footer />
    </div>
  );
}
