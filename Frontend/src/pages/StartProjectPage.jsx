import { useEffect, useState } from 'react';

import BottomNav from '@/components/common/BottomNav';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import OpenGenBrandMark from '@/logo/OpenGenBrandMark';
import { getContactMeta, submitInquiry } from '@/services/contact.service';

const ContactPage = () => {
  const [contactMeta, setContactMeta] = useState(null);
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
        setContactMeta(contactResponse?.data?.contact || null);
      } catch {
        setContactMeta(null);
      }
    };

    void loadContactMeta();
  }, []);

  const liveContact = contactMeta || {
    email: 'hello@opengen.in',
    phone: '+91 00000 00000',
    whatsapp: '+91 00000 00000',
  };

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
          <OpenGenBrandMark />
        </div>
        <div className="section-heading">
          <span className="section-tag">Contact</span>
          <h2>Let us discuss your website or app.</h2>
          <p>Share your requirement and get a practical response with scope, timeline, and next steps.</p>
          <div className="contact-highlights">
            <span>Response within 24 hours</span>
            <span>Direct founder communication</span>
            <span>No agency handoff</span>
          </div>
        </div>
      </section>

      <section className="section-block contact-card contact-card--elevated">
        <div className="contact-card__intro">
          <span className="section-tag">Get in touch</span>
          <h2>Send your project details</h2>
          <p>We reply by email after reviewing your message. Include your goal and expected timeline.</p>
          <div className="contact-meta">
            <p>
              <strong>Email:</strong> {liveContact.email}
            </p>
            <p>
              <strong>Phone:</strong> {liveContact.phone}
            </p>
            <p>
              <strong>WhatsApp:</strong> {liveContact.whatsapp}
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
              {formStatus.loading ? 'Sending...' : 'Send Message'}
            </button>
            <a className="button button--secondary" href={`mailto:${liveContact.email}?subject=Project%20Inquiry`}>
              Email Instead
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
