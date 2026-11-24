import React, { useEffect, useRef, useState } from 'react';
import { addDoc, collection, onSnapshot, query, serverTimestamp, where } from 'firebase/firestore';
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Code2,
  Cpu,
  GraduationCap,
  Laptop,
  Loader2,
  MapPin,
  Monitor,
  Send,
  Sparkles,
  Users,
  Wallet,
  X,
} from 'lucide-react';
import { db } from '../firebase';
import { defaultTrainingPrograms } from '../data/siteContent';

const deliveryLabels = {
  online: 'Online Classroom',
  in_person: 'In-Person Lab',
  hybrid: 'Hybrid (Lab & Online)',
};

const trainingPillars = [
  {
    icon: Code2,
    title: 'Full-Stack Software Engineering',
    desc: 'React, Node.js, REST APIs, PostgreSQL/Firebase & Cloud Architecture.',
  },
  {
    icon: Cpu,
    title: 'Applied IoT & Embedded Systems',
    desc: 'Microcontrollers (ESP32/Arduino), sensors, wireless telemetry & remote automation.',
  },
  {
    icon: BrainCircuit,
    title: 'Practical AI, Machine Learning & Automation',
    desc: 'Applied LLM workflows, intelligent agent pipelines, data analytics & process automation.',
  },
  {
    icon: Building2,
    title: 'Institutional & Corporate Upskilling',
    desc: 'Tailored technology training for government agencies, NGOs, corporate teams & banks.',
  },
];

const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
};

function TrainingRequestDialog({ program, type, onClose }) {
  const [values, setValues] = useState({ name: '', email: '', phone: '', note: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const updateValue = (event) => {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const submitRequest = async (event) => {
    event.preventDefault();
    if (!values.name.trim() || !values.email.trim() || !values.phone.trim()) {
      setStatus({ type: 'error', message: 'Please complete your name, email, and phone number.' });
      return;
    }

    setSubmitting(true);
    setStatus({ type: '', message: '' });
    try {
      if (db) {
        await addDoc(collection(db, 'trainingRequests'), {
          trainingId: program.id,
          trainingTitle: program.title,
          type,
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          note: values.note.trim(),
          createdAt: serverTimestamp(),
        });
      } else {
        const mailto = `mailto:support@spenfeldigtal.com?subject=Training Enquiry: ${encodeURIComponent(program.title)}&body=Name: ${encodeURIComponent(values.name)}%0APhone: ${encodeURIComponent(values.phone)}%0AEmail: ${encodeURIComponent(values.email)}%0ANotes: ${encodeURIComponent(values.note)}`;
        window.location.href = mailto;
      }

      setStatus({
        type: 'success',
        message: type === 'enrollment'
          ? 'Your enrolment request has been received. Our admissions team will contact you to confirm your seat.'
          : 'Your enquiry has been sent. A training advisor will be in touch with you shortly.',
      });
    } catch (error) {
      console.error('Failed to submit training request:', error);
      setStatus({ type: 'error', message: 'We could not submit your request. Please try again or reach out to us on WhatsApp.' });
    } finally {
      setSubmitting(false);
    }
  };

  const isEnrollment = type === 'enrollment';

  return (
    <div className="sds-training-dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget && !submitting) onClose(); }}>
      <section className="sds-training-dialog sds-skills-dialog" role="dialog" aria-modal="true" aria-labelledby="training-request-title">
        <div className="sds-training-dialog__heading sds-skills-dialog__heading">
          <div>
            <p className="sds-eyebrow sds-eyebrow--skills">{isEnrollment ? 'ENROLMENT APPLICATION' : 'PROGRAMME ENQUIRY'}</p>
            <h2 id="training-request-title">{isEnrollment ? 'Enrol in Cohort' : 'Ask an Advisor'}</h2>
            <p className="sds-skills-dialog__prog">{program.title}</p>
          </div>
          <button type="button" className="sds-training-dialog__close" onClick={onClose} disabled={submitting} aria-label="Close form">
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <form className="sds-training-form" onSubmit={submitRequest}>
          <label><span>Full name</span><input name="name" autoComplete="name" maxLength={120} required value={values.name} onChange={updateValue} placeholder="e.g. Kondwani Phiri" /></label>
          <label><span>Email address</span><input name="email" type="email" autoComplete="email" maxLength={254} required value={values.email} onChange={updateValue} placeholder="e.g. kondwani@example.com" /></label>
          <label><span>Phone number (WhatsApp)</span><input name="phone" type="tel" autoComplete="tel" maxLength={24} required value={values.phone} onChange={updateValue} placeholder="e.g. +265 997 473 256" /></label>
          <label><span>{isEnrollment ? 'Sponsor / Company (optional)' : 'What would you like to know? (optional)'}</span><textarea name="note" rows={3} maxLength={2000} value={values.note} onChange={updateValue} placeholder={isEnrollment ? 'Self-funded or employer sponsored...' : 'Questions on schedule, prerequisites or fees...'} /></label>
          {status.message && <p className={`sds-training-form__status${status.type === 'error' ? ' is-error' : ''}`} role={status.type === 'error' ? 'alert' : 'status'}>{status.type === 'error' && <AlertCircle size={16} aria-hidden="true" />}{status.message}</p>}
          {status.type === 'success' ? (
            <button type="button" className="sds-button sds-button--skills" onClick={onClose}>Done</button>
          ) : (
            <button type="submit" className="sds-button sds-button--skills" disabled={submitting}>
              {submitting ? <Loader2 className="sds-training-spin" size={17} /> : <Send size={16} aria-hidden="true" />}
              {submitting ? 'Submitting Application…' : isEnrollment ? 'Submit Enrolment Request' : 'Send Enquiry'}
            </button>
          )}
        </form>
      </section>
    </div>
  );
}

function ProgramDetailsDialog({ program, onClose, onRequest }) {
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);
  const titleId = `training-program-title-${program.id}`;

  useEffect(() => {
    const previousFocus = document.activeElement;
    closeButtonRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = dialogRef.current?.querySelectorAll('button:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [onClose]);

  const startDate = formatDate(program.startDate);
  const endDate = formatDate(program.endDate);
  const dateLabel = startDate && endDate && startDate !== endDate
    ? `${startDate} – ${endDate}`
    : startDate || 'Next Cohort To Be Announced';

  return (
    <div className="sds-training-dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section ref={dialogRef} className="sds-training-dialog sds-training-details sds-skills-dialog" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <div className="sds-training-dialog__heading sds-skills-dialog__heading">
          <div>
            <p className="sds-eyebrow sds-eyebrow--skills">SPENFEL DIGITAL SKILLS LAB</p>
            <h2 id={titleId}>{program.title}</h2>
          </div>
          <button ref={closeButtonRef} type="button" className="sds-training-dialog__close" onClick={onClose} aria-label="Close programme details">
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        {program.imageUrl ? (
          <img className="sds-training-details__image" src={program.imageUrl} alt="" />
        ) : (
          <div className="sds-training-details__image sds-skills-card__image--fallback" aria-hidden="true">
            <Laptop size={36} />
            <span>SPENFEL DIGITAL SKILLS LAB</span>
          </div>
        )}
        <p className="sds-training-details__description">{program.description}</p>
        <dl className="sds-training-card__details sds-training-details__facts">
          <div><dt><CalendarDays size={15} aria-hidden="true" /> Dates</dt><dd>{dateLabel}</dd></div>
          {program.schedule && <div><dt><Clock3 size={15} aria-hidden="true" /> Schedule</dt><dd>{program.schedule}</dd></div>}
          {program.location && <div><dt><MapPin size={15} aria-hidden="true" /> Location</dt><dd>{program.location}</dd></div>}
          <div><dt><Monitor size={15} aria-hidden="true" /> Delivery Mode</dt><dd>{deliveryLabels[program.deliveryMode] || 'Interactive Lab'}</dd></div>
          <div><dt><Wallet size={15} aria-hidden="true" /> Investment</dt><dd>{program.fee || 'Flexible Payment Plans'}</dd></div>
        </dl>
        <div className="sds-training-details__actions">
          <button type="button" className="sds-button sds-button--skills-outline" onClick={() => onRequest(program, 'enquiry')}>
            Enquire <ArrowRight size={16} aria-hidden="true" />
          </button>
          <button type="button" className="sds-button sds-button--skills" onClick={() => onRequest(program, 'enrollment')}>
            Enrol Now <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}

function TrainingCard({ program, onDetails, onRequest }) {
  const startDate = formatDate(program.startDate);
  const endDate = formatDate(program.endDate);
  const dateLabel = startDate && endDate && startDate !== endDate ? `${startDate} – ${endDate}` : startDate || 'Next Cohort Announced Soon';

  const handleCardClick = (event) => {
    if (event.target.closest('button.sds-training-card__action-btn, a')) return;
    onDetails(program);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      if (event.target.closest('button.sds-training-card__action-btn, a')) return;
      event.preventDefault();
      onDetails(program);
    }
  };

  return (
    <article
      className="sds-training-card sds-skills-card"
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label={`View programme details for ${program.title}`}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
    >
      <div className="sds-training-card__image-wrap sds-skills-card__image-wrap">
        {program.imageUrl ? (
          <img className="sds-training-card__image" src={program.imageUrl} alt={program.title} loading="lazy" />
        ) : (
          <div className="sds-training-card__image sds-skills-card__image--fallback" aria-hidden="true">
            <Laptop size={30} />
            <span>SKILLS LAB CURRICULUM</span>
          </div>
        )}
        <div className="sds-training-card__details-link sds-skills-card__details-link" aria-hidden="true">
          <span>View Syllabus</span>
          <ArrowRight size={14} />
        </div>
      </div>
      <div className="sds-training-card__body">
        <div className="sds-training-card__top">
          <span className="sds-training-card__tag sds-skills-card__tag">PROFESSIONAL TRACK</span>
          <span className="sds-training-card__delivery sds-skills-card__delivery">{deliveryLabels[program.deliveryMode] || 'Lab & Online'}</span>
        </div>
        <h3 className="sds-training-card__title" title={program.title}>{program.title}</h3>
        <p className="sds-training-card__description">{program.description}</p>
        <dl className="sds-training-card__details">
          <div><dt><CalendarDays size={14} aria-hidden="true" /> Timeline</dt><dd>{dateLabel}</dd></div>
          <div><dt><Wallet size={14} aria-hidden="true" /> Fee</dt><dd>{program.fee || 'Contact for details'}</dd></div>
        </dl>
        <div className="sds-training-card__actions">
          <button
            type="button"
            className="sds-button sds-button--skills-outline sds-training-card__action-btn"
            onClick={(event) => {
              event.stopPropagation();
              onRequest(program, 'enquiry');
            }}
          >
            Enquire <ArrowRight size={15} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="sds-button sds-button--skills sds-training-card__action-btn"
            onClick={(event) => {
              event.stopPropagation();
              onRequest(program, 'enrollment');
            }}
          >
            Enrol <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function TrainingPage() {
  const [state, setState] = useState({ status: 'loading', programs: defaultTrainingPrograms, error: '' });
  const [request, setRequest] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);

  useEffect(() => {
    if (!db) {
      setState({ status: 'ready', programs: defaultTrainingPrograms, error: '' });
      return undefined;
    }

    return onSnapshot(
      query(collection(db, 'trainingAnnouncements'), where('published', '==', true)),
      (snapshot) => {
        const livePrograms = snapshot.docs
          .map((item) => ({ ...item.data(), id: item.id }))
          .sort((a, b) => String(a.startDate || '').localeCompare(String(b.startDate || '')));

        setState({
          status: 'ready',
          programs: livePrograms.length > 0 ? livePrograms : defaultTrainingPrograms,
          error: '',
        });
      },
      (error) => {
        console.error('Failed to load training announcements:', error);
        setState({ status: 'ready', programs: defaultTrainingPrograms, error: '' });
      },
    );
  }, []);

  return (
    <div className="sds-training-page sds-skills-page">
      {/* Top Skills Ribbon */}
      <div className="sds-skills-ribbon" role="region" aria-label="Skills Lab Division">
        <div className="sds-container sds-skills-ribbon__inner">
          <div className="sds-skills-ribbon__left">
            <GraduationCap size={15} aria-hidden="true" />
            <strong>SPENFEL DIGITAL SKILLS LAB • PROFESSIONAL TECH &amp; WORKFORCE TRAINING</strong>
          </div>
          <span className="sds-skills-ribbon__right">
            Workforce Upskilling • Practical Cohorts • Corporate ICT Training
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="sds-training-hero sds-skills-hero">
        <div className="sds-container">
          <div className="sds-skills-badge">
            <span className="sds-skills-badge__dot" aria-hidden="true" />
            <span>PRACTICAL TECHNOLOGY EDUCATION &amp; WORKFORCE UPSKILLING</span>
          </div>

          <h1>
            Building Malawi’s Technical Workforce.<br />
            <em className="sds-skills-em">Practical Skills for Real Impact.</em>
          </h1>

          <p>
            Through <strong>SpenFel Digital Skills Lab</strong>, we bridge the gap between academic theory and real-world technology delivery. We provide hands-on software development bootcamps, applied AI &amp; IoT systems, and tailored institutional capacity training for organizations across Malawi.
          </p>

          <div className="sds-training-hero__actions">
            <a href="#training-catalogue" className="sds-button sds-button--skills">
              Browse Programme Catalogue <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href="#institutional-training" className="sds-button sds-button--skills-outline">
              Request Institutional Training <Users size={16} aria-hidden="true" />
            </a>
            <a href="/stem-robotics-education" className="sds-button sds-button--skills-ghost">
              <Sparkles size={14} aria-hidden="true" /> Looking for STEM &amp; Robotics for Schools? →
            </a>
          </div>

          {/* 4 Training Tracks Pillar Bar */}
          <div className="sds-skills-pillars">
            {trainingPillars.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="sds-skills-pillar-item">
                <div className="sds-skills-pillar-icon">
                  <Icon size={18} aria-hidden="true" />
                </div>
                <div>
                  <strong>{title}</strong>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programme Catalogue Section */}
      <section id="training-catalogue" className="sds-training-list sds-container" aria-labelledby="training-list-title">
        <div className="sds-training-list__heading">
          <div>
            <p className="sds-eyebrow sds-eyebrow--skills">UPCOMING &amp; ACTIVE COHORTS</p>
            <h2 id="training-list-title">Skills Lab Programmes</h2>
          </div>
          {state.programs.length > 0 && (
            <span className="sds-training-count sds-skills-count">
              {state.programs.length} {state.programs.length === 1 ? 'programme' : 'programmes'} available
            </span>
          )}
        </div>

        {state.status === 'loading' && (
          <div className="sds-training-state" role="status">
            <Loader2 className="sds-training-spin" size={20} /> Loading training programmes…
          </div>
        )}

        {state.programs.length > 0 && (
          <div className="sds-training-grid">
            {state.programs.map((program) => (
              <TrainingCard
                key={program.id}
                program={program}
                onDetails={setSelectedProgram}
                onRequest={(selectedProgram, type) => setRequest({ program: selectedProgram, type })}
              />
            ))}
          </div>
        )}
      </section>

      {/* Institutional Training & Workforce Upskilling Callout */}
      <section id="institutional-training" className="sds-skills-institutional-section sds-section">
        <div className="sds-container">
          <div className="sds-skills-inst-card">
            <div className="sds-skills-inst-card__copy">
              <span className="sds-skills-badge sds-skills-badge--light">INSTITUTIONAL PARTNERSHIPS</span>
              <h2>Custom Tech Training for Your Organisation or Team</h2>
              <p>
                Does your business, NGO, bank, or government agency need to train staff in modern software tools, workflow automation, cloud systems, or cybersecurity awareness? We design and deliver custom, on-premise or virtual training cohorts tailored to your exact tech stack and operational goals.
              </p>
              <div className="sds-skills-inst-benefits">
                <div><CheckCircle2 size={16} aria-hidden="true" /> <span>Tailored curriculum aligned to your business workflows</span></div>
                <div><CheckCircle2 size={16} aria-hidden="true" /> <span>Hands-on project deliverables built during training</span></div>
                <div><CheckCircle2 size={16} aria-hidden="true" /> <span>Flexible on-site, hybrid, or evening executive delivery</span></div>
                <div><CheckCircle2 size={16} aria-hidden="true" /> <span>Certificate of completion and post-training mentoring</span></div>
              </div>
              <div className="sds-skills-inst-actions">
                <a
                  href="/stem-robotics-education#partnership-enquiry"
                  className="sds-button sds-button--skills"
                >
                  Request Institutional Training Proposal <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <a
                  href="https://wa.me/265997473256?text=Hello%20SpenFel%20team,%20we%20are%20interested%20in%20discussing%20custom%20institutional%20training%20for%20our%20organisation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sds-button sds-button--skills-outline"
                >
                  Chat with a Training Advisor <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedProgram && (
        <ProgramDetailsDialog
          program={selectedProgram}
          onClose={() => setSelectedProgram(null)}
          onRequest={(program, type) => {
            setSelectedProgram(null);
            setRequest({ program, type });
          }}
        />
      )}

      {request && (
        <TrainingRequestDialog
          program={request.program}
          type={request.type}
          onClose={() => setRequest(null)}
        />
      )}
    </div>
  );
}
