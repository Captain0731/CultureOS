'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import './Navbar.scss';

const platformColumns = [
  {
    title: 'Engage',
    desc: 'Understand your employees and focus your action plans with surveys, pulse checks, and employee listening tools.',
    linkText: 'Explore engage',
    href: '#engage',
  },
  {
    title: 'Surveys',
    desc: 'Ready-to-use surveys, DEI survey, pulse surveys, and onboarding/offboarding surveys built for modern teams.',
    linkText: 'Browse surveys',
    href: '#surveys',
  },
  {
    title: 'Insights',
    desc: 'Performance Culture Quadrant, retention insights, AI comment summaries, and benchmarking to guide decisions.',
    linkText: 'View insights',
    href: '#insights',
  },
  {
    title: 'Action Plans',
    desc: 'Proven action plans and recommendations that turn employee feedback into measurable culture improvements.',
    linkText: 'See action plans',
    href: '#action-plans',
  },
] as const;

const scienceColumns = [
  {
    title: 'People Science',
    desc: 'Pinpoint and resolve your organization\'s culture challenges with expert guidance and proven organizational strategy',
    linkText: 'Understand our approach',
    href: '#people-science',
  },
  {
    title: 'Research',
    desc: 'Learn industry trends and evidence-based best practices powered by the world\'s largest collection of employee insights',
    linkText: 'Explore our research',
    href: '#research',
  },
  {
    title: 'Benchmarks',
    desc: 'Explore how companies are creating world-class employee experiences across demographics, industries and more',
    linkText: 'See all benchmarks',
    href: '#benchmarks',
  },
  {
    title: 'ROI Calculator',
    desc: 'Building the business case for culture starts with quantifying its value',
    linkText: 'Try our calculator',
    href: '#roi-calculator',
  },
] as const;

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const platformRef = useRef<HTMLDivElement>(null);
  const scienceRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    setIsScrolled(y > 50);
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        platformRef.current && !platformRef.current.contains(e.target as Node) &&
        scienceRef.current && !scienceRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileExpanded(null);
  };

  const toggleMobileSection = (key: string) => {
    setMobileExpanded((prev) => (prev === key ? null : key));
  };

  const navItems = [
    { label: 'Home', href: '#', dropdown: null },
    { label: 'Platform', href: '#platform', dropdown: 'platform' },
    { label: 'Science', href: '#science', dropdown: 'science' },
    { label: 'About Us', href: '#about', dropdown: null },
    { label: 'Contact', href: '#contact', dropdown: null },
  ];

  const getRef = (dropdown: string | null) => {
    if (dropdown === 'platform') return platformRef;
    if (dropdown === 'science') return scienceRef;
    return undefined;
  };

  return (
    <motion.header 
      className={`navbarHeader ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0, x: "-50%" }}
      animate={{ y: 0, opacity: 1, x: "-50%" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="navbarContainer">
        {/* Logo */}
        <a href="#" className="navbarLogo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="currentColor"/>
          </svg>
          <span className="logoText">Culture</span>
          <span className="navbarLogoDot">OS</span>
        </a>

        {/* Navigation Links */}
        <nav className="navbarNav">
          {navItems.map((item, index) => (
            <div
              key={item.label}
              className="navItemWrap"
              ref={getRef(item.dropdown)}
              onMouseEnter={() => {
                setHoveredIndex(index);
                if (item.dropdown) setOpenDropdown(item.dropdown);
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                if (item.dropdown) setOpenDropdown(null);
              }}
            >
              <motion.a 
                href={item.href}
                className={`navbarNavLink ${item.dropdown && openDropdown === item.dropdown ? 'active' : ''}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.08, duration: 0.5 }}
                onClick={(e) => {
                  if (item.dropdown) {
                    e.preventDefault();
                    setOpenDropdown(openDropdown === item.dropdown ? null : item.dropdown);
                  }
                }}
              >
                <span className="linkText">{item.label}</span>
                {item.dropdown && (
                  <motion.svg
                    className="chevron"
                    width="10" height="6" viewBox="0 0 10 6" fill="none"
                    animate={{ rotate: openDropdown === item.dropdown ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </motion.svg>
                )}
                {hoveredIndex === index && (
                  <motion.span 
                    className="navbarActiveIndicator"
                    layoutId="navActive"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </motion.a>

              {/* ── Platform Dropdown ── */}
              {item.dropdown === 'platform' && (
                <AnimatePresence>
                  {openDropdown === 'platform' && (
                    <motion.div
                      className="megaDropdown scienceDropdown"
                      initial={{ opacity: 0, y: 12, scale: 0.96, x: '-50%' }}
                      animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
                      exit={{ opacity: 0, y: 12, scale: 0.96, x: '-50%' }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="scienceGrid">
                        <motion.div
                          className="scienceIntro"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: 0.03 }}
                        >
                          <h3 className="scienceIntroTitle">Platform</h3>
                          <p className="scienceIntroDesc">
                            Everything you need to listen to employees, understand your culture, and take action at scale.
                          </p>
                        </motion.div>

                        {platformColumns.map((col, idx) => (
                          <React.Fragment key={col.title}>
                            <div className="scienceColDivider" aria-hidden />
                            <motion.a
                              href={col.href}
                              className="scienceCol"
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.04 + idx * 0.04, duration: 0.25 }}
                            >
                              <span className="scienceColTitle">
                                {col.title}
                                <span className="scienceColArrow" aria-hidden>→</span>
                              </span>
                              <p className="scienceColDesc">{col.desc}</p>
                              <span className="scienceColLink">{col.linkText}</span>
                            </motion.a>
                          </React.Fragment>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}

              {/* ── Science Dropdown ── */}
              {item.dropdown === 'science' && (
                <AnimatePresence>
                  {openDropdown === 'science' && (
                    <motion.div
                      className="megaDropdown scienceDropdown"
                      initial={{ opacity: 0, y: 12, scale: 0.96, x: '-50%' }}
                      animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
                      exit={{ opacity: 0, y: 12, scale: 0.96, x: '-50%' }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="scienceGrid">
                        <motion.div
                          className="scienceIntro"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: 0.03 }}
                        >
                          <h3 className="scienceIntroTitle">Science</h3>
                          <p className="scienceIntroDesc">
                            Unlock performance at scale with deep HR knowledge, organizational psychology, and advanced research.
                          </p>
                        </motion.div>

                        {scienceColumns.map((col, idx) => (
                          <React.Fragment key={col.title}>
                            <div className="scienceColDivider" aria-hidden />
                            <motion.a
                              href={col.href}
                              className="scienceCol"
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.04 + idx * 0.04, duration: 0.25 }}
                            >
                              <span className="scienceColTitle">
                                {col.title}
                                <span className="scienceColArrow" aria-hidden>→</span>
                              </span>
                              <p className="scienceColDesc">{col.desc}</p>
                              <span className="scienceColLink">{col.linkText}</span>
                            </motion.a>
                          </React.Fragment>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        {/* Actions */}
        <motion.div 
          className="navbarActions"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <a href="#login" className="navbarLoginBtn">Sign In</a>
          <motion.a 
            href="#get-started" 
            className="navbarCtaBtn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="navbarCtaText">Book a Demo</span>
            <svg 
              width="14" height="14" viewBox="0 0 12 12" fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="navbarArrowIcon"
            >
              <path d="M3.5 1.5L8 6L3.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </motion.div>

        <button
          type="button"
          className={`navbarMenuBtn ${mobileMenuOpen ? 'open' : ''}`}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.button
              type="button"
              className="navbarMobileBackdrop"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />
            <motion.div
              className="navbarMobilePanel"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <nav className="navbarMobileNav" aria-label="Mobile navigation">
                {navItems.map((item) => (
                  <div key={item.label} className="navbarMobileItem">
                    {item.dropdown ? (
                      <>
                        <button
                          type="button"
                          className={`navbarMobileLink ${mobileExpanded === item.dropdown ? 'expanded' : ''}`}
                          onClick={() => toggleMobileSection(item.dropdown!)}
                        >
                          <span>{item.label}</span>
                          <svg
                            className="mobileChevron"
                            width="10"
                            height="6"
                            viewBox="0 0 10 6"
                            fill="none"
                            aria-hidden
                          >
                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        <AnimatePresence>
                          {mobileExpanded === item.dropdown && (
                            <motion.div
                              className="navbarMobileSub"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {item.dropdown === 'platform' && (
                                <ul className="navbarMobileSubList">
                                  {platformColumns.map((col) => (
                                    <li key={col.title}>
                                      <a href={col.href} onClick={closeMobileMenu}>
                                        <strong>{col.title}</strong>
                                        <span>{col.linkText}</span>
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              )}
                              {item.dropdown === 'science' && (
                                <ul className="navbarMobileSubList">
                                  {scienceColumns.map((col) => (
                                    <li key={col.title}>
                                      <a href={col.href} onClick={closeMobileMenu}>
                                        <strong>{col.title}</strong>
                                        <span>{col.linkText}</span>
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <a href={item.href} className="navbarMobileLink" onClick={closeMobileMenu}>
                        {item.label}
                      </a>
                    )}
                  </div>
                ))}
              </nav>

              <div className="navbarMobileActions">
                <a href="#login" className="navbarMobileSignIn" onClick={closeMobileMenu}>
                  Sign In
                </a>
                <a href="#get-started" className="navbarMobileCta" onClick={closeMobileMenu}>
                  Book a Demo
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
