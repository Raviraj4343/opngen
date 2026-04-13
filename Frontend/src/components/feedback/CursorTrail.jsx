import { useEffect, useRef } from 'react';

const MAX_POINTS_FULL = 120;
const POINT_LIFE_FULL = 46;

const lerp = (start, end, t) => start + (end - start) * t;

const mixColor = (from, to, t) => {
  const red = Math.round(lerp(from[0], to[0], t));
  const green = Math.round(lerp(from[1], to[1], t));
  const blue = Math.round(lerp(from[2], to[2], t));
  return `${red}, ${green}, ${blue}`;
};

const CursorTrail = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const supportsFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isLiteMode = document.documentElement.getAttribute('data-performance') === 'lite';

    if (!supportsFinePointer || prefersReducedMotion || isLiteMode) {
      return undefined;
    }

    const canvas = canvasRef.current;

    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext('2d');

    if (!context) {
      return undefined;
    }

    let animationFrameId = null;
    const points = [];
    let isRendering = false;
    let isPageVisible = !document.hidden;
    const maxPoints = MAX_POINTS_FULL;
    const pointLife = POINT_LIFE_FULL;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const pushPoint = (x, y) => {
      points.push({ x, y, life: pointLife });
      if (points.length > maxPoints) {
        points.splice(0, points.length - maxPoints);
      }
    };

    let previousX = null;
    let previousY = null;

    const onPointerMove = (event) => {
      const { clientX, clientY } = event;

      if (previousX === null || previousY === null) {
        pushPoint(clientX, clientY);
        previousX = clientX;
        previousY = clientY;
        return;
      }

      const dx = clientX - previousX;
      const dy = clientY - previousY;
      const distance = Math.hypot(dx, dy);
      const steps = Math.max(1, Math.ceil(distance / 9));

      for (let index = 1; index <= steps; index += 1) {
        const t = index / steps;
        pushPoint(previousX + dx * t, previousY + dy * t);
      }

      previousX = clientX;
      previousY = clientY;

      if (!isRendering && isPageVisible) {
        isRendering = true;
        animationFrameId = window.requestAnimationFrame(render);
      }
    };

    const onPointerLeave = () => {
      previousX = null;
      previousY = null;
    };

    const onVisibilityChange = () => {
      isPageVisible = !document.hidden;

      if (!isPageVisible && animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
        isRendering = false;
      }

      if (isPageVisible && points.length > 0 && !animationFrameId) {
        isRendering = true;
        animationFrameId = window.requestAnimationFrame(render);
      }
    };

    const render = (timestamp = 0) => {
      if (!isPageVisible) {
        animationFrameId = null;
        isRendering = false;
        return;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);

      for (let index = points.length - 1; index >= 0; index -= 1) {
        points[index].life -= 1;
        if (points[index].life <= 0) {
          points.splice(index, 1);
        }
      }

      if (points.length > 1) {
        context.globalCompositeOperation = 'lighter';
        const wave = (Math.sin(timestamp * 0.0026) + 1) / 2;
        const startColor = [
          Math.round(lerp(52, 132, wave)),
          Math.round(lerp(123, 88, wave)),
          Math.round(lerp(222, 249, wave)),
        ];
        const endColor = [
          Math.round(lerp(86, 171, wave)),
          Math.round(lerp(216, 152, wave)),
          Math.round(lerp(197, 242, wave)),
        ];

        for (let index = 1; index < points.length; index += 1) {
          const previous = points[index - 1];
          const current = points[index];
          const intensity = current.life / pointLife;
          const colorT = index / (points.length - 1);
          const rgb = mixColor(startColor, endColor, colorT);

          context.beginPath();
          context.moveTo(previous.x, previous.y);
          context.lineTo(current.x, current.y);
          context.strokeStyle = `rgba(${rgb}, ${0.06 + intensity * 0.3})`;
          context.lineWidth = 0.9 + intensity * 1.45;
          context.lineCap = 'round';
          context.lineJoin = 'round';
          context.shadowColor = `rgba(${rgb}, ${0.1 + intensity * 0.18})`;
          context.shadowBlur = 2 + intensity * 6;
          context.stroke();
          context.shadowBlur = 0;
        }
        context.globalCompositeOperation = 'source-over';
      }

      for (let index = 0; index < points.length; index += 2) {
        const point = points[index];
        const intensity = point.life / pointLife;
        const colorT = index / points.length;
        const rgb = mixColor([88, 216, 197], [54, 127, 214], colorT);

        context.beginPath();
        context.arc(point.x, point.y, 2 + intensity * 4.2, 0, Math.PI * 2);
        context.fillStyle = `rgba(${rgb}, ${0.02 + intensity * 0.08})`;
        context.fill();

        context.beginPath();
        context.arc(point.x, point.y, 0.85 + intensity * 1.35, 0, Math.PI * 2);
        context.fillStyle = `rgba(${rgb}, ${0.14 + intensity * 0.3})`;
        context.shadowColor = `rgba(${rgb}, ${0.2 + intensity * 0.22})`;
        context.shadowBlur = 4 + intensity * 7;
        context.fill();
        context.shadowBlur = 0;
      }

      if (points.length > 0) {
        animationFrameId = window.requestAnimationFrame(render);
      } else {
        isRendering = false;
        animationFrameId = null;
      }
    };

    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return <canvas className="cursor-trail-canvas" aria-hidden="true" ref={canvasRef} />;
};

export default CursorTrail;
