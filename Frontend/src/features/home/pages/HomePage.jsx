import { useEffect, useState } from 'react';

import StatusCard from '@/components/common/StatusCard';
import PageLoader from '@/components/feedback/PageLoader';
import { APP_DESCRIPTION } from '@/constants/app.constants';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import OpenGenBrandMark from '@/logo/OpenGenBrandMark';
import { getBackendHealth } from '@/services/health.service';

const HomePage = () => {
  const [health, setHealth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useDocumentTitle('We Build Websites & Apps');

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const response = await getBackendHealth();
        setHealth(response);
      } catch (requestError) {
        setError(requestError?.response?.data?.message || 'Unable to reach backend');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchHealth();
  }, []);

  const backendStatus = error ? 'Online build team, backend check pending' : health?.message || 'Systems ready';

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
          <span className="section-tag">What we do</span>
          <h2>Digital presence that feels premium and works hard for your brand.</h2>
          <p>
            OpenGen helps businesses and early-stage teams launch websites and apps that look modern,
            feel professional, and support real growth.
          </p>
        </article>

        <article className="info-card">
          <span className="section-tag">Services</span>
          <ul className="info-list">
            <li>Business websites for shops, cafes, gyms, and coaching centers</li>
            <li>Landing pages for marketing campaigns and local outreach</li>
            <li>Custom dashboards and internal tools for growing teams</li>
            <li>Frontend and backend web app development</li>
          </ul>
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
        <div>
          <span className="section-tag">Start a project</span>
          <h2>Need a website or app for your business?</h2>
          <p>
            If you want a professional digital presence that builds trust and brings in customers,
            OpenGen is ready to help.
          </p>
        </div>

        <div className="contact-card__actions">
          <a className="button button--primary" href="mailto:hello@opengen.in?subject=Project%20Inquiry">
            Contact Us
          </a>
          <a className="button button--secondary" href="tel:+910000000000">
            Call OpenGen
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
