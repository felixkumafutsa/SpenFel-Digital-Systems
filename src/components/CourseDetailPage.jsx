import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  BrainCircuit,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Cpu,
  FileCheck2,
  Globe2,
  GraduationCap,
  HelpCircle,
  Laptop,
  Layers,
  MessageCircle,
  Share2,
  ShieldCheck,
  TrendingUp,
  Users,
  Wrench,
} from 'lucide-react';
import { db } from '../firebase';
import { defaultCourses, courseCategories } from '../data/coursesData';
import CourseEnquiryModal from './CourseEnquiryModal';
import useCardReveal from './useCardReveal';

const categoryIcons = {
  'digital-productivity-workplace-skills': Laptop,
  'artificial-intelligence-automation': BrainCircuit,
  'data-analytics-research': BarChart3,
  'digital-business-entrepreneurship': TrendingUp,
  'software-development-it': Code2,
  'cybersecurity-digital-safety': ShieldCheck,
  'emerging-technologies-digital-transformation': Globe2,
};

export default function CourseDetailPage() {
  const { slug } = useParams();
  const [course, setCourse] = useState(() => defaultCourses.find((c) => c.slug === slug));
  const [loading, setLoading] = useState(true);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const revealRef = useCardReveal();

  useEffect(() => {
    let isMounted = true;

    async function fetchCourse() {
      // Check static fallback first
      const localCourse = defaultCourses.find((c) => c.slug === slug);
      if (localCourse) {
        setCourse(localCourse);
      }

      if (db && slug) {
        try {
          const docRef = doc(db, 'trainingAnnouncements', slug);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists() && isMounted) {
            setCourse({ ...docSnap.data(), id: docSnap.id });
          }
        } catch {
          // Gracefully retain static course catalogue
        }
      }

      if (isMounted) setLoading(false);
    }

    fetchCourse();
    window.scrollTo({ top: 0, behavior: 'instant' });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Update Page Title
  useEffect(() => {
    if (course) {
      document.title = `${course.title} | SpenFel Digital Skills Lab`;
    } else {
      document.title = 'Course Details | SpenFel Digital Skills Lab';
    }
  }, [course]);

  if (!course && !loading) {
    return (
      <div className="sds-site sds-skills-page" style={{ minHeight: '70vh', padding: '120px 0 60px' }}>
        <div className="sds-container" style={{ textAlign: 'center', maxWidth: '640px' }}>
          <HelpCircle size={48} style={{ color: '#2563eb', margin: '0 auto 16px' }} />
          <h1 style={{ fontSize: '28px', color: '#0f172a', marginBottom: '12px' }}>Course Not Found</h1>
          <p style={{ color: '#64748b', marginBottom: '24px', lineHeight: '1.6' }}>
            We could not find the course catalogue entry you requested. It may have been renamed or updated.
          </p>
          <a href="/training" className="sds-button sds-button--skills">
            <ArrowLeft size={16} /> Return to Course Catalogue
          </a>
        </div>
      </div>
    );
  }

  const category = courseCategories.find((cat) => cat.id === course?.categoryId);
  const CategoryIcon = categoryIcons[course?.categoryId] || Laptop;
  const relatedCourses = defaultCourses
    .filter((c) => c.categoryId === course?.categoryId && c.slug !== course?.slug)
    .slice(0, 3);

  const getWhatsAppUrl = () => {
    if (!course) return '#';
    const text = encodeURIComponent(
      `Hello SpenFel Skills Lab, I would like to enquire about the "${course.title}" course (${course.level} Level). Please share the upcoming schedule and fee details.`
    );
    return `https://wa.me/265997473256?text=${text}`;
  };

  return (
    <div className="sds-site sds-skills-page sds-course-detail-view" ref={revealRef}>
      {/* Top Skills Ribbon */}
      <div className="sds-skills-ribbon" role="region" aria-label="Skills Lab Division">
        <div className="sds-container sds-skills-ribbon__inner">
          <div className="sds-skills-ribbon__left">
            <GraduationCap size={15} aria-hidden="true" />
            <strong>SPENFEL DIGITAL SKILLS LAB • PROFESSIONAL TECH &amp; WORKFORCE TRAINING</strong>
          </div>
          <span className="sds-skills-ribbon__right">
            Practical Cohorts • Institutional Upskilling • Career Skills
          </span>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <nav className="sds-course-breadcrumbs" aria-label="Breadcrumbs">
        <div className="sds-container sds-course-breadcrumbs__inner">
          <a href="/">Home</a>
          <span aria-hidden="true">&rsaquo;</span>
          <a href="/training">Skills Lab</a>
          <span aria-hidden="true">&rsaquo;</span>
          {category && (
            <>
              <a href={`/training?category=${category.id}`}>{category.shortName}</a>
              <span aria-hidden="true">&rsaquo;</span>
            </>
          )}
          <span className="is-active" aria-current="page">{course?.title}</span>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="sds-course-hero">
        <div className="sds-container">
          <div className="sds-course-hero__content">
            <div className="sds-course-hero__pills">
              <span className="sds-course-pill sds-course-pill--category">
                <CategoryIcon size={13} aria-hidden="true" /> {category?.name || 'Digital Skills'}
              </span>
              <span className={`sds-course-pill sds-course-pill--${String(course?.level || '').toLowerCase()}`}>
                {course?.level} Level
              </span>
              <span className="sds-course-pill sds-course-pill--neutral">
                {course?.deliveryMode} Mode
              </span>
              {course?.courseFormat && (
                <span className="sds-course-pill sds-course-pill--neutral">
                  {course.courseFormat}
                </span>
              )}
            </div>

            <h1 className="sds-course-hero__title">{course?.title}</h1>
            <p className="sds-course-hero__lead">{course?.shortDescription}</p>

            <div className="sds-course-hero__actions">
              <button
                type="button"
                className="sds-button sds-button--skills"
                onClick={() => setEnquiryOpen(true)}
              >
                Enquire About This Course <ArrowRight size={16} aria-hidden="true" />
              </button>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="sds-button sds-button--skills-outline"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <MessageCircle size={16} style={{ color: '#25d366' }} /> Enquire on WhatsApp
              </a>
              <a href="/training" className="sds-button sds-button--skills-ghost">
                <ArrowLeft size={15} /> All Courses
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Detail Body & Sticky Sidebar Grid */}
      <main className="sds-course-main sds-section">
        <div className="sds-container sds-course-main__grid">
          {/* Main Content Column */}
          <div className="sds-course-main__col-content">
            {/* Overview */}
            <section className="sds-course-card-detail" data-card-reveal>
              <h2 className="sds-course-section-title">
                <BookOpen size={20} className="sds-csection-icon" /> Course Overview
              </h2>
              <div className="sds-course-prose">
                <p>{course?.fullDescription}</p>
              </div>
            </section>

            {/* Learning Outcomes */}
            {course?.learningOutcomes?.length > 0 && (
              <section className="sds-course-card-detail" data-card-reveal>
                <h2 className="sds-course-section-title">
                  <FileCheck2 size={20} className="sds-csection-icon" /> What You Will Learn
                </h2>
                <ul className="sds-course-outcomes-list">
                  {course.learningOutcomes.map((outcome, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={18} className="sds-outcome-check" aria-hidden="true" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Curriculum & Modules */}
            {course?.curriculum?.length > 0 && (
              <section className="sds-course-card-detail" data-card-reveal>
                <h2 className="sds-course-section-title">
                  <Layers size={20} className="sds-csection-icon" /> Curriculum &amp; Modules
                </h2>
                <div className="sds-course-curriculum">
                  {course.curriculum.map((mod, index) => (
                    <div key={index} className="sds-curriculum-module">
                      <div className="sds-curriculum-module__header">
                        <span className="sds-curriculum-module__num">0{index + 1}</span>
                        <h3>{mod.module}</h3>
                      </div>
                      <ul className="sds-curriculum-topics">
                        {mod.topics.map((t, tIdx) => (
                          <li key={tIdx}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Practical Projects */}
            {course?.practicalProjects?.length > 0 && (
              <section className="sds-course-card-detail" data-card-reveal>
                <h2 className="sds-course-section-title">
                  <Wrench size={20} className="sds-csection-icon" /> Practical Projects &amp; Portfolio Deliverables
                </h2>
                <p style={{ color: '#475569', fontSize: '13.5px', marginBottom: '14px' }}>
                  Students in the Skills Lab learn through practical application. Here are key deliverables you build during the course:
                </p>
                <div className="sds-course-projects-grid">
                  {course.practicalProjects.map((proj, idx) => (
                    <div key={idx} className="sds-course-project-badge">
                      <span className="sds-course-project-num">Project {idx + 1}</span>
                      <p>{proj}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Tools and Technologies */}
            {course?.toolsAndTechnologies?.length > 0 && (
              <section className="sds-course-card-detail" data-card-reveal>
                <h2 className="sds-course-section-title">
                  <Cpu size={20} className="sds-csection-icon" /> Tools &amp; Technologies Covered
                </h2>
                <div className="sds-course-chips sds-course-chips--lg">
                  {course.toolsAndTechnologies.map((tool) => (
                    <span key={tool} className="sds-course-chip sds-course-chip--lg">
                      {tool}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Target Audience & Entry Requirements */}
            <section className="sds-course-card-detail" data-card-reveal>
              <h2 className="sds-course-section-title">
                <Users size={20} className="sds-csection-icon" /> Target Audience &amp; Entry Requirements
              </h2>
              <div style={{ marginBottom: '18px' }}>
                <strong style={{ display: 'block', fontSize: '13px', color: '#1e3a8a', marginBottom: '8px' }}>
                  Intended Learners:
                </strong>
                <div className="sds-course-chips">
                  {course?.targetAudience?.map((aud) => (
                    <span key={aud} className="sds-course-chip sds-course-chip--audience">
                      {aud}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '13px', color: '#1e3a8a', marginBottom: '4px' }}>
                  Entry Prerequisites:
                </strong>
                <p style={{ margin: 0, color: '#475569', fontSize: '13.5px', lineHeight: '1.6' }}>
                  {course?.prerequisites || 'Basic computer literacy and a desire to learn.'}
                </p>
              </div>
            </section>
          </div>

          {/* Sticky Sidebar Column */}
          <aside className="sds-course-main__col-sidebar">
            <div className="sds-course-sidebar-card">
              <h3 className="sds-sidebar-card-title">Course Information</h3>
              <dl className="sds-course-sidebar-facts">
                <div>
                  <dt><Clock size={16} /> Duration</dt>
                  <dd>{course?.duration || 'Flexible Cohorts (Contact us)'}</dd>
                </div>
                <div>
                  <dt><GraduationCap size={16} /> Skill Level</dt>
                  <dd>{course?.level} Level</dd>
                </div>
                <div>
                  <dt><Laptop size={16} /> Delivery Mode</dt>
                  <dd>{course?.deliveryMode}</dd>
                </div>
                <div>
                  <dt><Calendar size={16} /> Format</dt>
                  <dd>{course?.courseFormat || 'Professional Course'}</dd>
                </div>
                <div>
                  <dt><Building2 size={16} /> Institutional Delivery</dt>
                  <dd>Available for corporate &amp; NGO cohorts</dd>
                </div>
              </dl>

              <div className="sds-sidebar-card-actions">
                <button
                  type="button"
                  className="sds-button sds-button--skills"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => setEnquiryOpen(true)}
                >
                  Enquire About Course
                </button>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sds-button sds-button--skills-outline"
                  style={{ width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <MessageCircle size={16} style={{ color: '#25d366' }} /> WhatsApp Advisor
                </a>
              </div>

              <div className="sds-sidebar-card-note">
                <Building2 size={16} style={{ color: '#2563eb', flexShrink: 0 }} />
                <span>
                  <strong>Need custom team training?</strong> We deliver on-site and executive workshops tailored to your organization.
                </span>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Related Courses Section */}
      {relatedCourses.length > 0 && (
        <section className="sds-course-related-section sds-section">
          <div className="sds-container">
            <div className="sds-section-heading" data-card-reveal>
              <p className="sds-eyebrow sds-eyebrow--skills">EXPLORE RELATED TOPICS</p>
              <h2>More Courses in <em className="sds-skills-em">{category?.name}</em></h2>
            </div>
            <div className="sds-training-grid">
              {relatedCourses.map((relCourse) => (
                <div key={relCourse.id} className="sds-course-card sds-skills-card">
                  <div className="sds-course-card__body">
                    <div className="sds-course-card__badges">
                      <span className="sds-course-badge sds-course-badge--mode">{relCourse.deliveryMode}</span>
                      <span className="sds-course-badge sds-course-badge--format">{relCourse.level}</span>
                    </div>
                    <h3 className="sds-course-card__title">
                      <a href={`/skills-lab/courses/${relCourse.slug}`}>{relCourse.title}</a>
                    </h3>
                    <p className="sds-course-card__description">{relCourse.shortDescription}</p>
                    <div className="sds-course-card__actions" style={{ marginTop: 'auto', paddingTop: '14px' }}>
                      <a href={`/skills-lab/courses/${relCourse.slug}`} className="sds-button sds-button--skills-outline">
                        View Details <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Enquiry Modal */}
      <CourseEnquiryModal
        course={course}
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
      />
    </div>
  );
}
