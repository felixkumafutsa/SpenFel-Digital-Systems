import React from 'react';
import { ArrowRight, ArrowUpRight, Building2, CheckCircle2, HeartHandshake, Lightbulb, School } from 'lucide-react';
import useCardReveal from './useCardReveal';

const institutionalPartners = [
  {
    icon: School,
    title: 'Private Schools',
    focus: 'Turnkey STEM Clubs & Labs',
    description: 'We supply certified instructors, progressive robotics & coding curricula, hardware kits, and student project supervision without requiring you to hire an internal department.',
  },
  {
    icon: Building2,
    title: 'Education Authorities',
    focus: 'District-Level Collaboration',
    description: 'Complementary STEM initiatives, teacher professional development, and practical learning resources that align with national digital readiness priorities.',
  },
  {
    icon: HeartHandshake,
    title: 'NGOs & Development Partners',
    focus: 'Measurable Digital Inclusion',
    description: 'Tailored technology and robotics interventions focused on digital literacy, girls in STEM, underserved communities, and youth empowerment with robust M&E reporting.',
  },
  {
    icon: Lightbulb,
    title: 'Corporate Organisations',
    focus: 'CSR & Youth Innovation',
    description: 'Corporate sponsorship of school STEM equipment, student hackathons, and community innovation labs that invest in Africa’s next engineering generation.',
  },
];

const partnershipProcessSteps = [
  { number: '01', label: 'Initial Dialogue' },
  { number: '02', label: 'Needs Assessment' },
  { number: '03', label: 'Curriculum Design' },
  { number: '04', label: 'Agreement' },
  { number: '05', label: 'Deployment' },
  { number: '06', label: 'M&E Review' },
  { number: '07', label: 'Showcase & Growth' },
];

export default function InstitutionalApproach() {
  const revealRef = useCardReveal();

  return (
    <section className="sds-institutional-approach sds-section" ref={revealRef}>
      <div className="sds-container">
        <div className="sds-section-heading sds-section-heading--split" data-card-reveal>
          <div>
            <p className="sds-eyebrow sds-eyebrow--dark">Institutional Collaboration</p>
            <h2>
              Partnering for Long-Term<br />
              <em>Educational &amp; Digital Impact.</em>
            </h2>
          </div>
          <p>
            Whether designing enterprise software or deploying hands-on robotics clubs, SpenFel works through structured institutional partnerships that guarantee accountability, sustainability, and measurable outcomes.
          </p>
        </div>

        <div className="sds-institutional__partners-grid">
          {institutionalPartners.map((item) => {
            const Icon = item.icon;
            return (
              <article className="sds-inst-card" key={item.title} data-card-reveal>
                <div className="sds-inst-card__top">
                  <Icon size={22} className="text-sds-green" aria-hidden="true" />
                  <span className="sds-inst-card__focus">{item.focus}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a href="/partnerships" className="sds-inst-card__link">
                  Learn about {item.title.toLowerCase()} partnerships <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </article>
            );
          })}
        </div>

        <div className="sds-institutional__process-band" data-card-reveal>
          <div className="sds-institutional__process-header">
            <h4>Our 7-Step Institutional Partnership Framework</h4>
            <a href="/partnerships#partnership-process" className="sds-text-link">
              Explore step details <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
          <ol className="sds-institutional__steps">
            {partnershipProcessSteps.map((s, idx) => (
              <li key={s.number}>
                <span className="sds-inst-step__num">{s.number}</span>
                <span className="sds-inst-step__label">{s.label}</span>
                {idx < partnershipProcessSteps.length - 1 && (
                  <span className="sds-inst-step__arrow" aria-hidden="true">→</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
