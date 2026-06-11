import { createGlobalStyle } from 'styled-components';

import { ThemeType } from './styled-theme/styled-theme';

type Props = {
  theme?: ThemeType;
};

// CRT / Fallout-inspired terminal styling applied globally.
const CRT_PHOSPHOR = 'rgba(94, 227, 151, 0.35)';
const CRT_GRID = 'rgba(158, 255, 192, 0.06)';

export const GlobalStyle = createGlobalStyle<Props>`
  html {
    font-size: 18px;
    background: ${({ theme }) => theme.colors.background};
    color-scheme: dark;
  }

  body {
    position: relative;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text};
    transition: color 0.2s ease-in;
    font-family: ${({ theme }) =>
      theme.font?.families?.body ||
      'ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace'};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    /* Faint pixel grid on the base color */
    background-color: ${({ theme }) => theme.colors.background};
    background-image:
      linear-gradient(90deg, ${CRT_GRID} 1px, transparent 1px),
      linear-gradient(${CRT_GRID} 1px, transparent 1px);
    background-size: 3px 3px;
    background-attachment: fixed;

    /* Subtle phosphor glow on all text */
    text-shadow: 0 0 6px ${CRT_PHOSPHOR};
  }

  /* Scanlines + green fog overlay across the full viewport */
  body::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9999;
    background:
      radial-gradient(ellipse 120% 80% at 50% 0%, rgba(94, 227, 151, 0.05), transparent 55%),
      repeating-linear-gradient(
        transparent 0,
        transparent 2px,
        rgba(0, 0, 0, 0.12) 2px,
        rgba(0, 0, 0, 0.12) 4px
      );
  }

  @media (prefers-reduced-motion: reduce) {
    body::before {
      opacity: 0.5;
    }
  }

  a {
    font-size: ${({ theme }) => theme.font.sizes.link};
    cursor: pointer;
    color: ${({ theme }) => theme.colors.link};
  }

  p, h1, h2, h3, h4, h5, h6 {
    width: 100%;
  }

  h1, h2, h3, h4, h5, h6 {
    letter-spacing: -0.01em;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    text-shadow: none;
  }

  /* Square, terminal-style form controls */
  input, textarea, select {
    background: ${({ theme }) => theme.colors.backgroundTertiary};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 2px;
    color: ${({ theme }) => theme.colors.text};
    color-scheme: dark;
  }

  input::placeholder, textarea::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
    opacity: 1;
  }

  input:focus-visible, textarea:focus-visible, select:focus-visible {
    outline: 1px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  *:focus-visible {
    outline: 1px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  /* CRT scrollbar */
  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border: 3px solid ${({ theme }) => theme.colors.background};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.textMuted};
  }
`;
