import { createGlobalStyle } from 'styled-components';
import { ThemeType } from './styled-components/styled-theme/styled-theme';

type Props = {
  theme: ThemeType;
};

export const GlobalStyles = createGlobalStyle<Props>`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
  }

  body {
    font-family: ${(props) => props.theme.font?.families?.body || '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'};
    background: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  ::selection {
    background: ${(props) => props.theme.colors.primary}40;
    color: ${(props) => props.theme.colors.text};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  input, textarea {
    font-family: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Scrollbar styles */
  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.borderMedium};
    border-radius: 6px;
    border: 3px solid ${(props) => props.theme.colors.background};

    &:hover {
      background: ${(props) => props.theme.colors.textMuted};
    }
  }

  /* Focus visible for accessibility */
  *:focus-visible {
    outline: 2px solid ${(props) => props.theme.colors.primary};
    outline-offset: 2px;
  }
`;

