import { useEffect, useState } from 'react';
import { addDoc, collection, onSnapshot, query, serverTimestamp, where } from 'firebase/firestore';
import { AlertCircle, ArrowRight, CalendarDays, Clock3, Loader2, MapPin, Monitor, Send, Wallet, X } from 'lucide-react';
import { db } from '../firebase';

const deliveryLabels = {
  online: 'Online',
  in_person: 'In person',
  hybrid: 'Hybrid',
};

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
      setStatus({
        type: 'success',
        message: type === 'enrollment'
          ? 'Your enrollment request has been received. We’ll contact you to confirm your place.'
          : 'Your enquiry has been sent. Our team will be in touch soon.',
      });
    } catch (error) {
      console.error('Failed to submit training request:', error);
      setStatus({ type: 'error', message: 'We could not submit your request. Please try again or contact our team.' });
    } finally {
      setSubmitting(false);
    }
  };

  const isEnrollment = type === 'enrollment';

  return (
    <div className="sds-training-dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget && !submitting) onClose(); }}>
      <section className="sds-training-dialog" role="dialog" aria-modal="true" aria-labelledby="training-request-title">
        <div className="sds-training-dialog__heading">
          <div>
            <p className="sds-eyebrow sds-eyebrow--dark">{isEnrollment ? 'REQUEST A PLACE' : 'ASK A QUESTION'}</p>
            <h2 id="training-request-title">{isEnrollment ? 'Enrolment request' : 'Training enquiry'}</h2>
            <p>{program.title}</p>
          </div>
          <button type="button" className="sds-training-dialog__close" onClick={onClose} disabled={submitting} aria-label="Close form">
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <form className="sds-training-form" onSubmit={submitRequest}>
          <label><span>Full name</span><input name="name" autoComplete="name" maxLength={120} required value={values.name} onChange={updateValue} /></label>
          <label><span>Email address</span><input name="email" type="email" autoComplete="email" maxLength={254} required value={values.email} onChange={updateValue} /></label>
          <label><span>Phone number</span><input name="phone" type="tel" autoComplete="tel" maxLength={24} required value={values.phone} onChange={updateValue} /></label>
          <label><span>{isEnrollment ? 'Note (optional)' : 'What would you like to know? (optional)'}</span><textarea name="note" rows={3} maxLength={2000} value={values.note} onChange={updateValue} /></label>
          {status.message && <p className={`sds-training-form__status${status.type === 'error' ? ' is-error' : ''}`} role={status.type === 'error' ? 'alert' : 'status'}>{status.type === 'error' && <AlertCircle size={16} aria-hidden="true" />}{status.message}</p>}
          {status.type === 'success' ? (
            <button type="button" className="sds-button sds-button--green" onClick={onClose}>Done</button>
          ) : (
            <button type="submit" className="sds-button sds-button--green" disabled={submitting}>
              {submitting ? <Loader2 className="sds-training-spin" size={17} /> : <Send size={16} aria-hidden="true" />}
              {submitting ? 'Sending…' : isEnrollment ? 'Send enrolment request' : 'Send enquiry'}
            </button>
          )}
        </form>
      </section>
    </div>
  );
}

function TrainingCard({ program, onRequest }) {
  const startDate = formatDate(program.startDate);
  const endDate = formatDate(program.endDate);
  const dateLabel = startDate && endDate && startDate !== endDate ? `${startDate} – ${endDate}` : startDate || 'Date to be announced';

  return (
    <article className="sds-training-card">
      <div className="sds-training-card__top">
        <span className="sds-training-card__tag">TRAINING PROGRAMME</span>
        <span className="sds-training-card__delivery">{deliveryLabels[program.deliveryMode] || 'Training'}</span>
      </div>
      <h2>{program.title}</h2>
      <p className="sds-training-card__description">{program.description}</p>
      <dl className="sds-training-card__details">
        <div><dt><CalendarDays size={15} aria-hidden="true" /> Dates</dt><dd>{dateLabel}</dd></div>
        {program.schedule && <div><dt><Clock3 size={15} aria-hidden="true" /> Schedule</dt><dd>{program.schedule}</dd></div>}
        {program.location && <div><dt><MapPin size={15} aria-hidden="true" /> Location</dt><dd>{program.location}</dd></div>}
        <div><dt><Wallet size={15} aria-hidden="true" /> Fee</dt><dd>{program.fee || 'Contact us for details'}</dd></div>
      </dl>
      <div className="sds-training-card__actions">
        <button type="button" className="sds-button sds-training-card__button--outline" onClick={() => onRequest(program, 'enquiry')}>Enquire <ArrowRight size={16} aria-hidden="true" /></button>
        <button type="button" className="sds-button sds-button--green" onClick={() => onRequest(program, 'enrollment')}>Enroll <ArrowRight size={16} aria-hidden="true" /></button>
      </div>
    </article>
  );
}

export default function TrainingPage() {
  const [state, setState] = useState({ status: 'loading', programs: [], error: '' });
  const [request, setRequest] = useState(null);

  useEffect(() => {
    if (!db) {
      setState({ status: 'error', programs: [], error: 'Training announcements are temporarily unavailable. Please try again later.' });
      return undefined;
    }

    return onSnapshot(
      query(collection(db, 'trainingAnnouncements'), where('published', '==', true)),
      (snapshot) => {
        const programs = snapshot.docs
          .map((item) => ({ ...item.data(), id: item.id }))
          .sort((a, b) => String(a.startDate || '').localeCompare(String(b.startDate || '')));
        setState({ status: programs.length ? 'ready' : 'empty', programs, error: '' });
      },
      (error) => {
        console.error('Failed to load training announcements:', error);
        setState({ status: 'error', programs: [], error: 'Training announcements could not be loaded. Please try again later.' });
      },
    );
  }, []);

  return (
    <div className="sds-training-page">
      <section className="sds-training-hero">
        <div className="sds-container">
          <p className="sds-eyebrow">LEARN WITH SPENFEL</p>
          <h1>Practical skills.<br /><em>Real-world impact.</em></h1>
          <p>Explore our upcoming training programmes, ask a question, or request a place. Our team will follow up to confirm the details.</p>
        </div>
      </section>
      <section className="sds-training-list sds-container" aria-labelledby="training-list-title">
        <div className="sds-training-list__heading">
          <div><p className="sds-eyebrow sds-eyebrow--dark">UPCOMING OPPORTUNITIES</p><h2 id="training-list-title">Training announcements</h2></div>
          <span>{state.status === 'ready' ? `${state.programs.length} ${state.programs.length === 1 ? 'programme' : 'programmes'}` : ''}</span>
        </div>
        {state.status === 'loading' && <div className="sds-training-state" role="status"><Loader2 className="sds-training-spin" size={20} />Loading training programmes…</div>}
        {state.status === 'error' && <div className="sds-training-state sds-training-state--error" role="alert"><AlertCircle size={19} />{state.error}</div>}
        {state.status === 'empty' && <div className="sds-training-state"><Monitor size={25} /><strong>No programmes announced yet</strong><span>New training opportunities will be published here. Check back soon.</span></div>}
        {state.status === 'ready' && <div className="sds-training-grid">{state.programs.map((program) => <TrainingCard key={program.id} program={program} onRequest={(selectedProgram, type) => setRequest({ program: selectedProgram, type })} />)}</div>}
      </section>
      {request && <TrainingRequestDialog program={request.program} type={request.type} onClose={() => setRequest(null)} />}
    </div>
  );
}
