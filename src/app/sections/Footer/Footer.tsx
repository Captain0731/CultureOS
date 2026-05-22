import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Footer.scss';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    }
  }
};

const columnVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

const bottomVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] } 
  }
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

  return (
    <footer className="footerSection" ref={footerRef}>
      {/* Animated Glowing Background */}
      <div className="footerGlow"></div>

      <div className="container">
        {/* Top CTA */}
        <motion.div 
          className="footerCta"
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 40 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="ctaContent">
            <h2>
              Invest in your people<br />
              and create <span className="italicImpact">impact</span>
            </h2>
            <div className="ctaButtons">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0px 8px 25px rgba(255,255,255,0.2)" }} 
                whileTap={{ scale: 0.95 }} 
                className="btnLight"
              >
                Book a demo
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }} 
                whileTap={{ scale: 0.95 }} 
                className="btnDark"
              >
                See how it works
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Links Grid */}
        <motion.div 
          className="footerLinksGrid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="linkColumn" variants={columnVariants}>
            <h4>Platform <span className="arrow">→</span></h4>
            <ul>
              <li><a href="#">Overview</a></li>
              <li><a href="#">Plans & pricing</a></li>
              <li><a href="#">Engage</a></li>
              <li><a href="#">Perform</a></li>
              <li><a href="#">Develop</a></li>
              <li>
                <a href="#">
                  <span>✨ AI Coach</span>
                  <span className="newBadge">NEW</span>
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div className="linkColumn" variants={columnVariants}>
            <h4>Features</h4>
            <ul>
              <li><a href="#">Performance Culture Quadrant</a></li>
              <li><a href="#">Retention insights</a></li>
              <li><a href="#">DEI survey</a></li>
              <li><a href="#">Ready-to-use surveys</a></li>
              <li><a href="#">AI comment summaries</a></li>
              <li><a href="#">Continuous feedback</a></li>
              <li><a href="#">Performance reviews</a></li>
              <li><a href="#">1:1 conversations</a></li>
              <li><a href="#">Skills coach</a></li>
              <li><a href="#">Career paths</a></li>
              <li><a href="#">Develop analytics</a></li>
            </ul>
          </motion.div>

          <motion.div className="linkColumn" variants={columnVariants}>
            <h4>Science</h4>
            <ul>
              <li><a href="#">People science</a></li>
              <li><a href="#">Research</a></li>
              <li><a href="#">Benchmarks</a></li>
              <li><a href="#">ROI calculator</a></li>
            </ul>
          </motion.div>

          <motion.div className="linkColumn" variants={columnVariants}>
            <h4>Resources <span className="arrow">→</span></h4>
            <ul>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Podcast</a></li>
              <li><a href="#">Events</a></li>
              <li><a href="#">Case studies</a></li>
              <li><a href="#">Guides & toolkits</a></li>
              <li><a href="#">Reports</a></li>
              <li><a href="#">Videos</a></li>
              <li><a href="#">On-demand webinars</a></li>
            </ul>
          </motion.div>

          <motion.div className="linkColumn" variants={columnVariants}>
            <h4>Company <span className="arrow">→</span></h4>
            <ul>
              <li><a href="#">Our story & values</a></li>
              <li><a href="#">Newsroom</a></li>
              <li><a href="#">Foundation</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Media kit</a></li>
              <li><a href="#">Trust & security</a></li>
              <li><a href="#">Legal</a></li>
              <li><a href="#">Partner ecosystem</a></li>
              <li><a href="#">Contact us</a></li>
              <li><a href="#">Developer API</a></li>
              <li><a href="#">Product status</a></li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div 
          className="footerBottom"
          variants={bottomVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="bottomLeft">
            <div className="brandLogo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="currentColor"/>
              </svg>
              Culture OS
            </div>
            
            <div className="socialLinks">
              <motion.a whileHover={{ y: -4, color: "#8b5cf6" }} href="#" aria-label="LinkedIn">in</motion.a>
              <motion.a whileHover={{ y: -4, color: "#8b5cf6" }} href="#" aria-label="X (Twitter)">𝕏</motion.a>
              <motion.a whileHover={{ y: -4, color: "#8b5cf6" }} href="#" aria-label="Facebook">f</motion.a>
              <motion.a whileHover={{ y: -4, color: "#8b5cf6" }} href="#" aria-label="Instagram">IG</motion.a>
              <motion.a whileHover={{ y: -4, color: "#8b5cf6" }} href="#" aria-label="YouTube">▶</motion.a>
            </div>

            <div className="legalLinks">
              © {new Date().getFullYear()} Culture OS Pty Ltd, 
              <a href="#">Terms</a>, 
              <a href="#">Privacy</a>, 
              <a href="#">Your Privacy Choices</a>
            </div>
          </div>

          <div className="bottomRight">
            <div className="newsletterBox">
              <p>Get our newsletter, event invites, plus product<br/>insights and research.</p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Subscribe</motion.button>
            </div>
            <p className="acknowledgement">
              We at Culture OS acknowledge the Traditional Owners of the lands on which we live, work, dream and play. We have offices all over the world, including on the traditional lands of the Wurundjeri and Gadigal peoples in Australia, and the Munsee Lenape, Ohlone, Potawatomi and Kickapoo peoples in North America. Together, we recognise and are inspired by the culture, strength, resilience and capacity of the people of these lands. We pay our respects to Elders past and present.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
