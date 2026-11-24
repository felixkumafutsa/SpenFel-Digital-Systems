import React from 'react';
import { ArrowRight, ArrowUpRight, Bot, BrainCircuit, Cpu, School, Sparkles, Sprout, Zap } from 'lucide-react';
import useCardReveal from './useCardReveal';

const pathwaysPreview = [
  {
    stage: '01',
    name: 'Young Digital Explorers',
    age: 'Ages 5–8',
    theme: 'amber',
    icon: Sparkles,
    desc: 'ScratchJr, computational thinking, digital literacy, and creative construction.',
  },
  {
    stage: '02',
    name: 'Junior Coders & Robotics Engineers',
    age: 'Ages 9–12',
    theme: 'cyan',
    icon: Bot,
    desc: 'Scratch to Python, Arduino microcontrollers, sensors, and obstacle-avoiding rovers.',
  },
  {
    stage: '03',
    name: 'Future Innovators',
    age: 'Ages 13–16',
    theme: 'indigo',
    icon: Cpu,
    desc: 'Python programming, ESP32 electronics, IoT telemetry, and AI fundamentals.',
  },
  {
    stage: '04',
    name: 'Advanced Robotics & Applied AI',
    age: 'Ages 16–18',
    theme: 'purple',
    icon: BrainCircuit,
    desc: 'Advanced software, robotics kinematics, computer vision, and engineering prototypes.',
  },
];

export default function StemRoboticsPreview() {
  const revealRef = useCardReveal();

  return (
    <section className="sds-stem-preview sds-creative-preview sds-section" ref={revealRef}>
      <div className="sds-container">
        <div className="sds-stem-preview__banner sds-creative-preview-banner" data-card-reveal>
          <div className="sds-stem-preview__copy">
            <div className="sds-stem-badge sds-stem-badge--creative">
              <Sparkles size={13} className="sds-spin-slow" aria-hidden="true" />
              <span>FLAGSHIP ACADEMY • CREATIVITY MODE</span>
            </div>
            <h2>
              SpenFel STEM &amp; <span className="sds-gradient-text">Robotics Academy.</span>
            </h2>
            <p className="sds-stem-preview__lead">
              Empowering the next generation of African innovators. We partner with private schools, educational institutions, NGOs and organisations to deliver practical, hands-on STEM education, coding, robotics, electronics, IoT and AI.
            </p>
            <p className="sds-stem-preview__text">
              We help institutions move learners from passive technology consumers into active creators and builders—delivering structured weekly STEM clubs, after-school programmes, robotics lab setup, and teacher training.
            </p>
            <div className="sds-stem-preview__actions">
              <a href="/stem-robotics-education" className="sds-button sds-button--stem">
                Explore STEM &amp; Robotics Academy <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a href="/stem-robotics-education#partnership-enquiry" className="sds-button sds-button--stem-outline">
                Partner With Us <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="sds-stem-preview__pathways sds-creative-preview__pathways">
            <div className="sds-stem-preview__pathways-header">
              <span className="sds-cpreview-tag">FOUR DEVELOPMENTAL PATHWAYS</span>
              <span className="sds-cpreview-tag sds-cpreview-tag--cyan">AGES 5 — 18</span>
            </div>
            <div className="sds-stem-preview__pathway-cards">
              {pathwaysPreview.map(({ stage, name, age, theme, icon: Icon, desc }) => (
                <div className={`sds-stem-preview-card sds-cpreview-card sds-cpreview-card--${theme}`} key={name}>
                  <div className="sds-stem-preview-card__top">
                    <span className="sds-stem-preview-card__stage">{stage}</span>
                    <span className="sds-stem-preview-card__age">{age}</span>
                  </div>
                  <div className="sds-stem-preview-card__name">
                    <Icon size={17} className={`sds-cpreview-icon sds-cpreview-icon--${theme}`} aria-hidden="true" />
                    <strong>{name}</strong>
                  </div>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
            <div className="sds-stem-preview__footer">
              <a href="/stem-robotics-education#learning-pathways" className="sds-text-link sds-text-link--creative">
                View detailed curriculum pathways <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
