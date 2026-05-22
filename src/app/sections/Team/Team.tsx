import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Team.scss';

const teamMembers = [
  {
    role: 'Culture Amp external advisor',
    name: 'Esther Perel',
    description: 'Renowned psychotherapist and New York Times bestselling author',
    linkText: 'Explore the partnership',
    linkUrl: '#',
    image: '/insight_person_1.png',
  },
  {
    role: 'Culture First Podcast',
    name: 'Seth Godin',
    description: 'Renowned author, marketer, and entrepreneur',
    linkText: 'Listen to the podcast now',
    linkUrl: '#',
    image: '/insight_person_2.png',
  },
  {
    role: 'Culture First Virtual',
    name: 'Megan Rapinoe',
    description: "FIFA Women's World Cup champion and olympic gold medalist",
    linkText: 'Watch the video now',
    linkUrl: '#',
    image: '/support-person.png',
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="teamSection" ref={sectionRef} id="team">
      <div className="container">
        <div className="teamHeader">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          >
            Learn from some of the most <span className="italicHighlight">innovative</span>
            <br />
            people leaders to build a better world<br />
            of work
          </motion.h2>
        </div>

        <motion.div 
          className="teamGrid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {teamMembers.map((member, idx) => (
            <motion.div key={idx} className="teamCard" variants={itemVariants}>
              <div className="cardImage">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="cardContent">
                <span className="role">{member.role}</span>
                <h3 className="name">{member.name}</h3>
                <p className="desc">{member.description}</p>
                <a href={member.linkUrl} className="link">
                  {member.linkText}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
