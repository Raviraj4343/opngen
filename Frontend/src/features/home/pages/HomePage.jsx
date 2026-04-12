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
            <p className="hero__kicker">Modern digital presence for growth-ready businesses</p>
            <h1>Websites and apps that look sharp and perform better.</h1>
            <p>{APP_DESCRIPTION}</p>

            <div className="hero__cta-group">
              <Link className="button button--primary" to={APP_ROUTES.contact}>
                Contact Us
              </Link>
              <a className="button button--secondary" href="#process">
                See Process
              </a>
            </div>

            <div className="hero__stats" aria-label="OpenGen benefits">
              <article>
                <strong>Fast Delivery</strong>
                <span>Lean workflow and clear milestones</span>
              </article>
              <article>
                <strong>Modern UI</strong>
                <span>Clean interfaces built for trust</span>
              </article>
              <article>
                <strong>Business Focus</strong>
                <span>Built to convert visitors into leads</span>
              </article>
            </div>
          </div>

          <div className="hero__panel">
            <h2>Why OpenGen works</h2>
            <div className="status-grid">
              <StatusCard label="Service" value="Business websites and web apps" tone="success" />
              <StatusCard label="Approach" value="Small team, direct communication, zero agency bloat" />
              <StatusCard label="Delivery" value="Production-ready code and clean handoff" tone="success" />
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
          <h2>Everything you need to launch and grow online.</h2>
        </div>

        <div className="services-grid">
        <article className="service-card">
          <span className="service-card__index">01</span>
          <h3>Website Development</h3>
          <p>Fast, responsive websites designed to build trust and drive inquiries.</p>
        </article>

        <article className="service-card">
          <span className="service-card__index">02</span>
          <h3>App Development</h3>
          <p>Custom web apps and dashboards for teams that need more than static pages.</p>
        </article>

        <article className="service-card">
          <span className="service-card__index">03</span>
          <h3>UI/UX Design</h3>
          <p>Minimal, user-first interfaces that make your brand look premium.</p>
        </article>

        <article className="service-card">
          <span className="service-card__index">04</span>
          <h3>Maintenance</h3>
          <p>Reliable updates, fixes, and support to keep your product healthy after launch.</p>
        </article>
        </div>
      </section>

      <section className="section-block process-section" id="process">
        <div className="section-heading">
          <span className="section-tag">Process</span>
          <h2>Simple process. No chaos.</h2>
        </div>

        <div className="process-grid">
          <article className="process-card">
            <span className="process-card__step">01</span>
            <h3>Discover</h3>
            <p>We map goals, audience, and scope in one focused kickoff.</p>
          </article>
          <article className="process-card">
            <span className="process-card__step">02</span>
            <h3>Design + Build</h3>
            <p>We craft UI and develop with weekly updates and quick iteration.</p>
          </article>
          <article className="process-card">
            <span className="process-card__step">03</span>
            <h3>Launch + Support</h3>
            <p>We ship confidently and stay available for improvements.</p>
          </article>
        </div>
      </section>

      <BottomNav />
    </div>
  );
};

export default HomePage;
