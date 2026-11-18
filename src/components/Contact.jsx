import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { AlertCircle, ArrowUpRight, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { db } from '../firebase';

export function FloatingWhatsApp() {
  return (
    <a
      className="sds-whatsapp-float"
      href="https://wa.me/265997473256"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <FaWhatsapp size={29} aria-hidden="true" />
    </a>
  );
}

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: 'error', text: 'Please complete each field before sending your message.' });
      return;
    }

    if (!db) {
      setStatus({ type: 'error', text: 'Messages are temporarily unavailable. Please email our team directly.' });
      return;
    }

    setSubmitting(true);
    setStatus({ type: '', text: '' });
    try {
      await addDoc(collection(db, 'messages'), {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        createdAt: serverTimestamp(),
      });
      setForm({ name: '', email: '', message: '' });
      setStatus({ type: 'success', text: 'Your message has been sent. We’ll be in touch soon.' });
    } catch (error) {
      console.error('Failed to save contact message:', error);
      setStatus({ type: 'error', text: 'We could not send your message. Please try again or email our team directly.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  return (
    <section id="contact" className="sds-contact">
      <div className="sds-contact__glow" aria-hidden="true" />
      <div className="sds-container sds-contact__inner">
        <div className="sds-contact__copy">
          <p className="sds-eyebrow">Start a conversation</p>
          <h2>Have a challenge<br />worth <em>solving?</em></h2>
          <p>Let&apos;s turn your ideas into practical digital solutions.</p>
          <div className="sds-contact__details">
            <h3>Contact details</h3>
            <div className="sds-contact__details-list">
              <a href="tel:+265997473256" className="sds-contact__card">
                <span className="sds-contact__icon"><Phone size={18} aria-hidden="true" /></span>
                <span><small>Call our team</small><strong>+265997473256</strong></span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a href="https://wa.me/265997473256" target="_blank" rel="noopener noreferrer" className="sds-contact__card">
                <span className="sds-contact__icon"><MessageCircle size={18} aria-hidden="true" /></span>
                <span><small>WhatsApp</small><strong>+265997473256</strong></span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a href="mailto:support@spenfeldigtal.com" className="sds-contact__card">
                <span className="sds-contact__icon"><Mail size={18} aria-hidden="true" /></span>
                <span><small>Email</small><strong>support@spenfeldigtal.com</strong></span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <div className="sds-contact__card sds-contact__card--location">
                <span className="sds-contact__icon"><MapPin size={18} aria-hidden="true" /></span>
                <span><small>Based in</small><strong>Lilongwe, Malawi</strong></span>
              </div>
            </div>
          </div>
        </div>
        <form className="sds-contact-form" onSubmit={handleSubmit}>
          <h3>Send us a message</h3>
          <label>
            <span>Your name</span>
            <input name="name" type="text" autoComplete="name" maxLength={120} required value={form.name} onChange={handleChange} />
          </label>
          <label>
            <span>Email address</span>
            <input name="email" type="email" autoComplete="email" maxLength={254} required value={form.email} onChange={handleChange} />
          </label>
          <label>
            <span>Message</span>
            <textarea name="message" rows={4} maxLength={5000} required value={form.message} onChange={handleChange} />
          </label>
          {status.text && (
            <p className={`sds-contact-form__status${status.type === 'error' ? ' is-error' : ''}`} role={status.type === 'error' ? 'alert' : 'status'}>
              {status.type === 'error' && <AlertCircle size={16} aria-hidden="true" />}
              {status.text}
            </p>
          )}
          <button type="submit" className="sds-button sds-button--green" disabled={submitting}>
            {submitting ? 'Sending…' : 'Send message'} <Send size={16} aria-hidden="true" />
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
