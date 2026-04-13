import { Link } from 'react-router-dom';

import BottomNav from '@/components/common/BottomNav';
import { APP_DESCRIPTION } from '@/constants/app.constants';
import { APP_ROUTES } from '@/constants/routes.constants';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import OpnGenBrandMark from '@/logo/OpnGenBrandMark';

const HomePage = () => {
  useDocumentTitle('We Build Websites & Apps');

  return (
    <div className="landing-page">
      <section className="hero">
        <div className="hero__topbar">
          <OpnGenBrandMark />

          <div className="hero__actions">
            <Link className="button button--ghost" to={APP_ROUTES.team}>
              Team
            </Link>
            <Link className="button button--ghost" to={APP_ROUTES.faq}>
              FAQ
            </Link>
            <Link className="button button--primary" to={APP_ROUTES.contact}>
              Contact
            </Link>
          </div>

          <details className="hero-mobile-menu">
            <summary className="hero-mobile-menu__toggle" aria-label="Open navigation menu">
              <span />
              <span />
              <span />
            </summary>
            <div className="hero-mobile-menu__panel">
              <Link className="hero-mobile-menu__link" to={APP_ROUTES.team}>
                Team
              </Link>
              <Link className="hero-mobile-menu__link" to={APP_ROUTES.faq}>
                FAQ
              </Link>
              <Link className="hero-mobile-menu__link hero-mobile-menu__link--primary" to={APP_ROUTES.contact}>
                Contact
              </Link>
            </div>
          </details>
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
              <a className="button button--secondary" href="#services">
                Explore Services
              </a>
            </div>
          </div>

          <div className="hero__panel">
            <h2>Focused execution. Premium outcomes.</h2>
            <div className="hero__micro-trust" aria-label="Why businesses choose OpnGen">
              <span>Fast first response</span>
              <span>Transparent scope and pricing</span>
              <span>Launch-ready quality</span>
            </div>
            <p>
              You work directly with founders, get clear milestones, and launch with a product that looks premium and performs reliably.
            </p>
          </div>
        </div>
      </section>

      <section className="section-block" id="services">
        <div className="section-heading">
          <span className="section-tag">Services</span>
          <h2>Only what you need to launch and grow.</h2>
        </div>

        <div className="services-grid">
          <article className="service-card">
            <span className="service-card__index">01</span>
            <h3>Website Development</h3>
            <p>High-performance websites built to create trust and generate quality inquiries.</p>
          </article>

          <article className="service-card">
            <span className="service-card__index">02</span>
            <h3>App Development</h3>
            <p>Custom web apps and dashboards for operations, automation, and scale.</p>
          </article>

          <article className="service-card">
            <span className="service-card__index">03</span>
            <h3>UI/UX Design</h3>
            <p>Clean, premium interfaces that make your brand look credible from first glance.</p>
          </article>
        </div>
      </section>

      <section className="section-block process-section" id="process">
        <div className="section-heading">
          <span className="section-tag">Process</span>
          <h2>A simple process, no chaos.</h2>
        </div>

        <div className="process-grid">
          <article className="process-card">
            <span className="process-card__step">01</span>
            <h3>Discover</h3>
            <p>We align on goals, users, and scope in one structured kickoff.</p>
          </article>
          <article className="process-card">
            <span className="process-card__step">02</span>
            <h3>Design + Build</h3>
            <p>Design and development move in parallel with fast weekly iterations.</p>
          </article>
          <article className="process-card">
            <span className="process-card__step">03</span>
            <h3>Launch + Support</h3>
            <p>We launch confidently and support ongoing improvements post-release.</p>
          </article>
        </div>
      </section>

      <BottomNav />
    </div>
  );
};

export default HomePage;
