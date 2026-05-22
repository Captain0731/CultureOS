'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Insight.scss';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    id: 'leaders',
    num: '01',
    label: 'LEADERS',
    color: 'purple',
    title: 'Proactive people strategy',
    desc: 'Launch employee surveys in minutes. Eliminate guesswork with AI analysis and recommendations.',
    widget: 'survey',
    align: 'left',
  },
  {
    id: 'managers',
    num: '02',
    label: 'MANAGERS',
    color: 'orange',
    title: 'Data-informed decisions',
    desc: 'AI recommendations empower you to unlock breakthrough team performance and productivity.',
    widget: 'actions',
    align: 'right',
  },
  {
    id: 'employees',
    num: '03',
    label: 'EMPLOYEES',
    color: 'green',
    title: 'Lead highly effective teams',
    desc: 'Drive meaningful performance while supporting wellbeing, growth, and team alignment.',
    widget: 'agenda',
    align: 'left',
  },
  {
    id: 'hr',
    num: '04',
    label: 'HR TEAMS',
    color: 'blue',
    title: 'Own development goals',
    desc: 'Map competencies, goals, and career progression plans directly to business outcomes.',
    widget: 'skills',
    align: 'right',
  },
];

export default function Insight() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animate the central glowing line as user scrolls
      gsap.to('.lineGlowFill', {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.timelineWrapper',
          start: 'top 50%',
          end: 'bottom 70%',
          scrub: true,
        },
      });

      // 2. Animate each node as the line reaches it
      const nodes = gsap.utils.toArray('.timelineNode');
      nodes.forEach((node: any) => {

        // The text block
        gsap.fromTo(
          node.querySelector('.nodeText'),
          { opacity: 0, y: 30, filter: 'blur(5px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out',
            scrollTrigger: {
              trigger: node,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // The widget block (slides in from left or right depending on alignment)
        const widget = node.querySelector('.nodeWidget');
        const isLeft = node.classList.contains('align-left');

        gsap.fromTo(
          widget,
          { opacity: 0, x: isLeft ? 50 : -50, scale: 0.95 },
          {
            opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: {
              trigger: node,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // The central dot pulse
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: node,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        });

        tl.fromTo(
          node.querySelector('.nodeDotInner'),
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)',
          }
        );

        if (node.querySelector('.wSkills')) {
          tl.from(node.querySelectorAll('.wTagCloudItem'), { opacity: 0, scale: 0.5, duration: 0.5, ease: 'back.out(1.5)', stagger: 0.05 }, 0.4)
            .from(node.querySelector('.wBarFill'), { width: '0%', duration: 1.2, ease: 'power3.out' }, 0.8);
        }

        // 3. Continuous Scrubbing Parallax for the glass cards
        gsap.to(node.querySelector('.widgetGlassCard'), {
          y: -120, // Moves up 120px slower than the scroll speed
          ease: 'none',
          scrollTrigger: {
            trigger: node,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5, // 1.5s smoothing on the scrub
          },
        });
      });

      // 4. Parallax Background Ambient Glow
      gsap.to('.timelineAmbientBg', {
        y: 400,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="insightTimelineSection" id="insight" ref={sectionRef}>
      {/* Physical background element for parallax */}
      <div className="timelineAmbientBg" />

      <div className="container">

        {/* Header */}
        <div className="timelineHeader">
          <h2 className="timelineTitle">
            Real-time workforce <span className="hl">insight</span>
          </h2>
          <p className="timelineDesc">
            Follow the flow of organizational intelligence across every level of your company.
          </p>
        </div>

        {/* Central Zig-Zag Timeline */}
        <div className="timelineWrapper">

          {/* Central Line */}
          <div className="timelineCenterLine">
            <div className="lineGlowFill" />
          </div>

          {/* Nodes */}
          {steps.map((step) => (
            <div key={step.id} className={`timelineNode align-${step.align}`}>

              {/* Central Connection Dot */}
              <div className="nodeDotWrapper">
                <div className={`nodeDotInner bg-${step.color}`} />
              </div>

              {/* Text Side */}
              <div className="nodeText">
                <span className={`nBadge text-${step.color}`}>{step.num} / {step.label}</span>
                <h3 className="nTitle">{step.title}</h3>
                <p className="nDesc">{step.desc}</p>
              </div>

              {/* Widget Side */}
              <div className="nodeWidget">
                <div className="widgetGlassCard">

                  {step.widget === 'survey' && (
                    <div className="wgt wSurvey">
                      <div className="wHead"><span>Engagement Survey</span><span className="wBadge bg-purple text-white">78% Favorable</span></div>
                      <div className="wBars">
                        {[{ l: 'Leadership Trust', v: 82 }, { l: 'Growth', v: 71 }, { l: 'Balance', v: 68 }].map((b, i) => (
                          <div key={i} className="wBarItem">
                            <div className="wBarMeta"><span>{b.l}</span><span>{b.v}%</span></div>
                            <div className="wBarTrack"><div className="wBarFill bg-purple" style={{ width: `${b.v}%` }} /></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {step.widget === 'actions' && (
                    <div className="wgt wActions">
                      <div className="wHead"><span>AI Recommended Actions</span><span className="wBadge bg-orange text-white">3 items</span></div>
                      <div className="wList">
                        {[{ t: 'Schedule feedback session', d: true }, { t: 'Review OKR progress', d: true }, { t: 'Launch pulse survey', d: false }].map((c, i) => (
                          <div key={i} className={`wListItem ${c.d ? 'done' : ''}`}>
                            <span className={`wChk ${c.d ? 'bg-orange text-white' : ''}`}>{c.d ? '✓' : ''}</span>
                            <span className="wTxt">{c.t}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {step.widget === 'agenda' && (
                    <div className="wgt wAgenda">
                      <div className="wHead"><span>1-on-1 Agenda</span><span className="wBadge bg-green text-white">Live Sync</span></div>
                      <div className="wTimeline">
                        {[{ t: 'Wellbeing check-in', o: 'You' }, { t: 'Career growth plan', o: 'Olivia' }].map((a, i) => (
                          <div key={i} className="wTimeItem">
                            <div className="wTimeDot bg-green" />
                            <div className="wTimeContent">
                              <span className="wTimeTxt">{a.t}</span>
                              <span className="wTimeOwner bg-green-light text-green">{a.o}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {step.widget === 'skills' && (
                    <div className="wgt wSkills">
                      <div className="wHead"><span>Competency Matrix</span><span className="wBadge bg-blue text-white">Active</span></div>
                      <div className="wTagsCloud">
                        {['Collaboration', 'Problem Solving', 'Leadership', 'Strategy'].map((t, i) => (
                          <span key={i} className="wTagCloudItem border-blue text-blue">{t}</span>
                        ))}
                      </div>
                      <div className="wProgressWrap">
                        <div className="wProgHead"><span>Overall</span><span className="text-blue">73%</span></div>
                        <div className="wBarTrack"><div className="wBarFill bg-blue" style={{ width: '73%' }} /></div>
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
