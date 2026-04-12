import { useEffect, useState } from 'react';

import StatusCard from '@/components/common/StatusCard';
import PageLoader from '@/components/feedback/PageLoader';
import { APP_DESCRIPTION } from '@/constants/app.constants';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { getBackendHealth } from '@/services/health.service';

const HomePage = () => {
  const [health, setHealth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useDocumentTitle('Dashboard');

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

  return (
    <section className="hero">
      <div className="hero__content">
        <span className="hero__eyebrow">MERN Starter</span>
        <h1>Production-grade frontend structure for OpenGen.</h1>
        <p>{APP_DESCRIPTION}</p>
      </div>

      {isLoading ? (
        <PageLoader label="Checking backend connection..." />
      ) : (
        <div className="status-grid">
          <StatusCard
            label="Frontend"
            value="Ready"
            tone="success"
          />
          <StatusCard
            label="Backend"
            value={error ? 'Unavailable' : health?.message || 'Connected'}
            tone={error ? 'danger' : 'success'}
          />
          <StatusCard
            label="API Base URL"
            value={import.meta.env.VITE_API_BASE_URL || 'http://localhost:5600/api/v1'}
          />
        </div>
      )}

      {error ? <p className="hero__error">{error}</p> : null}
    </section>
  );
};

export default HomePage;
