import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { APP_ROUTES } from '@/constants/routes.constants';

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
        className={`bottom-nav__link bottom-nav__link--tracked ${pathname === APP_ROUTES.home && activeHomeSection === 'services' ? 'bottom-nav__link--tracked-active' : ''}`}
        to={`${APP_ROUTES.home}#services`}
        ref={servicesRef}
      >
        Services
      </Link>
      <Link
        className={`bottom-nav__link bottom-nav__link--tracked ${pathname === APP_ROUTES.home && activeHomeSection === 'process' ? 'bottom-nav__link--tracked-active' : ''}`}
        to={`${APP_ROUTES.home}#process`}
        ref={processRef}
      >
        Process
      </Link>
      <Link
        className={`bottom-nav__link ${pathname === APP_ROUTES.team ? 'bottom-nav__link--active' : ''}`}
        to={APP_ROUTES.team}
      >
        Team
      </Link>
      <Link
        className={`bottom-nav__link bottom-nav__link--primary ${pathname === APP_ROUTES.contact ? 'bottom-nav__link--active-primary' : ''}`}
        to={APP_ROUTES.contact}
      >
        Contact
      </Link>
    </nav>
  );
};

export default BottomNav;
