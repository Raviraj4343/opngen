import { Link } from 'react-router-dom';

import { APP_ROUTES } from '@/constants/routes.constants';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const NotFoundPage = () => {
  useDocumentTitle('Page Not Found');

  return (
    <section className="empty-state">
      <span className="empty-state__code">404</span>
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link className="empty-state__link" to={APP_ROUTES.home}>
        Return home
      </Link>
    </section>
  );
};

export default NotFoundPage;
