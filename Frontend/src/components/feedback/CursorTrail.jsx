import { useEffect, useRef } from 'react';

const MAX_POINTS_FULL = 180;
const MAX_POINTS_LITE = 80;
const POINT_LIFE_FULL = 76;
const POINT_LIFE_LITE = 34;

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
    const maxPoints = isLiteMode ? MAX_POINTS_LITE : MAX_POINTS_FULL;
    const pointLife = isLiteMode ? POINT_LIFE_LITE : POINT_LIFE_FULL;

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
      const steps = Math.max(1, Math.ceil(distance / 10));

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
          context.lineWidth = 0.8 + intensity * 1.7;
          context.lineCap = 'round';
          context.lineJoin = 'round';
          context.shadowColor = `rgba(${rgb}, ${0.14 + intensity * 0.24})`;
          context.shadowBlur = 4 + intensity * 14;
          context.stroke();
          context.shadowBlur = 0;
        }
        context.globalCompositeOperation = 'source-over';
      }

      for (let index = 0; index < points.length; index += 1) {
        const point = points[index];
        const intensity = point.life / pointLife;
        const colorT = index / points.length;
        const rgb = mixColor([88, 216, 197], [54, 127, 214], colorT);

        context.beginPath();
        context.arc(point.x, point.y, 2 + intensity * 4.2, 0, Math.PI * 2);
        context.fillStyle = `rgba(${rgb}, ${0.02 + intensity * 0.08})`;
        context.fill();

        context.beginPath();
        context.arc(point.x, point.y, 0.8 + intensity * 1.6, 0, Math.PI * 2);
        context.fillStyle = `rgba(${rgb}, ${0.12 + intensity * 0.36})`;
        context.shadowColor = `rgba(${rgb}, ${0.22 + intensity * 0.36})`;
        context.shadowBlur = 8 + intensity * 12;
        context.fill();
        context.shadowBlur = 0;

        if (index % 2 === 0 && intensity > 0.12) {
          context.beginPath();
          context.arc(point.x, point.y, 0.55 + intensity * 1.25, 0, Math.PI * 2);
          context.fillStyle = `rgba(236, 250, 255, ${0.2 + intensity * 0.5})`;
          context.shadowColor = `rgba(195, 233, 255, ${0.28 + intensity * 0.46})`;
          context.shadowBlur = 10 + intensity * 16;
          context.fill();
          context.shadowBlur = 0;

          if (index % 6 === 0) {
            const sparkleSize = 1 + intensity * 2.1;
            const sparkleAlpha = 0.15 + intensity * 0.42;

            context.beginPath();
            context.moveTo(point.x - sparkleSize, point.y);
            context.lineTo(point.x + sparkleSize, point.y);
            context.moveTo(point.x, point.y - sparkleSize);
            context.lineTo(point.x, point.y + sparkleSize);
            context.strokeStyle = `rgba(232, 246, 255, ${sparkleAlpha})`;
            context.lineWidth = 0.8 + intensity * 0.8;
            context.shadowColor = `rgba(188, 229, 255, ${sparkleAlpha})`;
            context.shadowBlur = 8 + intensity * 10;
            context.stroke();
            context.shadowBlur = 0;
          }
        }
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
