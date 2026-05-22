'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import './FAQ.scss';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const faqData = [
  {
    question: 'Scalable, secure and interoperable',
    answer: {
      title: 'Built for enterprises that demand reliability',
      description:
        'Culture OS is architected on a modern, cloud-native stack that scales effortlessly with your organization. Every data point is encrypted at rest and in transit, meeting SOC 2 Type II and GDPR compliance standards.',
      bullets: [
        'Auto-scaling infrastructure for 10,000+ concurrent users',
        'SSO/SAML integration with all major identity providers',
        'Open REST & GraphQL APIs for seamless connectivity',
        'Role-based access control with granular permission models',
      ],
      image: '/secure-infrastructure.png',
      imageBg: 'purple',
      badge: {
        number: 'SOC 2',
        label: 'SECURE',
      },
    },
  },
  {
    question: 'Service and support to get you up and running fast',
    answer: {
      title: 'Service and support to get you up and running fast',
      description:
        "Our support plans give you the highest level of quality and assurance. We're proud of our industry-leading support and swift implementation offering:",
      bullets: [
        '40% faster implementation for Enterprise Performance Management (G2)',
        '24/5 dedicated product support',
        'Support center resources and developer documentation',
      ],
      image: '/support-person.png',
      imageBg: 'orange',
      badge: {
        number: '24/5',
        label: 'SUPPORT',
      },
    },
  },
  {
    question: 'We work hard to keep your data safe',
    answer: {
      title: 'Enterprise-grade security at every layer',
      description:
        'We take data protection seriously. Our platform undergoes regular third-party penetration testing and maintains strict compliance certifications across global regulatory frameworks.',
      bullets: [
        'End-to-end AES-256 encryption for all stored data',
        'SOC 2 Type II and ISO 27001 certified infrastructure',
        'GDPR, CCPA, and HIPAA compliant data handling',
        'Automated threat detection and real-time anomaly monitoring',
      ],
      image: '/data-security.png',
      imageBg: 'blue',
      badge: {
        number: 'AES',
        label: '256-BIT',
      },
    },
  },
  {
    question: 'Access expert HR resources',
    answer: {
      title: 'A knowledge hub for modern HR leaders',
      description:
        'Get access to templates, best-practice guides, and research reports curated by seasoned HR professionals and organizational psychologists.',
      bullets: [
        'Monthly pulse survey templates and benchmarks',
        'On-demand webinars with industry thought leaders',
        'Curated playbooks for DEI, retention, and engagement',
        'Dedicated customer success manager for Pro plans',
      ],
      image: '/hr-resources.png',
      imageBg: 'green',
      badge: {
        number: '100+',
        label: 'RESOURCES',
      },
    },
  },
  {
    question: "Join the world's largest HR network and global community",
    answer: {
      title: 'Connect with 50,000+ HR professionals worldwide',
      description:
        'Collaborate, share insights, and grow alongside the largest community of culture-focused people leaders. From local meetups to global summits, your network starts here.',
      bullets: [
        'Exclusive Slack community with topic-focused channels',
        'Annual Culture OS Summit with live workshops',
        'Peer benchmarking across industries and regions',
        'Early access to beta features and product roadmap input',
      ],
      image: '/hr-network.png',
      imageBg: 'pink',
      badge: {
        number: '50K+',
        label: 'MEMBERS',
      },
    },
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(1200);

  // Sync window width for responsive 3D translation calculations
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Auto-cycle through the FAQ cards every 4 seconds when not hovered/dragged
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % faqData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header reveal
      gsap.fromTo(
        '.faqHeader',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.faqSection',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Deck container reveal
      gsap.fromTo(
        '.faqDeckContainer',
        { opacity: 0, y: 50, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '#faq',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 55;
    if (info.offset.x < -swipeThreshold) {
      // Swipe left -> next card
      setActiveIndex((prev) => (prev + 1) % faqData.length);
    } else if (info.offset.x > swipeThreshold) {
      // Swipe right -> prev card
      setActiveIndex((prev) => (prev - 1 + faqData.length) % faqData.length);
    }
    // Resume auto-cycle after dragging
    setIsPaused(false);
  };

  // 3D positioning logic
  const getCardStyle = (index: number) => {
    let offset = index - activeIndex;

    // Support circular navigation math
    if (offset < -2) offset += faqData.length;
    if (offset > 2) offset -= faqData.length;

    const isActive = offset === 0;

    // Responsive calculations
    let xOffset = 340; // Desktop offset
    let rotateYVal = -24;
    let zVal = -120;

    if (windowWidth < 768) {
      xOffset = 180; // Mobile
      rotateYVal = -16;
      zVal = -90;
    } else if (windowWidth < 1024) {
      xOffset = 260; // Tablet
      rotateYVal = -20;
      zVal = -100;
    }

    const x = offset * xOffset;
    const rotateY = offset * rotateYVal;
    const scale = isActive ? 1 : 0.85;
    const zIndex = 10 - Math.abs(offset);
    const opacity = Math.abs(offset) > 1 ? 0 : Math.abs(offset) === 1 ? 0.55 : 1;

    return {
      x,
      scale,
      rotateY,
      opacity,
      zIndex,
      translateZ: isActive ? 0 : zVal,
      filter: isActive ? 'blur(0px)' : 'blur(2px)',
    };
  };

  return (
    <section className="faqSection" id="faq">
      <div className="container">
        {/* Section Header */}
        <div className="faqHeader">
          <span className="badge">FAQ</span>
          <h2 className="faqTitle">Everything you need to know.</h2>
          <p className="faqSubtitle">
            Common questions about Culture OS, answered by the team.
          </p>
        </div>

        {/* 3D Perspective Card Deck */}
        <div 
          className="faqDeckContainer"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="faqDeck3DStage">
            {faqData.map((item, index) => {
              const isActive = index === activeIndex;
              const animateStyle = getCardStyle(index);

              return (
                <motion.div
                  key={index}
                  className={`faqDeckCard ${isActive ? 'faqCardActive' : 'faqCardInactive'}`}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                  animate={animateStyle}
                  transition={{
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1] as const, // Custom premium easeOutExpo
                  }}
                  drag={isActive ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragStart={() => setIsPaused(true)}
                  onDragEnd={handleDragEnd}
                  onClick={() => {
                    if (!isActive) setActiveIndex(index);
                  }}
                >
                  {/* Decorative Radial glow background inside the card */}
                  <div className={`faqCardGlow bg-${item.answer.imageBg}`} />

                  {/* Card Content Layout */}
                  <div className="faqCardContent">
                    <div className="faqCardHeaderRow">
                      <span className="faqCardNum">0{index + 1}</span>
                      <span className={`faqCardBadge theme-${item.answer.imageBg}`}>
                        {item.answer.badge.label}
                      </span>
                    </div>

                    <div className="faqCardBody">
                      <h3 className="faqCardTitle">{item.answer.title}</h3>
                      <p className="faqCardDesc">{item.answer.description}</p>
                      
                      <ul className="faqCardBullets">
                        {item.answer.bullets.map((bullet, bIdx) => (
                          <li key={bIdx}>
                            <svg
                              className={`bulletIcon text-${item.answer.imageBg}`}
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="10"
                                cy="10"
                                r="10"
                                fill="currentColor"
                                fillOpacity="0.1"
                              />
                              <path
                                d="M6 10L9 13L14 7"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Footer Graphic Bubble */}
                    <div className="faqCardGraphicRow">
                      <div className="faqImageWrapper">
                        <div className={`faqImageCircle bg-${item.answer.imageBg}`}>
                          <Image
                            src={item.answer.image}
                            alt={item.answer.title}
                            width={220}
                            height={220}
                            className="faqPersonImage"
                            priority
                          />
                        </div>
                        <div className="faqSupportBadge">
                          <span className="badgeNumber">{item.answer.badge.number}</span>
                          <span className="badgeLabel">{item.answer.badge.label}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Controls (Dots & Arrows) */}
          <div className="faqDeckControls">
            <button
              className="deckNavBtn"
              onClick={() => setActiveIndex((prev) => (prev - 1 + faqData.length) % faqData.length)}
              aria-label="Previous card"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="deckPaginationDots">
              {faqData.map((_, index) => (
                <button
                  key={index}
                  className={`deckDot ${index === activeIndex ? 'deckDotActive' : ''}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to card ${index + 1}`}
                />
              ))}
            </div>

            <button
              className="deckNavBtn"
              onClick={() => setActiveIndex((prev) => (prev + 1) % faqData.length)}
              aria-label="Next card"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
