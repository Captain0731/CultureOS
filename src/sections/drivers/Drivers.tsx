'use client';

import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Drivers.scss';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Drivers() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle through the 4 states every 4 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 4);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    // Reveal entrance animation for dial console layout
    gsap.fromTo(
      '.driversConsoleLayout',
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.driversConsoleLayout',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Self-drawing handwriting ink underline
    gsap.fromTo(
      '.underlinePath',
      { strokeDasharray: 200, strokeDashoffset: 200 },
      {
        strokeDashoffset: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.engagementSection',
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  // Return dynamic text data for active slide
  const systemData = [
    {
      badge: '01 / INSIGHTS',
      statusText: 'SYSTEM: OPTIMIZING PEOPLE INSIGHTS',
      title: 'Uncover critical people insights',
      description: 'Deeply understand how all employees and leaders are feeling with proactive pulse polls and anonymous feedback channels you can trust.',
      themeClass: 'themePurple',
    },
    {
      badge: '02 / PRODUCTIVITY',
      statusText: 'SYSTEM: SYNCING WORKFLOW VECTOR',
      title: 'Increase productivity and performance',
      description: 'Find out what motivates your top-performing teams, automate sprint tasks checklist completions, and scale progress across execution paths.',
      themeClass: 'themeGreen',
    },
    {
      badge: '03 / RETENTION',
      statusText: 'SYSTEM: SCANNING ATTRITION RADAR',
      title: 'Prevent regrettable attrition early',
      description: 'Run proactive culture scan loops to identify flight risk indicators early, ensuring key retention metrics remain in stable configurations.',
      themeClass: 'themeOrange',
    },
    {
      badge: '04 / INCLUSION',
      statusText: 'SYSTEM: ENGAGING INCLUSION MATRIX',
      title: 'Embed DEI and help employees thrive',
      description: 'Map diverse connection points, support organic workspace groups, and track multi-dimensional growth paths for every team member.',
      themeClass: 'themeBlue',
    },
  ];

  const currentSystem = systemData[activeIndex];

  const handlePadInteraction = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="engagementSection">
      <div className="container">
        
        {/* Section Header */}
        <div className="engagementHeader">
          <h2 className="engagementTitle">
            Foster a{' '}
            <span className="highlightEngaged">
              highly engaged
              <svg className="underlineSVG" viewBox="0 0 200 9">
                <path
                  d="M 2 7 C 40 3.5, 120 1, 198 4.5"
                  stroke="#111111"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  className="underlinePath"
                />
              </svg>
            </span>
            , committed, and productive workforce
          </h2>
          <p className="engagementSubtitle">
            Interact with the Culture Core Dial to toggle between system-defining organizational optimization drivers.
          </p>
        </div>

        {/* Console Container */}
        <div 
          className="driversConsoleLayout"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* Left Column - Rotating Dial Console */}
          <div className="dialConsoleWrapper">
            <div className="dialBackgroundGrid" />
            
            {/* The main spinning wheel */}
            <div 
              className="dialOuterRing" 
              style={{ transform: `rotate(${-activeIndex * 90}deg)` }}
            >
              {/* Orbital Pad 0 (Top) */}
              <div 
                className={`orbitalPad padPurple ${activeIndex === 0 ? 'active' : ''}`}
                style={{ top: '0%', left: '50%', transform: `translate(-50%, -50%) rotate(${activeIndex * 90}deg)` }}
                onMouseEnter={() => handlePadInteraction(0)}
                onClick={() => handlePadInteraction(0)}
              >
                <span className="padNum">01</span>
                <svg className="padIcon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>

              {/* Orbital Pad 1 (Right) */}
              <div 
                className={`orbitalPad padGreen ${activeIndex === 1 ? 'active' : ''}`}
                style={{ top: '50%', left: '100%', transform: `translate(-50%, -50%) rotate(${activeIndex * 90}deg)` }}
                onMouseEnter={() => handlePadInteraction(1)}
                onClick={() => handlePadInteraction(1)}
              >
                <span className="padNum">02</span>
                <svg className="padIcon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
              </div>

              {/* Orbital Pad 2 (Bottom) */}
              <div 
                className={`orbitalPad padOrange ${activeIndex === 2 ? 'active' : ''}`}
                style={{ top: '100%', left: '50%', transform: `translate(-50%, -50%) rotate(${activeIndex * 90}deg)` }}
                onMouseEnter={() => handlePadInteraction(2)}
                onClick={() => handlePadInteraction(2)}
              >
                <span className="padNum">03</span>
                <svg className="padIcon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                </svg>
              </div>

              {/* Orbital Pad 3 (Left) */}
              <div 
                className={`orbitalPad padBlue ${activeIndex === 3 ? 'active' : ''}`}
                style={{ top: '50%', left: '0%', transform: `translate(-50%, -50%) rotate(${activeIndex * 90}deg)` }}
                onMouseEnter={() => handlePadInteraction(3)}
                onClick={() => handlePadInteraction(3)}
              >
                <span className="padNum">04</span>
                <svg className="padIcon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="4"></circle>
                </svg>
              </div>
            </div>

            {/* Central Dial Core */}
            <div 
              className={`dialCentralCore ${isPaused ? 'paused' : 'playing'}`}
              onClick={() => setIsPaused(!isPaused)}
              title={isPaused ? "Resume Autoplay" : "Pause Autoplay"}
            >
              <div className="pulseCoreCircle" />
              <div className="coreContent">
                <div className="coreLogoText">C-OS</div>
                <div className="playPauseBtn">
                  {isPaused ? (
                    <svg className="playIcon" width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  ) : (
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16"></rect>
                      <rect x="14" y="4" width="4" height="16"></rect>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Terminal Glass Display Screen */}
          <div className={`terminalDisplayScreen ${currentSystem.themeClass}`}>
            
            {/* Screen border styling decor */}
            <div className="screenCorner cornerTL" />
            <div className="screenCorner cornerTR" />
            <div className="screenCorner cornerBL" />
            <div className="screenCorner cornerBR" />
            <div className="screenScanlines" />

            {/* Screen Header */}
            <div className="screenHeader">
              <span className="systemStatusPill">{currentSystem.statusText}</span>
              <span className="liveIndicator"><span className="liveDot" /> LIVE FEED</span>
            </div>

            {/* Screen Content Wrapper */}
            <div className="screenMainGrid">
              
              {/* Text Pillar Description */}
              <div className="screenTextCol">
                <div className="systemBadge">{currentSystem.badge}</div>
                <h3 className="systemTitle">{currentSystem.title}</h3>
                <p className="systemDescription">{currentSystem.description}</p>
              </div>

              {/* Visual Live Widget Display */}
              <div className="screenWidgetCol">
                
                {/* Widget 0: Poll Widget */}
                {activeIndex === 0 && (
                  <div className="terminalWidget pollWidget">
                    <div className="pollHeader">
                      <span className="pollQuestion">How motivated do you feel this week?</span>
                    </div>
                    <div className="pollOptions">
                      <div className="pollOptionRow optThrive">
                        <div className="optionLabel">
                          <span>Highly Motivated</span>
                          <span className="percentText">78%</span>
                        </div>
                        <div className="optionBarOuter">
                          <div className="optionBarInner" style={{ width: '78%' }} />
                        </div>
                      </div>
                      <div className="pollOptionRow optSteady">
                        <div className="optionLabel">
                          <span>Steady / Focused</span>
                          <span className="percentText">18%</span>
                        </div>
                        <div className="optionBarOuter">
                          <div className="optionBarInner" style={{ width: '18%' }} />
                        </div>
                      </div>
                      <div className="pollOptionRow optTired">
                        <div className="optionLabel">
                          <span>Seeking Support</span>
                          <span className="percentText">4%</span>
                        </div>
                        <div className="optionBarOuter">
                          <div className="optionBarInner" style={{ width: '4%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Widget 1: Progress Tracker */}
                {activeIndex === 1 && (
                  <div className="terminalWidget progressWidget">
                    <div className="taskSummary">
                      <span className="taskTitle">Sprint Checklist</span>
                      <span className="statusPill">SYNCED</span>
                    </div>
                    
                    <div className="taskDetailsRow">
                      <div className="tasksList">
                        <div className="taskItem done">
                          <span className="checkbox">✓</span>
                          <span className="itemText">Release core API v2</span>
                        </div>
                        <div className="taskItem done">
                          <span className="checkbox">✓</span>
                          <span className="itemText">Sync slack reports</span>
                        </div>
                        <div className="taskItem pending">
                          <span className="checkbox" />
                          <span className="itemText">Launch onboarding</span>
                        </div>
                      </div>

                      <div className="progressCircleWrapper">
                        <svg width="76" height="76" viewBox="0 0 36 36" className="circularChart">
                          <path className="circleBg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                          <path className="circleProgress" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#22c55e" strokeWidth="3.5" strokeDasharray="66, 100" />
                        </svg>
                        <div className="percentageLabel">66%</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Widget 2: Attrition Radar */}
                {activeIndex === 2 && (
                  <div className="terminalWidget attritionWidget">
                    <div className="radarHeader">
                      <span className="radarTitle">Retention Risk Level</span>
                      <span className="riskPill">STABLE</span>
                    </div>

                    <div className="radarScannerWrapper">
                      <div className="radarGrid">
                        <div className="scannerLine" />
                        <div className="riskMarker" />
                      </div>
                      
                      <div className="needleGauge">
                        <svg viewBox="0 0 100 50" className="gaugeSVG">
                          <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" strokeLinecap="round" />
                          <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="url(#orangeGradient)" strokeWidth="8" strokeLinecap="round" strokeDasharray="80, 120" />
                          <defs>
                            <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#ef4444" />
                              <stop offset="50%" stopColor="#f97316" />
                              <stop offset="100%" stopColor="#22c55e" />
                            </linearGradient>
                          </defs>
                          <circle cx="50" cy="50" r="6" fill="#f97316" />
                          <line x1="50" y1="50" x2="18" y2="18" stroke="#f97316" strokeWidth="3" className="gaugeNeedle" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {/* Widget 3: Network Matrix */}
                {activeIndex === 3 && (
                  <div className="terminalWidget networkWidget">
                    <div className="networkMap">
                      <svg width="100%" height="100%" viewBox="0 0 280 130" className="networkSVG">
                        <line x1="140" y1="65" x2="50" y2="35" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" className="link1" />
                        <line x1="140" y1="65" x2="230" y2="35" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" className="link2" />
                        <line x1="140" y1="65" x2="140" y2="105" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" className="link3" />
                        
                        <circle cx="140" cy="65" r="16" fill="#3b82f6" className="centralNode" />
                        <text x="140" y="69" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">YOU</text>
                        
                        <g className="outerNode nodeGroup1">
                          <circle cx="50" cy="35" r="20" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="1.5" />
                          <text x="50" y="39" textAnchor="middle" fill="#93c5fd" fontSize="8" fontWeight="bold">DEI</text>
                        </g>
                        
                        <g className="outerNode nodeGroup2">
                          <circle cx="230" cy="35" r="24" fill="rgba(59, 130, 246, 0.15)" stroke="#60a5fa" strokeWidth="1.5" />
                          <text x="230" y="39" textAnchor="middle" fill="#93c5fd" fontSize="8" fontWeight="bold">Wellness</text>
                        </g>
                        
                        <g className="outerNode nodeGroup3">
                          <circle cx="140" cy="105" r="20" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="1.5" />
                          <text x="140" y="109" textAnchor="middle" fill="#93c5fd" fontSize="8" fontWeight="bold">Growth</text>
                        </g>
                      </svg>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
