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
];

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
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
                        {/* Intro */}
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

                        <div className="scienceDivider" />

                        {/* Two stacked columns of items (left/right) */}
                        <div className="scienceColumnsWrapper">
                          <div className="scienceCols">
                            <div className="scienceColItems">
                              {scienceColumns.slice(0, Math.ceil(scienceColumns.length / 2)).map((item, idx) => (
                                <motion.div
                                  key={item.title}
                                  className={`scienceItem ${idx === 0 ? 'active' : ''}`}
                                  initial={{ opacity: 0, y: 6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.05 + idx * 0.03 }}
                                  role="link"
                                  tabIndex={0}
                                  onClick={() => { window.location.href = item.href; }}
                                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { window.location.href = item.href; } }}
                                >
                                  <div className="scienceItemMeta">
                                    <span className="scienceIcon" aria-hidden>
                                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M7 10h10" stroke="currentColor" strokeWidth="1.5"/></svg>
                                    </span>
                                    <div>
                                      <div className="scienceItemTitle">{item.title}</div>
                                      <p className="scienceItemDesc">{item.desc}</p>
                                      <div className="scienceColLink">{item.linkText}</div>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>

                            <div className="scienceColItems">
                              {scienceColumns.slice(Math.ceil(scienceColumns.length / 2)).map((item, idx) => (
                                <motion.div
                                  key={item.title}
                                  className="scienceItem"
                                  initial={{ opacity: 0, y: 6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.05 + idx * 0.03 }}
                                  role="link"
                                  tabIndex={0}
                                  onClick={() => { window.location.href = item.href; }}
                                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { window.location.href = item.href; } }}
                                >
                                  <div className="scienceItemMeta">
                                    <span className="scienceIcon" aria-hidden>
                                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><path d="M9 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                                    </span>
                                    <div>
                                      <div className="scienceItemTitle">{item.title}</div>
                                      <p className="scienceItemDesc">{item.desc}</p>
                                      <div className="scienceColLink">{item.linkText}</div>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Footer CTA area */}
                        <div className="scienceFooter">
                          <div className="scienceFooterText">
                            <strong>Ready to get started?</strong>
                            <div>Take the first step towards hassle-free culture insights today.</div>
                          </div>
                          <a href="#get-started" className="scienceFooterCta">Get free access</a>
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
            <span>Book a Demo</span>
            <svg 
              width="14" height="14" viewBox="0 0 12 12" fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="navbarArrowIcon"
            >
              <path d="M3.5 1.5L8 6L3.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </motion.header>
  );
}
