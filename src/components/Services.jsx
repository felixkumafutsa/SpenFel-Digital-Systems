import React from 'react';
import { ArrowUpRight, Bot, CloudCog, Code2, Cpu, GraduationCap, Workflow } from 'lucide-react';
import useCardReveal from './useCardReveal';
import usePublicCollection from '../hooks/usePublicCollection';
import { defaultServices } from '../data/siteContent';

const serviceIcons = { Bot, CloudCog, Code2, Cpu, GraduationCap, Workflow };

const Services = () => {
  const revealRef = useCardReveal();
  const { records: services, status } = usePublicCollection('services', defaultServices);
  const contentNotice = status === 'error'
    ? 'Managed services could not be loaded. Showing built-in content; check Firebase connectivity and Firestore rules.'
    : status === 'empty'
      ? 'No managed services have been added yet. Showing built-in content until an administrator imports or adds services.'
      : null;

  return (
  <section id="services" className="sds-services sds-section" ref={revealRef}>
    <div className="sds-container">
      <div className="sds-section-heading sds-section-heading--split">
        <div>
          <p className="sds-eyebrow sds-eyebrow--dark">What we do</p>
          <h2>Technology that moves<br /><em>businesses forward.</em></h2>
        </div>
        <p>From intelligent applications to connected infrastructure, we build digital systems that solve real-world problems.</p>
      </div>
      {contentNotice && <p className="sds-content-diagnostic" role="status">{contentNotice}</p>}
      <div className="sds-services__grid">
        {services.map(({ icon, id, slug, title, description, capabilities = [] }, index) => {
          const Icon = serviceIcons[icon] || Code2;
          const serviceSlug = slug || id;
          return (
          <article className="sds-service" key={title} data-card-reveal>
            <div className="sds-service__top">
              <span className="sds-service__number">0{index + 1}</span>
              <Icon size={21} strokeWidth={1.7} aria-hidden="true" />
            </div>
            <h3>{title}</h3>
            <p className="sds-service__description">{description}</p>
            <ul className="sds-service__capabilities">
              {capabilities.map((capability) => <li key={capability}>{capability}</li>)}
            </ul>
            <a className="sds-service__link" href={`#service-detail-${serviceSlug}`}>
              Explore service <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </article>
          );
        })}
      </div>
      <div className="sds-services__details" aria-label="Service details">
        <div className="sds-services__details-heading">
          <p className="sds-eyebrow sds-eyebrow--dark">More detail</p>
          <h3>How we can help</h3>
        </div>
        <div className="sds-services__details-list">
          {services.map(({ id, slug, title, detail }, index) => {
            const serviceSlug = slug || id;
            return (
            <article id={`service-detail-${serviceSlug}`} className="sds-service-detail" key={serviceSlug || title} data-card-reveal>
              <span className="sds-service-detail__number">0{index + 1}</span>
              <h4>{title}</h4>
              <p>{detail}</p>
            </article>
            );
          })}
        </div>
      </div>
    </div>
  </section>
  );
};

export default Services;
