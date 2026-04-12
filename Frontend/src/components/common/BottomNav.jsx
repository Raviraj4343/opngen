import { Link, useLocation } from 'react-router-dom';

import { APP_ROUTES } from '@/constants/routes.constants';

const BottomNav = () => {
  const { pathname } = useLocation();

  return (
    <nav className="bottom-nav" aria-label="Quick navigation">
      <a className="bottom-nav__link" href={`${APP_ROUTES.home}#services`}>
        Services
      </a>
      <a className="bottom-nav__link" href={`${APP_ROUTES.home}#process`}>
        Process
      </a>
      <Link
        className={`bottom-nav__link ${pathname === APP_ROUTES.team ? 'bottom-nav__link--active' : ''}`}
        to={APP_ROUTES.team}
      >
        Team
      </Link>
      <Link
        className={`bottom-nav__link bottom-nav__link--primary ${pathname === APP_ROUTES.startProject ? 'bottom-nav__link--active-primary' : ''}`}
        to={APP_ROUTES.startProject}
      >
        Start a Project
      </Link>
    </nav>
  );
};

export default BottomNav;
