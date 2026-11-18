import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, firebaseConfigured } from '../firebase';

const emptyForm = { name: '', phone: '', email: '' };

const NewsletterModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState(emptyForm);
  const [submission, setSubmission] = useState({ status: 'idle', message: '' });
  const firstFieldRef = useRef(null);
  const doneButtonRef = useRef(null);
  const previousFocusRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (isOpen && submission.status === 'success') doneButtonRef.current?.focus();
  }, [isOpen, submission.status]);

  useEffect(() => {
    if (!isOpen) return undefined;
    previousFocusRef.current = document.activeElement;
    const focusTimer = window.setTimeout(() => firstFieldRef.current?.focus(), 0);
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const dialog = document.getElementById('newsletter-signup-dialog');
      const focusable = dialog?.querySelectorAll('button:not([disabled]), input:not([disabled]), a[href]');
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
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus?.();
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submission.status === 'submitting') return;
    const subscription = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
    };
    if (!subscription.name || !/[0-9]/.test(subscription.phone)) {
      setSubmission({
        status: 'error',
        message: 'Enter your name and a phone number that includes at least one digit.',
      });
      return;
    }
    if (!firebaseConfigured || !db) {
      setSubmission({
        status: 'error',
        message: 'Subscriptions are temporarily unavailable. Please try again later.',
      });
      return;
    }

    setSubmission({ status: 'submitting', message: '' });
    try {
      await addDoc(collection(db, 'subscriptions'), {
        ...subscription,
        createdAt: serverTimestamp(),
      });
      setSubmission({
        status: 'success',
        message: 'You’re subscribed. Your details were saved successfully.',
      });
    } catch (error) {
      setSubmission({
        status: 'error',
        message: error?.code === 'permission-denied'
          ? 'Subscriptions are temporarily unavailable due to a Firebase permissions issue. Please try again later.'
          : error?.code === 'unavailable' || error?.code === 'network-request-failed'
            ? 'We couldn’t reach the subscription service. Check your connection and try again.'
            : 'We couldn’t save your subscription. Please try again later.',
      });
    }
  };

  const handleClose = () => {
    setSubmission({ status: 'idle', message: '' });
    setFormData(emptyForm);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            className="sds-modal__backdrop"
            aria-label="Close newsletter signup"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
          />
          <div className="sds-modal__position">
            <motion.div
              id="newsletter-signup-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="newsletter-signup-title"
              className="sds-modal sds-newsletter-modal"
              initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: 8, scale: 0.99 }}
            >
              <button type="button" className="sds-modal__close" aria-label="Close dialog" onClick={handleClose}>
                <X size={20} aria-hidden="true" />
              </button>
              <p className="sds-eyebrow sds-eyebrow--dark">SDS briefing</p>
              <h2 id="newsletter-signup-title">Keep up with what&apos;s next.</h2>
              <p className="sds-modal__intro">Leave your details to request occasional news and updates from SpenFel Digital Systems.</p>

              {submission.message && (
                <p className={`sds-modal__handoff${submission.status === 'error' ? ' is-error' : ''}`} role={submission.status === 'error' ? 'alert' : 'status'}>
                  {submission.message}
                </p>
              )}

              {submission.status !== 'success' ? (
                <form className="sds-form sds-newsletter-form" onSubmit={handleSubmit}>
                  <fieldset disabled={submission.status === 'submitting'}>
                  <div className="sds-form__row">
                    <label>
                      <span>Name <i aria-hidden="true">*</i></span>
                      <input ref={firstFieldRef} name="name" autoComplete="name" required maxLength={120} value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} />
                    </label>
                    <label>
                      <span>Email <i aria-hidden="true">*</i></span>
                      <input type="email" name="email" autoComplete="email" required maxLength={254} value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} />
                    </label>
                  </div>
                  <label>
                    <span>Phone <i aria-hidden="true">*</i></span>
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      inputMode="tel"
                      pattern="[0-9+().\s-]{7,24}"
                      title="Enter a phone number using 7 to 24 digits, spaces, or common phone punctuation."
                      required
                      maxLength={24}
                      value={formData.phone}
                      onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                    />
                  </label>
                  <button className="sds-button sds-button--green sds-form__submit" type="submit" disabled={submission.status === 'submitting'}>
                    {submission.status === 'submitting' ? 'Saving subscription…' : 'Subscribe to updates'}
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </button>
                  <p className="sds-form__note">Your details are stored securely for the SpenFel Digital Systems newsletter.</p>
                  </fieldset>
                </form>
              ) : (
                <button ref={doneButtonRef} type="button" className="sds-button sds-button--green sds-form__submit" onClick={handleClose}>
                  Done <ArrowUpRight size={17} aria-hidden="true" />
                </button>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NewsletterModal;
