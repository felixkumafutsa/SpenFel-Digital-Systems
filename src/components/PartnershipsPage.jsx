import React from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  MessageCircle,
  Network,
  Phone,
  Rocket,
  School,
  Search,
  Settings,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react';
import useCardReveal from './useCardReveal';
import PartnershipEnquiryForm from './PartnershipEnquiryForm';

const partnerSectors = [
  {
    icon: School,
    title: 'Private & International Schools',
    description: 'Providing turnkey STEM, robotics, and coding club delivery; curriculum planning; hardware kits; and trained instructors that elevate student achievement and school distinction.',
  },
  {
    icon: GraduationCap,
    title: 'Tertiary & Educational Institutions',
    description: 'Practical technology training workshops, internship pipelines, advanced IoT and AI curricula, and campus digital infrastructure engineering.',
  },
  {
    icon: HeartHandshake,
    title: 'NGOs & Development Foundations',
    description: 'Implementation partners for funded digital literacy, girls in STEM, rural connectivity, and youth livelihood skill interventions with transparent impact metrics.',
  },
  {
    icon: Building2,
    title: 'Government & Education Stakeholders',
    description: 'Collaborative dialogue on complementary STEM curriculum, district-level teacher capacity building, and digital public learning infrastructure.',
  },
  {
    icon: Lightbulb,
    title: 'Corporate CSR & Enterprise Sponsors',
    description: 'Targeted corporate social investment, student innovation challenges, hardware sponsorship, and direct support for emerging African tech talent.',
  },
  {
    icon: Users,
    title: 'Community Organisations & Tech Hubs',
    description: 'Community-level coding workshops, weekend maker events, and digital skills development for out-of-school and underserved youth.',
  },
];

const partnershipProcess = [
  {
    step: '01',
    title: 'Initial Engagement',
    icon: MessageCircle,
    description: 'We initiate an open exploratory conversation to understand your institution’s mission, learner profile, target outcomes, and operational timeline.',
  },
  {
    step: '02',
    title: 'Needs Assessment',
    icon: Search,
    description: 'Our technical team conducts a structured assessment of available facilities, computer lab hardware, internet connectivity, and student baseline proficiencies.',
  },
  {
    step: '03',
    title: 'Programme Design',
    icon: Compass,
    description: 'We tailor a contextualized curriculum framework, select age-appropriate learning pathways, specify required hardware kits, and structure the delivery schedule.',
  },
  {
    step: '04',
    title: 'Partnership Agreement',
    icon: FileCheck,
    description: 'Establishing transparent terms of collaboration, defining operational responsibilities, safeguarding standards, reporting schedules, and resource commitments.',
  },
  {
    step: '05',
    title: 'Implementation',
    icon: Rocket,
    description: 'Deployment of qualified SpenFel instructors, delivery of instructional hardware kits, and commencement of scheduled, hands-on learning sessions.',
  },
  {
    step: '06',
    title: 'Monitoring & Evaluation',
    icon: TrendingUp,
    description: 'Continuous monitoring of attendance, milestone project completions, and learner competency assessments against agreed baseline metrics.',
  },
  {
    step: '07',
    title: 'Reporting & Improvement',
    icon: Settings,
    description: 'Quarterly review meetings with institutional leadership, showcase demo days for parents and stakeholders, and iterative curriculum refinements.',
  },
];

const engagementAreas = [
  {
    title: 'SpenFel STEM & Robotics Academy',
    badge: 'Youth Flagship',
    lead: 'Institution-oriented STEM and robotics clubs, holiday innovation bootcamps, and school laboratory setup for young people aged 5 to 18.',
    link: '/stem-robotics-education',
    linkText: 'Explore STEM Academy details',
  },
  {
    title: 'SpenFel Digital Skills Lab',
    badge: 'Practical ICT Training',
    lead: 'Professional digital literacy, full-stack software development, IoT systems engineering, and workforce digital productivity for institutions and cohorts.',
    link: '/training',
    linkText: 'Explore Skills Lab catalogue',
  },
  {
    title: 'Digital Solutions & Custom Software',
    badge: 'Engineering Services',
    lead: 'Bespoke web and mobile applications, school management SaaS platforms, automated workflow systems, and secure database architecture.',
    link: '/#services',
    linkText: 'Explore Digital Solutions',
  },
];

export default function PartnershipsPage() {
  const revealRef = useCardReveal();

  return (
    <div className="sds-partnerships-page" ref={revealRef}>
      {/* Hero Section */}
      <section className="sds-partnerships-hero">
        <div className="sds-container sds-partnerships-hero__inner">
          <div className="sds-partnerships-hero__copy" data-card-reveal>
            <div className="sds-stem-badge">
              <span className="sds-stem-badge__dot" aria-hidden="true" />
              <span>INSTITUTIONAL COLLABORATION</span>
            </div>
            <h1>
              Building Strategic Partnerships for <em>Digital Innovation &amp; Education.</em>
            </h1>
            <p className="sds-partnerships-hero__lead">
              We partner with private schools, educational institutions, NGOs, education authorities and corporate organisations to deploy transformative digital solutions and deliver practical technology education across Malawi.
            </p>
            <div className="sds-partnerships-hero__actions">
              <a href="#partnership-enquiry" className="sds-button sds-button--green">
                Submit an Institutional Enquiry <ArrowDownRight size={17} aria-hidden="true" />
              </a>
              <a href="#partnership-process" className="sds-button sds-button--outline">
                View Partnership Process <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="sds-partnerships-hero__stats" data-card-reveal>
            <div className="sds-pstat-card">
              <span className="sds-pstat-card__number">3</span>
              <strong>Core Pillars</strong>
              <p>Digital Solutions, Skills Lab &amp; STEM Academy</p>
            </div>
            <div className="sds-pstat-card">
              <span className="sds-pstat-card__number">7</span>
              <strong>Step Process</strong>
              <p>Structured, transparent institutional delivery</p>
            </div>
            <div className="sds-pstat-card">
              <span className="sds-pstat-card__number">100%</span>
              <strong>Hands-On</strong>
              <p>Practical systems, robotics kits &amp; software</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors We Partner With */}
      <section className="sds-partnerships-sectors sds-section">
        <div className="sds-container">
          <div className="sds-section-heading sds-section-heading--split" data-card-reveal>
            <div>
              <p className="sds-eyebrow sds-eyebrow--dark">Stakeholder Categories</p>
              <h2>
                Organisations <em>We Work With.</em>
              </h2>
            </div>
            <p>
              Our institutional frameworks are built to align with the distinct operational structures, compliance expectations, and reporting needs of different organisations.
            </p>
          </div>

          <div className="sds-partnerships-sectors__grid">
            {partnerSectors.map((sector) => {
              const Icon = sector.icon;
              return (
                <article className="sds-partner-sector-card" key={sector.title} data-card-reveal>
                  <div className="sds-partner-sector-card__top">
                    <Icon size={22} className="text-sds-green" aria-hidden="true" />
                    <h3>{sector.title}</h3>
                  </div>
                  <p>{sector.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* The 7-Step Partnership Process */}
      <section id="partnership-process" className="sds-partnerships-process sds-section">
        <div className="sds-container">
          <div className="sds-section-heading" data-card-reveal>
            <p className="sds-eyebrow sds-eyebrow--dark">Structured Delivery</p>
            <h2>
              Our 7-Step <em>Institutional Partnership Process.</em>
            </h2>
            <p>
              From first contact through long-term execution, our structured methodology ensures alignment, rigorous quality standards, and measurable outcomes for every partner.
            </p>
          </div>

          <ol className="sds-partnerships-process__list">
            {partnershipProcess.map((step) => {
              const Icon = step.icon;
              return (
                <li className="sds-pprocess-step" key={step.step} data-card-reveal>
                  <div className="sds-pprocess-step__marker">
                    <span>{step.step}</span>
                  </div>
                  <div className="sds-pprocess-step__content">
                    <div className="sds-pprocess-step__title-row">
                      <Icon size={18} className="text-sds-green" aria-hidden="true" />
                      <h3>{step.title}</h3>
                    </div>
                    <p>{step.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Pillars of Engagement */}
      <section className="sds-partnerships-pillars sds-section">
        <div className="sds-container">
          <div className="sds-section-heading sds-section-heading--split" data-card-reveal>
            <div>
              <p className="sds-eyebrow sds-eyebrow--dark">Areas of Collaboration</p>
              <h2>
                How Your Organisation <em>Can Engage Us.</em>
              </h2>
            </div>
            <p>
              Whether you need hands-on STEM education for students, technical capacity building for your team, or custom enterprise software, we provide clear pathways to collaborate.
            </p>
          </div>

          <div className="sds-partnerships-pillars__grid">
            {engagementAreas.map((area) => (
              <article className="sds-ppillar-card" key={area.title} data-card-reveal>
                <span className="sds-ppillar-card__badge">{area.badge}</span>
                <h3>{area.title}</h3>
                <p>{area.lead}</p>
                <a href={area.link} className="sds-ppillar-card__link">
                  {area.linkText} <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Enquiry Form Section */}
      <section className="sds-partnerships-form-section sds-section">
        <div className="sds-container">
          <div className="sds-section-heading" data-card-reveal>
            <p className="sds-eyebrow sds-eyebrow--dark">Official Inquiry</p>
            <h2>Start an Institutional <em>Dialogue.</em></h2>
            <p>
              Complete the form below to request a partnership consultation, curriculum overview, or customized technical proposal.
            </p>
          </div>

          <PartnershipEnquiryForm
            defaultPartnershipType="General Institutional Collaboration"
            source="partnerships-page"
          />
        </div>
      </section>
    </div>
  );
}
