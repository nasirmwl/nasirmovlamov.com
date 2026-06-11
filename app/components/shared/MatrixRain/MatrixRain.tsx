import { useEffect, useRef } from 'react';

import styled from 'styled-components';

const Canvas = styled.canvas`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  opacity: 0.22;
`;

const GLYPHS =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF<>/\\{}[]=+*$#';

const FONT_SIZE = 14;
const FPS = 18;

export const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let drops: number[] = [];

    const setup = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const columns = Math.floor(width / FONT_SIZE);
      drops = Array.from({ length: columns }, () => Math.random() * -50);
    };

    const draw = () => {
      // Fade previous frame for the trailing effect.
      ctx.fillStyle = 'rgba(7, 10, 8, 0.09)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${FONT_SIZE}px ui-monospace, monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        const x = i * FONT_SIZE;
        const y = drops[i] * FONT_SIZE;

        ctx.fillStyle = Math.random() > 0.975 ? '#b4ffc8' : '#3d8f5c';
        ctx.fillText(char, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    setup();

    let raf = 0;
    let last = 0;
    const interval = 1000 / FPS;

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (t - last < interval) return;
      last = t;
      draw();
    };

    if (prefersReduced) {
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener('resize', setup);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', setup);
    };
  }, []);

  return <Canvas ref={canvasRef} aria-hidden="true" />;
};
