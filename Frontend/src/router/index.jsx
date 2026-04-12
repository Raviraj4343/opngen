import { Navigate, Route, Routes } from 'react-router-dom';

import { APP_ROUTES } from '@/constants/routes.constants';
import AppShell from '@/layouts/AppShell';
import HomePage from '@/features/home/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path={APP_ROUTES.home} element={<HomePage />} />
      </Route>
      <Route path={APP_ROUTES.notFound} element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to={APP_ROUTES.notFound} replace />} />
    </Routes>
  );
};
