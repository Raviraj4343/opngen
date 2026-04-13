import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { APP_ROUTES } from '@/constants/routes.constants';

const NavIcon = ({ type }) => {
  if (type === 'services') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="4" y="4" width="6" height="6" rx="1.5" />
        <rect x="14" y="4" width="6" height="6" rx="1.5" />
        <rect x="4" y="14" width="6" height="6" rx="1.5" />
        <rect x="14" y="14" width="6" height="6" rx="1.5" />
      </svg>
    );
  }

  if (type === 'process') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 18V6h4" />
        <path d="M10 6h10" />
        <path d="m16 2 4 4-4 4" />
        <circle cx="8" cy="18" r="2" />
      </svg>
    );
  }

  if (type === 'faq') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M6 5h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H11l-4 3v-3H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
        <path d="M10 10a2 2 0 1 1 3 1.73c-.67.37-1 .78-1 1.27" />
        <circle cx="12" cy="15.7" r="0.7" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 7h16v10H4z" />
      <path d="m4 8 8 6 8-6" />
    </svg>
  );
};

const BottomNav = () => {
  const { pathname, hash } = useLocation();
  const [activeHomeSection, setActiveHomeSection] = useState('');
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);

  useEffect(() => {
    if (pathname !== APP_ROUTES.home) {
      setActiveHomeSection('');
      return;
    }

    const resolveActiveSection = () => {
      const servicesSection = document.getElementById('services');
      const processSection = document.getElementById('process');

      if (!servicesSection || !processSection) {
        return;
      }

      const scrollMarker = window.scrollY + window.innerHeight * 0.36;
      const processStart = processSection.offsetTop;

      if (scrollMarker >= processStart) {
        setActiveHomeSection('process');
        return;
      }

      setActiveHomeSection('services');
    };

    resolveActiveSection();

    window.addEventListener('scroll', resolveActiveSection, { passive: true });
    window.addEventListener('resize', resolveActiveSection);

    return () => {
      window.removeEventListener('scroll', resolveActiveSection);
      window.removeEventListener('resize', resolveActiveSection);
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname !== APP_ROUTES.home) {
      return;
    }

    if (hash === '#services') {
      setActiveHomeSection('services');
      return;
    }

    if (hash === '#process') {
      setActiveHomeSection('process');
    }
  }, [pathname, hash]);

  useEffect(() => {
    const updatePill = () => {
      if (pathname !== APP_ROUTES.home || !['services', 'process'].includes(activeHomeSection)) {
        setPillStyle({ left: 0, width: 0, opacity: 0 });
        return;
      }

      const navNode = navRef.current;
      const targetNode = activeHomeSection === 'services' ? servicesRef.current : processRef.current;

      if (!navNode || !targetNode) {
        return;
      }

      const navRect = navNode.getBoundingClientRect();
      const targetRect = targetNode.getBoundingClientRect();

      setPillStyle({
        left: targetRect.left - navRect.left,
        width: targetRect.width,
        opacity: 1,
      });
    };

    updatePill();
    window.addEventListener('resize', updatePill);

    return () => {
      window.removeEventListener('resize', updatePill);
    };
  }, [pathname, activeHomeSection]);

  return (
    <nav className="bottom-nav" aria-label="Quick navigation" ref={navRef}>
      <span
        className="bottom-nav__active-pill"
        aria-hidden="true"
        style={{
          left: `${pillStyle.left}px`,
          width: `${pillStyle.width}px`,
          opacity: pillStyle.opacity,
        }}
      />
      <Link
        className={`bottom-nav__link bottom-nav__link--services bottom-nav__link--tracked ${pathname === APP_ROUTES.home && activeHomeSection === 'services' ? 'bottom-nav__link--tracked-active' : ''}`}
        to={`${APP_ROUTES.home}#services`}
        ref={servicesRef}
      >
        <span className="bottom-nav__icon" aria-hidden="true">
          <NavIcon type="services" />
        </span>
        <span className="bottom-nav__text">Services</span>
      </Link>
      <Link
        className={`bottom-nav__link bottom-nav__link--process bottom-nav__link--tracked ${pathname === APP_ROUTES.home && activeHomeSection === 'process' ? 'bottom-nav__link--tracked-active' : ''}`}
        to={`${APP_ROUTES.home}#process`}
        ref={processRef}
      >
        <span className="bottom-nav__icon" aria-hidden="true">
          <NavIcon type="process" />
        </span>
        <span className="bottom-nav__text">Process</span>
      </Link>
      <Link
        className={`bottom-nav__link bottom-nav__link--faq ${pathname === APP_ROUTES.faq ? 'bottom-nav__link--active' : ''}`}
        to={APP_ROUTES.faq}
      >
        <span className="bottom-nav__icon" aria-hidden="true">
          <NavIcon type="faq" />
        </span>
        <span className="bottom-nav__text">FAQ</span>
      </Link>
      <Link
        className={`bottom-nav__link bottom-nav__link--contact bottom-nav__link--primary ${pathname === APP_ROUTES.contact ? 'bottom-nav__link--active-primary' : ''}`}
        to={APP_ROUTES.contact}
      >
        <span className="bottom-nav__icon" aria-hidden="true">
          <NavIcon type="contact" />
        </span>
        <span className="bottom-nav__text">Contact</span>
      </Link>
    </nav>
  );
};

export default BottomNav;
