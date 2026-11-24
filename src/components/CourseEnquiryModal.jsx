import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { AlertCircle, CheckCircle2, Loader2, MessageCircle, Send, X } from 'lucide-react';
import { db } from '../firebase';

export default function CourseEnquiryModal({ course, isOpen, onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    deliveryMode: course?.deliveryMode || 'Blended',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });

  if (!isOpen || !course) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const getWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hello SpenFel Skills Lab, my name is ${form.name || 'a prospective learner'}. I would like to enquire about the "${course.title}" course (${course.level} Level, ${course.courseFormat || 'Training'}). Preferred mode: ${form.deliveryMode}.`
    );
    return `https://wa.me/265997473256?text=${text}`;
  };

  const getEmailFallbackUrl = () => {
    const subject = encodeURIComponent(`Skills Lab Enquiry: ${course.title} - ${form.name}`);
    const body = encodeURIComponent(
      `Course: ${course.title}\nCategory: ${course.categoryId}\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nOrganisation: ${form.organization || 'Individual'}\nPreferred Mode: ${form.deliveryMode}\n\nMessage:\n${form.message || 'No additional note'}`
    );
    return `mailto:support@spenfeldigtal.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setStatus({ type: 'error', text: 'Please provide your full name, email address, and phone number.' });
      return;
    }

    setSubmitting(true);
    setStatus({ type: '', text: '' });

    try {
      if (db) {
        await addDoc(collection(db, 'courseEnquiries'), {
          courseId: course.id || course.slug,
          courseTitle: course.title,
          courseSlug: course.slug,
          category: course.categoryId,
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          organization: form.organization.trim() || 'Individual',
          deliveryMode: form.deliveryMode,
          message: form.message.trim(),
          createdAt: serverTimestamp(),
        });

        // Also record in messages collection for backwards compatibility with admin desk
        try {
          await addDoc(collection(db, 'messages'), {
            name: `${form.name.trim()} (Skills Lab: ${course.title})`.slice(0, 120),
            email: form.email.trim(),
            message: `[COURSE ENQUIRY]\nCourse: ${course.title}\nLevel: ${course.level}\nPhone: ${form.phone.trim()}\nOrganisation: ${form.organization.trim() || 'None'}\nDelivery: ${form.deliveryMode}\n\nNotes:\n${form.message.trim() || 'None'}`.slice(0, 5000),
            createdAt: serverTimestamp(),
          });
        } catch (_) {
          // Non-blocking
        }
      }

      setStatus({
        type: 'success',
        text: 'Thank you for your enquiry! Our training admissions team will contact you within 24 hours with details on schedules and enrolment.',
      });
    } catch (err) {
      console.error('Failed to submit course enquiry:', err);
      // Fallback
      window.location.href = getEmailFallbackUrl();
      setStatus({
        type: 'success',
        text: 'Opening your email client to send your enquiry directly to support@spenfeldigtal.com...',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="sds-training-dialog-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !submitting) onClose();
      }}
    >
      <section
        className="sds-training-dialog sds-skills-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="course-enquiry-title"
      >
        <div className="sds-training-dialog__heading sds-skills-dialog__heading">
          <div>
            <p className="sds-eyebrow sds-eyebrow--skills">SPENFEL DIGITAL SKILLS LAB</p>
            <h2 id="course-enquiry-title">Enquire About Course</h2>
            <p className="sds-skills-dialog__prog">{course.title}</p>
          </div>
          <button
            type="button"
            className="sds-training-dialog__close"
            onClick={onClose}
            disabled={submitting}
            aria-label="Close dialogue"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {status.type === 'success' ? (
          <div className="sds-course-enquiry-success" style={{ padding: '24px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#059669', marginBottom: '16px' }}>
              <CheckCircle2 size={24} />
              <strong style={{ fontSize: '15px' }}>Enquiry Received Successfully!</strong>
            </div>
            <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
              {status.text}
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="sds-button sds-button--stem"
                style={{ background: '#16a34a' }}
              >
                <MessageCircle size={16} /> Continue on WhatsApp
              </a>
              <button type="button" className="sds-button sds-button--skills" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        ) : (
          <form className="sds-training-form" onSubmit={handleSubmit}>
            <div style={{ padding: '8px 12px', background: '#f0f9ff', borderRadius: '4px', border: '1px solid #bae6fd', fontSize: '12px', color: '#0369a1', marginBottom: '14px' }}>
              <strong>Course:</strong> {course.title} &bull; <strong>Level:</strong> {course.level} &bull; <strong>Format:</strong> {course.courseFormat || 'Professional Course'}
            </div>

            <label>
              <span>Full name *</span>
              <input
                name="name"
                autoComplete="name"
                maxLength={120}
                required
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Chimwemwe Banda"
              />
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
              <label>
                <span>Email address *</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="e.g. chimwemwe@example.com"
                />
              </label>

              <label>
                <span>Phone number (WhatsApp) *</span>
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  maxLength={24}
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="e.g. +265 997 473 256"
                />
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
              <label>
                <span>Organisation / Employer (optional)</span>
                <input
                  name="organization"
                  maxLength={140}
                  value={form.organization}
                  onChange={handleChange}
                  placeholder="e.g. Ministry / NGO / Self-sponsored"
                />
              </label>

              <label>
                <span>Preferred delivery mode</span>
                <select
                  name="deliveryMode"
                  value={form.deliveryMode}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '4px',
                    border: '1px solid #cbd5e1',
                    background: '#fff',
                    color: '#0f172a',
                    fontSize: '13px',
                  }}
                >
                  <option value="Blended">Blended (Lab + Online)</option>
                  <option value="Physical">Physical (In-Person Lab)</option>
                  <option value="Online">Online Classroom</option>
                  <option value="Corporate Training">Corporate On-Site Training</option>
                </select>
              </label>
            </div>

            <label>
              <span>Questions or notes (optional)</span>
              <textarea
                name="message"
                rows={3}
                maxLength={2000}
                value={form.message}
                onChange={handleChange}
                placeholder="Ask about start dates, prerequisites, group training discounts, or custom curriculum..."
              />
            </label>

            {status.text && status.type === 'error' && (
              <p className="sds-training-form__status is-error" role="alert">
                <AlertCircle size={16} aria-hidden="true" />
                {status.text}
              </p>
            )}

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '6px' }}>
              <button
                type="submit"
                className="sds-button sds-button--skills"
                disabled={submitting}
                style={{ flex: '1 1 auto', minWidth: '180px' }}
              >
                {submitting ? <Loader2 className="sds-training-spin" size={17} /> : <Send size={16} />}
                {submitting ? 'Submitting Enquiry…' : 'Submit Course Enquiry'}
              </button>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="sds-button sds-button--skills-outline"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '7px' }}
              >
                <MessageCircle size={16} style={{ color: '#25d366' }} /> WhatsApp Enquiry
              </a>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
