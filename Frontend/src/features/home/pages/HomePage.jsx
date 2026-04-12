import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import BottomNav from '@/components/common/BottomNav';
import StatusCard from '@/components/common/StatusCard';
import PageLoader from '@/components/feedback/PageLoader';
import { APP_DESCRIPTION } from '@/constants/app.constants';
import { APP_ROUTES } from '@/constants/routes.constants';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import OpenGenBrandMark from '@/logo/OpenGenBrandMark';
import { getBackendHealth } from '@/services/health.service';

const HomePage = () => {
  const [health, setHealth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useDocumentTitle('We Build Websites & Apps');

  useEffect(() => {
    const loadPageData = async () => {
      try {
        const healthResponse = await getBackendHealth();
        setHealth(healthResponse);
      } catch (requestError) {
        setError(requestError?.response?.data?.message || 'Unable to reach backend');
      } finally {
        setIsLoading(false);
      }
    };

    void loadPageData();
  }, []);

  const backendStatus = error ? 'Online build team, backend check pending' : health?.message || 'Systems ready';

  return (
    <div className="landing-page">
      <section className="hero">
        <div className="hero__topbar">
          <OpenGenBrandMark />
          <div className="hero__actions">
            <a className="button button--ghost" href="#services">
              Services
            </a>
            <Link className="button button--ghost" to={APP_ROUTES.team}>
              Team
            </Link>
            <Link className="button button--primary" to={APP_ROUTES.contact}>
              Contact
            </Link>
          </div>
        </div>

        <div className="hero__body">
          <div className="hero__content">
            <p className="hero__kicker">Premium digital experiences for ambitious businesses</p>
            <h1>We craft high-trust websites and apps that convert.</h1>
            <p>{APP_DESCRIPTION}</p>

            <div className="hero__cta-group">
              <Link className="button button--primary" to={APP_ROUTES.contact}>
                Book a Discovery Call
              </Link>
              <a className="button button--secondary" href="#process">
                See Our Process
              </a>
            </div>

            <div className="hero__micro-trust" aria-label="Why businesses choose OpenGen">
              <span>Fast first response</span>
              <span>Transparent scope and pricing</span>
              <span>Launch-ready quality</span>
            </div>

            <div className="hero__stats" aria-label="OpenGen benefits">
              <article>
                <strong>Fast Delivery</strong>
                <span>Lean execution with clear milestones</span>
              </article>
              <article>
                <strong>Premium Design</strong>
                <span>Modern interfaces engineered for trust</span>
              </article>
              <article>
                <strong>Conversion Focus</strong>
                <span>Structured to turn visitors into inquiries</span>
              </article>
            </div>
          </div>

          <div className="hero__panel">
            <h2>Why brands choose OpenGen</h2>
            <div className="status-grid">
              <StatusCard label="Service" value="Websites and web apps tailored for business growth" tone="success" />
              <StatusCard label="Approach" value="Direct founder collaboration with zero agency overhead" />
              <StatusCard label="Delivery" value="Production-ready builds with clean, reliable handoff" tone="success" />
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

      <section className="section-block" id="services">
        <div className="section-heading">
          <span className="section-tag">Services</span>
          <h2>Everything required to launch, scale, and stand out online.</h2>
        </div>

        <div className="services-grid">
          <article className="service-card">
            <span className="service-card__index">01</span>
            <h3>Website Development</h3>
            <p>High-performance websites designed to build trust and drive qualified leads.</p>
          </article>

          <article className="service-card">
            <span className="service-card__index">02</span>
            <h3>App Development</h3>
            <p>Custom web apps and dashboards for teams that need speed, scale, and control.</p>
          </article>

          <article className="service-card">
            <span className="service-card__index">03</span>
            <h3>UI/UX Design</h3>
            <p>User-first product design that makes your brand look premium at every touchpoint.</p>
          </article>

          <article className="service-card">
            <span className="service-card__index">04</span>
            <h3>Maintenance</h3>
            <p>Reliable updates, security fixes, and support that keep your product market-ready.</p>
          </article>
        </div>
      </section>

      <section className="section-block process-section" id="process">
        <div className="section-heading">
          <span className="section-tag">Process</span>
          <h2>A clear process with zero chaos.</h2>
        </div>

        <div className="process-grid">
          <article className="process-card">
            <span className="process-card__step">01</span>
            <h3>Discover</h3>
            <p>We align on goals, users, and scope through one focused strategy kickoff.</p>
          </article>
          <article className="process-card">
            <span className="process-card__step">02</span>
            <h3>Design + Build</h3>
            <p>We design and build in parallel with weekly updates and rapid iteration cycles.</p>
          </article>
          <article className="process-card">
            <span className="process-card__step">03</span>
            <h3>Launch + Support</h3>
            <p>We launch with confidence and remain available for performance improvements.</p>
          </article>
        </div>
      </section>

      <section className="section-block results-strip" aria-label="OpenGen outcomes">
        <article className="results-strip__item">
          <strong>Premium-first delivery</strong>
          <span>Design and development that establish trust from the very first impression.</span>
        </article>
        <article className="results-strip__item">
          <strong>Clear communication</strong>
          <span>Transparent updates, realistic timelines, and clear owner-level communication.</span>
        </article>
        <article className="results-strip__item">
          <strong>Built for conversion</strong>
          <span>Every section is purpose-built to guide visitors into high-intent inquiries.</span>
        </article>
      </section>

      <BottomNav />
    </div>
  );
};

export default HomePage;
