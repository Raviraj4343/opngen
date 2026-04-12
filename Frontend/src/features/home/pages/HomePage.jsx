import { useEffect, useState } from 'react';

import StatusCard from '@/components/common/StatusCard';
import PageLoader from '@/components/feedback/PageLoader';
import { APP_DESCRIPTION } from '@/constants/app.constants';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import akashPhoto from '@/logo/Akash.jpeg';
import OpenGenBrandMark from '@/logo/OpenGenBrandMark';
import raviPhoto from '@/logo/Ravi Raj.jpeg';
import { getContactMeta, submitInquiry } from '@/services/contact.service';
import { getBackendHealth } from '@/services/health.service';

const HomePage = () => {
  const [health, setHealth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
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

  useDocumentTitle('We Build Websites & Apps');

  useEffect(() => {
    const loadPageData = async () => {
      try {
        const [healthResponse, contactResponse] = await Promise.all([getBackendHealth(), getContactMeta()]);
        setHealth(healthResponse);
        setContactMeta(contactResponse?.data?.contact || null);
      } catch (requestError) {
        setError(requestError?.response?.data?.message || 'Unable to reach backend');
      } finally {
        setIsLoading(false);
      }
    };

    void loadPageData();
  }, []);

  const backendStatus = error ? 'Online build team, backend check pending' : health?.message || 'Systems ready';
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
      <section className="hero">
        <div className="hero__topbar">
          <OpenGenBrandMark />
          <div className="hero__actions">
            <a className="button button--ghost" href="#services">
              What We Build
            </a>
            <a className="button button--primary" href="#contact">
              Get a Website
            </a>
          </div>
        </div>

        <div className="hero__body">
          <div className="hero__content">
            <p className="hero__kicker">Small team. Sharp builds. Real business impact.</p>
            <h1>We build modern websites and apps for your business.</h1>
            <p>{APP_DESCRIPTION}</p>

            <div className="hero__cta-group">
              <a className="button button--primary" href="#contact">
                Contact Us
              </a>
              <a className="button button--secondary" href="#work-flow">
                See How We Work
              </a>
            </div>

            <ul className="hero__points">
              <li>Built for local businesses, coaching centers, gyms, cafes, and small startups.</li>
              <li>Clear communication, practical timelines, and polished final delivery.</li>
              <li>We focus on websites that help you look trustworthy and generate leads.</li>
            </ul>

            <div className="hero__mini-proof">
              <span>Local-business friendly</span>
              <span>Startup-ready execution</span>
              <span>Built to convert visitors into clients</span>
            </div>
          </div>

          <div className="hero__panel">
            <h2>Why OpenGen feels different</h2>
            <div className="status-grid">
              <StatusCard label="Service" value="Business websites and web apps" tone="success" />
              <StatusCard label="Approach" value="Small team. Fast collaboration. Personal attention." />
              <StatusCard label="Delivery" value="Modern UI, clean code, production-ready setup" tone="success" />
            </div>

            <div className="hero__signal">
              {isLoading ? (
                <PageLoader label="Checking project systems..." />
              ) : (
                <p>
                  <strong>Build status:</strong> {backendStatus}
                </p>
              )}
              {error ? <p className="hero__error">Backend is not reachable right now, but the site is ready.</p> : null}
            </div>
          </div>
        </div>
      </section>

      <section className="section-grid" id="services">
        <article className="info-card">
          <span className="section-tag">Services</span>
          <h2>Clear service packages for businesses that need a strong digital presence.</h2>
          <p>
            OpenGen offers focused digital services for businesses that want better design, better
            credibility, and better customer conversion online.
          </p>
        </article>

        <article className="info-card">
          <span className="section-tag">What you get</span>
          <p>
            Whether you need a brand-new website, a custom app, cleaner product design, or ongoing
            support, OpenGen can step in with the right build package.
          </p>
        </article>
      </section>

      <section className="services-grid">
        <article className="service-card">
          <span className="service-card__index">01</span>
          <h3>Website Development</h3>
          <p>
            Professional business websites, landing pages, and responsive company sites built to
            improve trust and bring in more leads.
          </p>
        </article>

        <article className="service-card">
          <span className="service-card__index">02</span>
          <h3>App Development</h3>
          <p>
            Custom web apps, dashboards, and business tools for teams that need something more than
            a basic website.
          </p>
        </article>

        <article className="service-card">
          <span className="service-card__index">03</span>
          <h3>UI/UX Design</h3>
          <p>
            Clean, modern interfaces and user flows that make your brand look premium and your product
            easier to use.
          </p>
        </article>

        <article className="service-card">
          <span className="service-card__index">04</span>
          <h3>Maintenance</h3>
          <p>
            Ongoing updates, improvements, fixes, and support so your digital presence stays polished,
            secure, and reliable.
          </p>
        </article>
      </section>

      <section className="trust-band">
        <div className="trust-band__item">
          <span className="section-tag">Trust</span>
          <p>You work directly with the builders, so decisions move faster and communication stays clear.</p>
        </div>
        <div className="trust-band__item">
          <span className="section-tag">Clarity</span>
          <p>We keep the process simple, practical, and easy to understand even if tech is not your world.</p>
        </div>
        <div className="trust-band__item">
          <span className="section-tag">Quality</span>
          <p>Modern design, stable architecture, and production-minded development from day one.</p>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="section-heading">
          <span className="section-tag">About us</span>
          <h2>Students and developers building OpenGen to help businesses earn trust online.</h2>
          <p>
            OpenGen was started to give local businesses and small startups access to modern websites
            and apps that feel credible, clear, and ready for real growth.
          </p>
        </div>

        <div className="about-grid">
          <article className="about-story">
            <h3>Who we are</h3>
            <p>
              We are a small team of students, developers, and problem-solvers who care about practical
              work, clean execution, and helping businesses present themselves professionally online.
            </p>
            <p>
              Instead of sounding like a large agency, OpenGen works closely with clients and keeps the
              process direct, collaborative, and easy to follow.
            </p>
          </article>

          <article className="about-story">
            <h3>Why we started OpenGen</h3>
            <p>
              We noticed that many great businesses still lose trust because their digital presence feels
              outdated or incomplete. OpenGen was created to fix that with modern design, solid development,
              and work that actually supports leads and growth.
            </p>
            <p>
              Our mission is simple: build websites and apps that make businesses look trustworthy and
              help them move forward with confidence.
            </p>
          </article>
        </div>

        <div className="team-grid">
          <article className="team-card">
            <img className="team-card__image" src={raviPhoto} alt="Ravi, founder and developer at OpenGen" />
            <div className="team-card__content">
              <span className="section-tag">Founder</span>
              <h3>Ravi</h3>
              <p className="team-card__role">Founder + Developer</p>
              <p>
                Ravi leads development at OpenGen and focuses on building polished, production-ready
                websites and web apps for client projects.
              </p>
            </div>
          </article>

          <article className="team-card">
            <img className="team-card__image" src={akashPhoto} alt="Akash, co-founder and marketing lead at OpenGen" />
            <div className="team-card__content">
              <span className="section-tag">Co-Founder</span>
              <h3>Akash</h3>
              <p className="team-card__role">Co-Founder + Marketing</p>
              <p>
                Akash drives the marketing side of OpenGen, helping shape communication, positioning,
                and how each project connects with real customers.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="process-section" id="work-flow">
        <div className="section-heading">
          <span className="section-tag">How we work</span>
          <h2>A straightforward process from idea to delivery.</h2>
        </div>

        <div className="process-grid">
          <article className="process-card">
            <span className="process-card__step">01</span>
            <h3>Understand the business</h3>
            <p>We learn what you do, who you serve, and what your website or app needs to achieve.</p>
          </article>
          <article className="process-card">
            <span className="process-card__step">02</span>
            <h3>Design and build</h3>
            <p>We create a clean, modern experience that fits your brand and supports your goals.</p>
          </article>
          <article className="process-card">
            <span className="process-card__step">03</span>
            <h3>Launch and support</h3>
            <p>We deliver a usable final product and help you move confidently into the next stage.</p>
          </article>
        </div>
      </section>

      <section className="contact-card" id="contact">
        <div className="contact-card__intro">
          <span className="section-tag">Start a project</span>
          <h2>Send us your project inquiry.</h2>
          <p>
            This is the main way to reach OpenGen. Tell us what you need, and we will get back to you
            with the right next step for your business.
          </p>
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

          <label className="form-field">
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
              {formStatus.loading ? 'Sending...' : 'Send Inquiry'}
            </button>
            <a className="button button--secondary" href={`mailto:${liveContact.email}?subject=Project%20Inquiry`}>
              Email Instead
            </a>
          </div>

          {formStatus.success ? <p className="form-message form-message--success">{formStatus.success}</p> : null}
          {formStatus.error ? <p className="form-message form-message--error">{formStatus.error}</p> : null}
        </form>
      </section>
    </div>
  );
};

export default HomePage;
