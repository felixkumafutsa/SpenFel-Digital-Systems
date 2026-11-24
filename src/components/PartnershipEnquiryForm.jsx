import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { AlertCircle, ArrowUpRight, CheckCircle2, Loader2, Mail, MessageCircle, Send } from 'lucide-react';
import { db } from '../firebase';

const orgTypes = [
  'Private School',
  'Public Education Institution',
  'NGO / Development Organisation',
  'Corporate Organisation / CSR',
  'Community Organisation',
  'Other Educational Institution',
];

const malawiDistricts = [
  'Lilongwe',
  'Blantyre',
  'Zomba',
  'Mzuzu',
  'Kasungu',
  'Mangochi',
  'Salima',
  'Dedza',
  'Mzimba',
  'Balaka',
  'Thyolo',
  'Mulanje',
  'Other / Outside Malawi',
];

const partnershipTypes = [
  'School-Based STEM Club',
  'After-School Technology Programme',
  'STEM Laboratory Setup & Management',
  'STEM Workshops & Holiday Bootcamps',
  'Teacher Training & Capacity Development',
  'Sponsored Community STEM Programme',
  'Corporate Sponsorship / CSR Initiative',
  'Digital Skills Lab Institutional Training',
  'Custom Software / School Management System',
  'General Institutional Collaboration',
];

const learnerRanges = [
  'Under 25 learners',
  '25 – 50 learners',
  '51 – 100 learners',
  '101 – 250 learners',
  '250+ learners',
  'Not applicable / Advisory',
];

const initialFormState = {
  orgName: '',
  contactName: '',
  email: '',
  phone: '',
  orgType: '',
  district: '',
  partnershipType: '',
  beneficiaries: '',
  message: '',
};

export default function PartnershipEnquiryForm({ defaultPartnershipType = '', source = 'partnerships-page' }) {
  const [form, setForm] = useState({
    ...initialFormState,
    partnershipType: defaultPartnershipType,
  });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const getEmailFallbackUrl = () => {
    const subject = encodeURIComponent(`Institutional Partnership Enquiry: ${form.orgName || 'New Partner'} - ${form.partnershipType || 'STEM Education'}`);
    const body = encodeURIComponent([
      `=== INSTITUTIONAL PARTNERSHIP ENQUIRY ===`,
      `Organisation: ${form.orgName}`,
      `Contact Person: ${form.contactName}`,
      `Organisation Type: ${form.orgType}`,
      `District / Location: ${form.district}`,
      `Partnership Model: ${form.partnershipType}`,
      `Target Beneficiaries: ${form.beneficiaries}`,
      `Phone Number: ${form.phone}`,
      `Email Address: ${form.email}`,
      `Source: ${source}`,
      ``,
      `Project Details & Objectives:`,
      form.message || 'No additional notes provided.',
    ].join('\n'));

    return `mailto:support@spenfeldigtal.com?subject=${subject}&body=${body}`;
  };

  const getWhatsAppFallbackUrl = () => {
    const text = encodeURIComponent(
      `Hello SpenFel team, my name is ${form.contactName || 'a partner'} from ${form.orgName || 'an institution'}. We are interested in discussing an institutional partnership regarding "${form.partnershipType || 'STEM & Robotics programmes'}". Please connect with us.`
    );
    return `https://wa.me/265997473256?text=${text}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.orgName.trim() || !form.contactName.trim() || !form.email.trim() || !form.phone.trim()) {
      setStatus({ type: 'error', text: 'Please fill in all required organisation and contact fields.' });
      return;
    }

    setSubmitting(true);
    setStatus({ type: '', text: '' });

    const summaryMessage = [
      `[INSTITUTIONAL PARTNERSHIP ENQUIRY]`,
      `Organisation: ${form.orgName.trim()}`,
      `Contact Person: ${form.contactName.trim()}`,
      `Organisation Type: ${form.orgType || 'Unspecified'}`,
      `District / Location: ${form.district || 'Unspecified'}`,
      `Partnership Focus: ${form.partnershipType || 'General Collaboration'}`,
      `Target Learners: ${form.beneficiaries || 'Unspecified'}`,
      `Phone: ${form.phone.trim()}`,
      `Email: ${form.email.trim()}`,
      `Page Source: ${source}`,
      ``,
      `Objectives & Additional Notes:`,
      form.message.trim() || 'No additional notes provided.',
    ].join('\n');

    try {
      if (db) {
        await addDoc(collection(db, 'messages'), {
          name: `${form.contactName.trim()} (${form.orgName.trim()})`.slice(0, 120),
          email: form.email.trim(),
          message: summaryMessage.slice(0, 5000),
          createdAt: serverTimestamp(),
        });

        setStatus({
          type: 'success',
          text: 'Thank you for your enquiry. Our institutional partnerships team will review your requirements and reach out within 1 to 2 business days.',
        });
        setForm(initialFormState);
      } else {
        // Fallback when Firestore is offline or unconfigured
        window.location.href = getEmailFallbackUrl();
        setStatus({
          type: 'fallback',
          text: 'Opening your email client to dispatch the enquiry directly to our team.',
        });
      }
    } catch (err) {
      console.error('Failed to submit partnership enquiry:', err);
      setStatus({
        type: 'error',
        text: 'We could not submit automatically through the database. Please click the button below to email or WhatsApp our team directly.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="sds-partnership-form-wrapper" id="partnership-enquiry">
      <div className="sds-partnership-form-card">
        <div className="sds-partnership-form-header">
          <p className="sds-eyebrow sds-eyebrow--dark">Institutional Engagement</p>
          <h3>Request an Institutional Partnership Proposal</h3>
          <p>
            Tell us about your institution and goals. We will prepare a tailored partnership brief, curriculum framework, or technical proposal.
          </p>
        </div>

        {status.type === 'success' ? (
          <div className="sds-partnership-form__success" role="status">
            <CheckCircle2 size={38} className="text-sds-green" aria-hidden="true" />
            <h4>Enquiry Received Successfully</h4>
            <p>{status.text}</p>
            <div className="sds-partnership-form__success-actions">
              <a
                href="https://wa.me/265997473256"
                target="_blank"
                rel="noopener noreferrer"
                className="sds-button sds-button--outline"
              >
                <MessageCircle size={16} aria-hidden="true" /> Quick WhatsApp follow-up
              </a>
              <button
                type="button"
                className="sds-button sds-button--green"
                onClick={() => setStatus({ type: '', text: '' })}
              >
                Submit another enquiry
              </button>
            </div>
          </div>
        ) : (
          <form className="sds-form sds-partnership-form" onSubmit={handleSubmit}>
            <div className="sds-form__row">
              <label>
                <span>Organisation / School name <i aria-hidden="true">*</i></span>
                <input
                  name="orgName"
                  type="text"
                  required
                  maxLength={120}
                  placeholder="e.g. Hillview Academy / Youth Action NGO"
                  value={form.orgName}
                  onChange={handleChange}
                />
              </label>

              <label>
                <span>Contact person&apos;s name <i aria-hidden="true">*</i></span>
                <input
                  name="contactName"
                  type="text"
                  required
                  maxLength={120}
                  placeholder="e.g. Dr. Jane Phiri"
                  value={form.contactName}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="sds-form__row">
              <label>
                <span>Official email address <i aria-hidden="true">*</i></span>
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  placeholder="name@organisation.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </label>

              <label>
                <span>Phone / WhatsApp number <i aria-hidden="true">*</i></span>
                <input
                  name="phone"
                  type="tel"
                  required
                  maxLength={24}
                  placeholder="+265 997 473 256"
                  value={form.phone}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="sds-form__row">
              <label>
                <span>Organisation type <i aria-hidden="true">*</i></span>
                <select
                  name="orgType"
                  required
                  value={form.orgType}
                  onChange={handleChange}
                >
                  <option value="">Select organisation category</option>
                  {orgTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </label>

              <label>
                <span>District / Area in Malawi <i aria-hidden="true">*</i></span>
                <select
                  name="district"
                  required
                  value={form.district}
                  onChange={handleChange}
                >
                  <option value="">Select district</option>
                  {malawiDistricts.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="sds-form__row">
              <label>
                <span>Partnership model considered <i aria-hidden="true">*</i></span>
                <select
                  name="partnershipType"
                  required
                  value={form.partnershipType}
                  onChange={handleChange}
                >
                  <option value="">Select model</option>
                  {partnershipTypes.map((pt) => (
                    <option key={pt} value={pt}>{pt}</option>
                  ))}
                </select>
              </label>

              <label>
                <span>Estimated learners / beneficiaries</span>
                <select
                  name="beneficiaries"
                  value={form.beneficiaries}
                  onChange={handleChange}
                >
                  <option value="">Select cohort size</option>
                  {learnerRanges.map((lr) => (
                    <option key={lr} value={lr}>{lr}</option>
                  ))}
                </select>
              </label>
            </div>

            <label>
              <span>Project scope, objectives or specific requirements</span>
              <textarea
                name="message"
                rows={4}
                maxLength={4000}
                placeholder="Share your institution's timeline, student ages, existing computer lab facilities, or questions you would like us to address in our proposal."
                value={form.message}
                onChange={handleChange}
              />
            </label>

            {status.text && (
              <div
                className={`sds-form__status-banner${status.type === 'error' ? ' is-error' : ''}`}
                role={status.type === 'error' ? 'alert' : 'status'}
              >
                {status.type === 'error' && <AlertCircle size={18} aria-hidden="true" />}
                <p>{status.text}</p>
              </div>
            )}

            {status.type === 'error' && (
              <div className="sds-form__fallback-actions">
                <a
                  href={getEmailFallbackUrl()}
                  className="sds-button sds-button--outline"
                >
                  <Mail size={16} aria-hidden="true" /> Open prefilled email
                </a>
                <a
                  href={getWhatsAppFallbackUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sds-button sds-button--green"
                >
                  <MessageCircle size={16} aria-hidden="true" /> Message on WhatsApp (+265 997 473 256)
                </a>
              </div>
            )}

            <div className="sds-partnership-form__footer">
              <button
                type="submit"
                className="sds-button sds-button--green sds-partnership-form__submit"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="sds-spin" aria-hidden="true" />
                    Submitting proposal request…
                  </>
                ) : (
                  <>
                    Send partnership enquiry <Send size={16} aria-hidden="true" />
                  </>
                )}
              </button>

              <p className="sds-form__note">
                Direct inquiries welcome via WhatsApp: <strong>+265 997 473 256</strong> or email <strong>support@spenfeldigtal.com</strong>.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
