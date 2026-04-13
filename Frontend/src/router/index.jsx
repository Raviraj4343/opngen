import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { APP_ROUTES } from '@/constants/routes.constants';
import PageLoader from '@/components/feedback/PageLoader';
import AppShell from '@/layouts/AppShell';

const HomePage = lazy(() => import('@/features/home/pages/HomePage'));
const TeamPage = lazy(() => import('@/pages/TeamPage'));
const FaqPage = lazy(() => import('@/pages/FaqPage'));
const ContactPage = lazy(() => import('@/pages/StartProjectPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export const AppRouter = () => {
  return (
    <Suspense
      fallback={
        <div className="app-shell">
          <main className="app-shell__content">
            <PageLoader label="Loading page..." />
          </main>
        </div>
      }
    >
      <Routes>
        <Route element={<AppShell />}>
          <Route path={APP_ROUTES.home} element={<HomePage />} />
          <Route path={APP_ROUTES.team} element={<TeamPage />} />
          <Route path={APP_ROUTES.faq} element={<FaqPage />} />
          <Route path={APP_ROUTES.contact} element={<ContactPage />} />
          <Route path={APP_ROUTES.startProject} element={<Navigate to={APP_ROUTES.contact} replace />} />
        </Route>
        <Route path={APP_ROUTES.notFound} element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to={APP_ROUTES.notFound} replace />} />
      </Routes>
    </Suspense>
  );
};
