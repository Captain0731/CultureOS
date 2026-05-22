'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import './Navbar.scss';

const engageLinks = [
  'Performance Culture Quadrant',
  'Retention insights',
  'DEI survey',
  'Ready-to-use surveys',
  'AI comment summaries',
  'Proven action plans',
  'Pulse surveys',
  'Onboarding/offboarding survey',
  'Benchmarking',
];

const scienceColumns = [
  {
    title: 'People Science',
    desc: 'Pinpoint and resolve your organization\'s culture challenges with expert guidance and proven organizational strategy',
    linkText: 'Understand our approach',
    href: '#people-science',
    icon: 'people',
  },
  {
    title: 'Research',
    desc: 'Learn industry trends and evidence-based best practices powered by the world\'s largest collection of employee insights',
    linkText: 'Explore our research',
    href: '#research',
    icon: 'research',
  },
  {
    title: 'Benchmarks',
    desc: 'Explore how companies are creating world-class employee experiences across demographics, industries and more',
    linkText: 'See all benchmarks',
    href: '#benchmarks',
    icon: 'benchmarks',
  },
  {
    title: 'ROI Calculator',
    desc: 'Building the business case for culture starts with quantifying its value',
    linkText: 'Try our calculator',
    href: '#roi-calculator',
    icon: 'roi',
  },
] as const;

function ScienceCardIcon({ type }: { type: string }) {
  switch (type) {
    case 'research':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        </svg>
      );
    case 'benchmarks':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18" />
          <path d="M7 16l4-6 4 3 5-8" />
        </svg>
      );
    case 'roi':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M8 6h8M8 10h8M8 14h5" />
        </svg>
      );
    default:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      );
  }
}

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'engage' | null>('engage');
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
                      className="megaDropdown nestedDropdown"
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 12, scale: 0.96 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="dropdownInner splitLayout">
                        <div className="dropdownCategories">
                          <p className="categoriesLabel">Engage products</p>
                          <div 
                            className={`categoryItem ${activeSubTab === 'engage' ? 'active' : ''}`}
                            onMouseEnter={() => setActiveSubTab('engage')}
                          >
                            <span className="categoryIcon">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 00-3-3.87" />
                                <path d="M16 3.13a4 4 0 010 7.75" />
                              </svg>
                            </span>
                            <div className="categoryMeta">
                              <span className="categoryName">Engage</span>
                              <span className="categorySub">Employee Surveys</span>
                            </div>
                            <svg className="arrowRight" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                          <a href="#platform" className="categoriesExplore">
                            View all platform features
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </a>
                        </div>

                        <div className="dropdownSubContent">
                          <AnimatePresence mode="wait">
                            {activeSubTab === 'engage' && (
                              <motion.div
                                key="engage"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="subHeader">
                                  <a href="#understand-your-employees" className="subDescLink">
                                    <p className="subDesc">
                                      Understand your employees and focus your action plans
                                      <svg className="descArrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                    </p>
                                  </a>
                                </div>
                                <ul className="dropdownLinks">
                                  {engageLinks.map((link, i) => (
                                    <motion.li 
                                      key={link}
                                      initial={{ opacity: 0, y: 4 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: 0.02 * i, duration: 0.2 }}
                                    >
                                      <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}>
                                        <span className="linkDot" />
                                        {link}
                                      </a>
                                    </motion.li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
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
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 12, scale: 0.96 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="scienceGrid">
                        <motion.div
                          className="scienceIntro"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: 0.03 }}
                        >
                          <span className="scienceIntroBadge">Research & insights</span>
                          <h3 className="scienceIntroTitle">Science</h3>
                          <p className="scienceIntroDesc">
                            Unlock performance at scale with deep HR knowledge, organizational psychology, and advanced research.
                          </p>
                          <a href="#science" className="scienceIntroLink">
                            Explore the science hub
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </a>
                        </motion.div>

                        <div className="scienceDivider" aria-hidden />

                        <div className="scienceCards">
                          {scienceColumns.map((item, idx) => (
                            <motion.a
                              key={item.title}
                              href={item.href}
                              className={`scienceItem ${idx === 0 ? 'active' : ''}`}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.04 + idx * 0.04, duration: 0.25 }}
                            >
                              <span className="scienceIcon" aria-hidden>
                                <ScienceCardIcon type={item.icon} />
                              </span>
                              <div className="scienceItemBody">
                                <span className="scienceItemTitle">{item.title}</span>
                                <p className="scienceItemDesc">{item.desc}</p>
                                <span className="scienceColLink">
                                  {item.linkText}
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                  </svg>
                                </span>
                              </div>
                            </motion.a>
                          ))}
                        </div>

                        <div className="scienceFooter">
                          <div className="scienceFooterText">
                            <strong>Ready to get started?</strong>
                            <span>Take the first step towards hassle-free culture insights today.</span>
                          </div>
                          <a href="#get-started" className="scienceFooterCta">
                            Get free access
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </a>
                        </div>
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
                                  {engageLinks.map((link) => (
                                    <li key={link}>
                                      <a
                                        href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                                        onClick={closeMobileMenu}
                                      >
                                        {link}
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
