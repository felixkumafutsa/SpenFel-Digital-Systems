import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Compass, Eye, Layers3, Target, Workflow } from 'lucide-react';
import useCardReveal from './useCardReveal';

const statements = [
  {
    icon: Eye,
    label: 'Our Vision',
    text: 'To become a leading African technology company that uses innovation to make life easier, improve businesses, and create better opportunities for people.',
  },
  {
    icon: Target,
    label: 'Our Mission',
    text: "To develop and provide affordable, reliable, and useful technology solutions that solve everyday problems, help businesses and institutions work better, and improve people's lives.",
  },
];

const principles = [
  { icon: Compass, title: 'Grounded in the problem', text: 'Start with the people, context and real-world challenge behind every brief.' },
  { icon: Layers3, title: 'Built as systems', text: 'Bring software, data and connected technology together with purpose.' },
  { icon: Workflow, title: 'Made to evolve', text: 'Design for practical use today and room to adapt as needs change.' },
];

const About = () => {
  const revealRef = useCardReveal();

  return (
  <section id="about" className="sds-about sds-section" ref={revealRef}>
    <div className="sds-container">
      <div className="sds-about__layout">
        <div className="sds-about__intro" data-card-reveal>
          <p className="sds-eyebrow sds-eyebrow--dark">About SDS</p>
          <h2>Technology is only powerful when it works <em>in the real world.</em></h2>
        </div>
      </div>
      <div className="sds-about__statements" aria-label="Our Vision and Mission">
        {statements.map(({ icon: Icon, label, text }) => (
          <article className="sds-about__statement" key={label} data-card-reveal>
            <div className="sds-about__statement-top">
              <span className="sds-about__statement-icon" aria-hidden="true">
                <Icon size={22} strokeWidth={1.8} />
              </span>
              <h3>{label}</h3>
            </div>
            <p className="sds-about__statement-text">{text}</p>
          </article>
        ))}
      </div>
      <div className="sds-about__principles-wrap">
        <p className="sds-eyebrow sds-eyebrow--dark" data-card-reveal>Our principles</p>
        <ol className="sds-about__principles" aria-label="Our principles">
          {principles.map(({ icon: Icon, title, text }, index) => (
            <li className="sds-principle" key={title} data-card-reveal>
              <span className="sds-principle__node" aria-hidden="true">
                <span>0{index + 1}</span>
              </span>
              <Icon size={20} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="sds-team">
        <p className="sds-eyebrow sds-eyebrow--dark">Our team</p>
        <article className="sds-team-card" data-card-reveal>
          <div className="sds-team-card__monogram" aria-hidden="true">FK</div>
          <div className="sds-team-card__details">
            <h3>Felix Kumafutsa</h3>
            <p>Full Stack Software Developer | IoT Specialist | AI Engineer</p>
          </div>
          <Link className="sds-team-card__link" to="/portfolio/">
            View Felix&apos;s portfolio <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </article>
      </div>
    </div>
  </section>
  );
};

export default About;
