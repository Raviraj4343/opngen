import { Outlet } from 'react-router-dom';
import CursorTrail from '@/components/feedback/CursorTrail';

const AppShell = () => {
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
