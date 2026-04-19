import { useEffect, useState } from 'react';

import BottomNav from '@/components/common/BottomNav';
import { DEFAULT_CONTACT_DETAILS } from '@/constants/contact.constants';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import OpnGenBrandMark from '@/logo/OpnGenBrandMark';
import { getContactMeta, readCachedContactMeta, submitInquiry } from '@/services/contact.service';

const ContactPage = () => {
  const [contactMeta, setContactMeta] = useState(() => readCachedContactMeta());
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState({
    loading: false,
    error: '',
    success: '',
  });

  useDocumentTitle('Contact');

  useEffect(() => {
    const loadContactMeta = async () => {
      try {
        const contactResponse = await getContactMeta();
        setContactMeta((current) => ({
          ...current,
          ...(contactResponse?.data?.contact || {}),
        }));
      } catch {
        setContactMeta((current) => current || DEFAULT_CONTACT_DETAILS);
      }
    };

    void loadContactMeta();
  }, []);

  const liveContact = {
    ...DEFAULT_CONTACT_DETAILS,
    ...contactMeta,
  };

  const phoneHref = `tel:${liveContact.phone.replace(/\s+/g, '')}`;
  const whatsappDigits = liveContact.whatsapp.replace(/[^\d]/g, '');
  const whatsappHref = `https://wa.me/${whatsappDigits}`;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormStatus({
      loading: true,
      error: '',
      success: '',
    });

    try {
      const response = await submitInquiry(formState);

      setFormStatus({
        loading: false,
        error: '',
        success: response?.message || 'Inquiry submitted successfully',
      });
      setFormState({
        name: '',
        phone: '',
        email: '',
        message: '',
      });
    } catch (submitError) {
      setFormStatus({
        loading: false,
        error: submitError?.response?.data?.message || 'Unable to submit inquiry right now',
        success: '',
      });
    }
  };

  return (
    <div className="landing-page">
      <section className="hero hero--compact">
        <div className="hero__topbar">
          <OpnGenBrandMark />
        </div>
        <div className="section-heading">
          <span className="section-tag">Contact</span>
          <h2>Let us architect your next digital experience.</h2>
          <p>Share your goals and receive a strategic response with scope, timeline, and clear next steps.</p>
          <div className="contact-highlights">
            <span>Response within 24 hours</span>
            <span>Founder-led communication</span>
            <span>Execution without handoff</span>
          </div>
        </div>
      </section>

      <section className="section-block contact-card contact-card--elevated">
        <div className="contact-card__intro">
          <span className="section-tag">Get in touch</span>
          <h2>Share your project brief</h2>
          <p>We review every submission personally and reply with a practical, business-ready action plan.</p>
          <div className="contact-meta">
            <p className="contact-meta__row">
              <span className="contact-meta__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
                  <path d="M4.5 7.5L12 13l7.5-5.5" />
                </svg>
              </span>
              <strong>Email:</strong>
              <a className="contact-meta__link" href={`mailto:${liveContact.email}`}>
                {liveContact.email}
              </a>
            </p>
            <p className="contact-meta__row">
              <span className="contact-meta__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15.5 14.5l-2 2a2 2 0 0 1-2.7.1 20.2 20.2 0 0 1-3.4-3.4 2 2 0 0 1 .1-2.7l2-2a1.8 1.8 0 0 0 .4-1.8l-.8-2.4A1.8 1.8 0 0 0 7.4 3H4.9A1.9 1.9 0 0 0 3 4.9c0 8.3 6.8 15.1 15.1 15.1a1.9 1.9 0 0 0 1.9-1.9v-2.5a1.8 1.8 0 0 0-1.3-1.7l-2.4-.8a1.8 1.8 0 0 0-1.8.4Z" />
                </svg>
              </span>
              <strong>Phone:</strong>
              <a className="contact-meta__link" href={phoneHref}>
                {liveContact.phone}
              </a>
            </p>
            <p className="contact-meta__row">
              <span className="contact-meta__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.5 11.4c0 4.7-3.8 8.5-8.5 8.5a8.3 8.3 0 0 1-4-.9L3.5 20.5l1.5-4.3a8.3 8.3 0 0 1-1.1-4.2c0-4.7 3.8-8.5 8.5-8.5s8.1 3.3 8.1 7.9Z" />
                  <path d="M9.1 9.3c.3-.7 1.2-.7 1.5 0 .3.9 1 1.6 1.9 1.9.7.3.7 1.2 0 1.5-.9.3-1.6 1-1.9 1.9-.3.7-1.2.7-1.5 0-.3-.9-1-1.6-1.9-1.9-.7-.3-.7-1.2 0-1.5.9-.3 1.6-1 1.9-1.9Z" />
                </svg>
              </span>
              <strong>WhatsApp:</strong>
              <a className="contact-meta__link" href={whatsappHref} target="_blank" rel="noreferrer">
                {liveContact.whatsapp}
              </a>
            </p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label className="form-field">
            <span>Name</span>
            <input name="name" type="text" value={formState.name} onChange={handleChange} placeholder="Your name" />
          </label>

          <label className="form-field">
            <span>Phone</span>
            <input name="phone" type="tel" value={formState.phone} onChange={handleChange} placeholder="Your phone number" />
          </label>

          <label className="form-field form-field--full">
            <span>Email</span>
            <input name="email" type="email" value={formState.email} onChange={handleChange} placeholder="you@example.com" />
          </label>

          <label className="form-field form-field--full">
            <span>Message</span>
            <textarea
              name="message"
              rows="5"
              value={formState.message}
              onChange={handleChange}
              placeholder="Tell us about your business, project, and what you want to build"
            />
          </label>

          <div className="contact-form__actions">
            <button className="button button--primary" type="submit" disabled={formStatus.loading}>
              {formStatus.loading ? 'Sending...' : 'Send Brief'}
            </button>
            <a className="button button--secondary" href={`mailto:${liveContact.email}?subject=Project%20Inquiry`}>
              Prefer Email
            </a>
          </div>

          {formStatus.success ? <p className="form-message form-message--success">{formStatus.success}</p> : null}
          {formStatus.error ? <p className="form-message form-message--error">{formStatus.error}</p> : null}
        </form>
      </section>

      <BottomNav />
    </div>
  );
};

export default ContactPage;
