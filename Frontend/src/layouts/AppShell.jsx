import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import CursorTrail from '@/components/feedback/CursorTrail';

const AppShell = () => {
  useEffect(() => {
    const memory = navigator.deviceMemory || 8;
    const cores = navigator.hardwareConcurrency || 8;
    const connection = navigator.connection;
    const saveData = Boolean(connection?.saveData);
    const slowNetwork = ['slow-2g', '2g', '3g'].includes(connection?.effectiveType || '');
    const liteMode = saveData || slowNetwork || memory <= 4 || cores <= 4;

    document.documentElement.setAttribute('data-performance', liteMode ? 'lite' : 'full');
  }, []);

  return (
    <div className="app-shell">
      <CursorTrail />
      <main className="app-shell__content">
        <Outlet />
      </main>
    </div>
  );
};

export default AppShell;
