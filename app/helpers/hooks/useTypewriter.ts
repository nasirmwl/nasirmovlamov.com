import { useEffect, useState } from 'react';

interface TypewriterResult {
  text: string;
  done: boolean;
}

/**
 * Reveals `text` one character at a time. Respects reduced-motion by
 * rendering the full string immediately.
 */
export const useTypewriter = (
  text: string,
  speed = 40,
  startDelay = 250
): TypewriterResult => {
  const [output, setOutput] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setOutput(text);
      setDone(true);
      return;
    }

    setOutput('');
    setDone(false);

    let index = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeNext = () => {
      setOutput(text.slice(0, index));
      if (index <= text.length) {
        index++;
        timeoutId = setTimeout(typeNext, speed);
      } else {
        setDone(true);
      }
    };

    const startId = setTimeout(typeNext, startDelay);

    return () => {
      clearTimeout(startId);
      clearTimeout(timeoutId);
    };
  }, [text, speed, startDelay]);

  return { text: output, done };
};
