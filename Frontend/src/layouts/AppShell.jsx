import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import CursorTrail from '@/components/feedback/CursorTrail';

const AppShell = () => {
  useEffect(() => {
    const memory = navigator.deviceMemory || 8;
    const cores = navigator.hardwareConcurrency || 8;
    const connection = navigator.connection;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const isSmallViewport = window.innerWidth < 1024;
    const saveData = Boolean(connection?.saveData);
    const slowNetwork = ['slow-2g', '2g', '3g'].includes(connection?.effectiveType || '');
    const setPerformanceMode = (mode) => {
      document.documentElement.setAttribute('data-performance', mode);
    };

    const heuristicLiteMode =
      prefersReducedMotion || saveData || slowNetwork || memory <= 4 || cores <= 4 || (isCoarsePointer && isSmallViewport);

    setPerformanceMode(heuristicLiteMode ? 'lite' : 'full');

    if (heuristicLiteMode) {
      return undefined;
    }

    let rafId = null;
    let previousTime = 0;
    let sampledFrames = 0;
    let totalDelta = 0;

    const sampleFrameRate = (now) => {
      if (previousTime !== 0) {
        totalDelta += now - previousTime;
        sampledFrames += 1;
      }

      previousTime = now;

      if (sampledFrames < 24) {
        rafId = window.requestAnimationFrame(sampleFrameRate);
        return;
      }

      const averageFrameMs = totalDelta / sampledFrames;

      if (averageFrameMs > 20.5) {
        setPerformanceMode('lite');
      }
    };

    rafId = window.requestAnimationFrame(sampleFrameRate);

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
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
