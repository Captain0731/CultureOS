'use client';

import React from 'react';
import './MarqueeCards.scss';

export function TaskCard() {
  return (
    <div className="mcCard">
      <div className="mcHeader">
        <span className="mcTitle">Inboxes</span>
      </div>
      <div className="mcBody">
        <div className="mcTaskRow">
          <div className="mcCheckbox mcChecked">
            <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 2.5L3 4.5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="mcTaskText">Launch marketing site</span>
        </div>
        <div className="mcTaskRow">
          <div className="mcCheckbox" />
          <span className="mcTaskText">Update design tokens</span>
        </div>
        <div className="mcTaskRow">
          <div className="mcCheckbox mcChecked">
            <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 2.5L3 4.5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="mcTaskText">Integrate GSAP ScrollTrigger</span>
        </div>
      </div>
    </div>
  );
}

export function BoardCard() {
  return (
    <div className="mcCard">
      <div className="mcHeader">
        <span className="mcTitle">Active Sprint</span>
      </div>
      <div className="mcBoardBody">
        <div className="mcBoardCol">
          <span className="mcColTitle">To Do</span>
          <div className="mcBoardItem mcPurpleBg">Asset assets</div>
          <div className="mcBoardItem mcBlueBg">SEO audit</div>
        </div>
        <div className="mcBoardCol">
          <span className="mcColTitle">Active</span>
          <div className="mcBoardItem mcOrangeBg">Lenis integration</div>
        </div>
      </div>
    </div>
  );
}

export function ProgressCard() {
  return (
    <div className="mcCard">
      <div className="mcHeader">
        <span className="mcTitle">Performance</span>
      </div>
      <div className="mcProgressBody">
        <div className="mcMetrics">
          <div className="mcMetricVal">94%</div>
          <div className="mcMetricSub">Productivity index</div>
        </div>
        <div className="mcChart">
          <div className="mcBar" style={{ height: '30%' }} />
          <div className="mcBar" style={{ height: '50%' }} />
          <div className="mcBar" style={{ height: '45%' }} />
          <div className="mcBar" style={{ height: '75%' }} />
          <div className="mcBar" style={{ height: '90%' }} />
        </div>
      </div>
    </div>
  );
}
