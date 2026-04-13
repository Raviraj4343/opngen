import { Navigate, Route, Routes } from 'react-router-dom';

import { APP_ROUTES } from '@/constants/routes.constants';
import AppShell from '@/layouts/AppShell';
import HomePage from '@/features/home/pages/HomePage';
import FaqPage from '@/pages/FaqPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ContactPage from '@/pages/StartProjectPage';
import TeamPage from '@/pages/TeamPage';

export const AppRouter = () => {
  return (
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
  );
};
