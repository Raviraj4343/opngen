import { Outlet } from 'react-router-dom';

const AppShell = () => {
  return (
    <div className="app-shell">
      <main className="app-shell__content">
        <Outlet />
      </main>
    </div>
  );
};

export default AppShell;
