import React from 'react';
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Code2,
  Globe2,
  Laptop,
  MessageCircle,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

const categoryIcons = {
  'digital-productivity-workplace-skills': Laptop,
  'artificial-intelligence-automation': BrainCircuit,
  'data-analytics-research': BarChart3,
  'digital-business-entrepreneurship': TrendingUp,
  'software-development-it': Code2,
  'cybersecurity-digital-safety': ShieldCheck,
  'emerging-technologies-digital-transformation': Globe2,
};

const categoryNames = {
  'digital-productivity-workplace-skills': 'Digital Productivity',
  'artificial-intelligence-automation': 'AI & Automation',
  'data-analytics-research': 'Data Analytics & Research',
  'digital-business-entrepreneurship': 'Digital Business',
  'software-development-it': 'Software Development & IT',
  'cybersecurity-digital-safety': 'Cybersecurity & Safety',
  'emerging-technologies-digital-transformation': 'Emerging Tech & GIS',
};

const levelClasses = {
  Foundation: 'sds-course-pill--foundation',
  Intermediate: 'sds-course-pill--intermediate',
  Professional: 'sds-course-pill--professional',
};

export default function CourseCard({ course, onEnquire }) {
  const Icon = categoryIcons[course.categoryId] || Laptop;
  const categoryLabel = categoryNames[course.categoryId] || 'Digital Skills';

  return (
    <article className="sds-course-card sds-skills-card" data-category={course.categoryId}>
      <div className={`sds-course-card__header sds-course-header--${course.categoryId}`}>
        <div className="sds-course-card__icon-box">
          <Icon size={26} aria-hidden="true" />
        </div>
        <div className="sds-course-card__meta-top">
          <span className="sds-course-card__cat">{categoryLabel}</span>
          <span className={`sds-course-pill ${levelClasses[course.level] || ''}`}>
            {course.level}
          </span>
        </div>
      </div>

      <div className="sds-course-card__body">
        <div className="sds-course-card__badges">
          <span className="sds-course-badge sds-course-badge--mode">{course.deliveryMode}</span>
          <span className="sds-course-badge sds-course-badge--format">{course.courseFormat || 'Course'}</span>
          {course.featured && <span className="sds-course-badge sds-course-badge--featured">Featured</span>}
        </div>

        <h3 className="sds-course-card__title">
          <a href={`/skills-lab/courses/${course.slug}`}>{course.title}</a>
        </h3>

        <p className="sds-course-card__description">{course.shortDescription}</p>

        {course.toolsAndTechnologies?.length > 0 && (
          <div className="sds-course-card__tools">
            <span className="sds-course-card__tools-label">Tools:</span>
            <div className="sds-course-chips">
              {course.toolsAndTechnologies.slice(0, 3).map((tool) => (
                <span key={tool} className="sds-course-chip">
                  {tool}
                </span>
              ))}
              {course.toolsAndTechnologies.length > 3 && (
                <span className="sds-course-chip sds-course-chip--more">
                  +{course.toolsAndTechnologies.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="sds-course-card__actions">
          <a
            href={`/skills-lab/courses/${course.slug}`}
            className="sds-button sds-button--skills-outline sds-course-card__btn-view"
          >
            View Details <ArrowRight size={14} aria-hidden="true" />
          </a>
          <button
            type="button"
            className="sds-button sds-button--skills sds-course-card__btn-enquire"
            onClick={() => onEnquire(course)}
          >
            Enquire
          </button>
        </div>
      </div>
    </article>
  );
}
