import React from 'react';
import { ArrowRight, ArrowUpRight, Bot, BrainCircuit, Cpu, School, Sparkles, Sprout } from 'lucide-react';
import useCardReveal from './useCardReveal';

const pathwaysPreview = [
  {
    stage: '01',
    name: 'Young Digital Explorers',
    age: 'Ages 5–8',
    icon: Sparkles,
    desc: 'ScratchJr, computational thinking, digital literacy, and creative construction.',
  },
  {
    stage: '02',
    name: 'Junior Coders & Robotics Engineers',
    age: 'Ages 9–12',
    icon: Bot,
    desc: 'Scratch to Python, Arduino microcontrollers, sensors, and obstacle-avoiding rovers.',
  },
  {
    stage: '03',
    name: 'Future Innovators',
    age: 'Ages 13–16',
    icon: Cpu,
    desc: 'Python programming, ESP32 electronics, IoT telemetry, and AI fundamentals.',
  },
  {
    stage: '04',
    name: 'Advanced Robotics & Applied AI',
    age: 'Ages 16–18',
    icon: BrainCircuit,
    desc: 'Advanced software, robotics kinematics, computer vision, and engineering prototypes.',
  },
];

export default function StemRoboticsPreview() {
  const revealRef = useCardReveal();

  return (
    <section className="sds-stem-preview sds-section" ref={revealRef}>
      <div className="sds-container">
        <div className="sds-stem-preview__banner" data-card-reveal>
          <div className="sds-stem-preview__copy">
            <div className="sds-stem-badge">
              <span className="sds-stem-badge__dot" aria-hidden="true" />
              <span>NEW FLAGSHIP EDUCATION INITIATIVE</span>
            </div>
            <h2>
              SpenFel STEM &amp; <em>Robotics Academy.</em>
            </h2>
            <p className="sds-stem-preview__lead">
              Empowering the next generation of African innovators. We partner with private schools, educational institutions, NGOs and organisations to deliver practical, hands-on STEM education, coding, robotics, electronics, IoT and AI.
            </p>
            <p className="sds-stem-preview__text">
              We help institutions move learners from passive technology consumers into active creators and builders—delivering structured weekly STEM clubs, after-school programmes, robotics lab setup, and teacher training.
            </p>
            <div className="sds-stem-preview__actions">
              <a href="/stem-robotics-education" className="sds-button sds-button--green">
                Explore STEM &amp; Robotics Academy <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a href="/partnerships" className="sds-button sds-button--outline">
                Institutional Partnerships <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="sds-stem-preview__pathways">
            <div className="sds-stem-preview__pathways-header">
              <span>FOUR DEVELOPMENTAL PATHWAYS</span>
              <span>AGES 5 — 18</span>
            </div>
            <div className="sds-stem-preview__pathway-cards">
              {pathwaysPreview.map(({ stage, name, age, icon: Icon, desc }) => (
                <div className="sds-stem-preview-card" key={name}>
                  <div className="sds-stem-preview-card__top">
                    <span className="sds-stem-preview-card__stage">{stage}</span>
                    <span className="sds-stem-preview-card__age">{age}</span>
                  </div>
                  <div className="sds-stem-preview-card__name">
                    <Icon size={17} className="text-sds-green" aria-hidden="true" />
                    <strong>{name}</strong>
                  </div>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
            <div className="sds-stem-preview__footer">
              <a href="/stem-robotics-education#learning-pathways" className="sds-text-link">
                View detailed curriculum pathways <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
