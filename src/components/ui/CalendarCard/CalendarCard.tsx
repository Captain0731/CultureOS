'use client';

import React from 'react';
import './CalendarCard.scss';

export default function CalendarCard() {
  return (
    <div className="calCard">
      <div className="calHeader">
        <span className="calTitle">My schedule</span>
      </div>
      <div className="calBody">
        <div className="calRow">
          <span className="calDay">Mon</span>
          <div className="calTasks">
            <span className="calTask calPurple">CrownMarket</span>
            <span className="calTask calGreen">EduPath</span>
          </div>
        </div>
        <div className="calRow">
          <span className="calDay">Tue</span>
          <div className="calTasks">
            <span className="calTask calPurple">CrownMarket</span>
            <span className="calTask calGreen">EduPath</span>
          </div>
        </div>
        <div className="calRow">
          <span className="calDay">Wed</span>
          <div className="calTasks">
            <span className="calTask calGreen">EduPath</span>
            <span className="calTask calPurple">CrownMarket</span>
          </div>
        </div>
        <div className="calRow">
          <span className="calDay">Thu</span>
          <div className="calTasks">
            <span className="calTask calOrange">TravelTales</span>
            <span className="calTask calGreen"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
