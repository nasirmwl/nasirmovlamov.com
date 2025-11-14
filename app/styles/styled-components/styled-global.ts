import styled, { createGlobalStyle } from 'styled-components';

import { ThemeType } from './styled-theme/styled-theme';

type Props = {
  theme: ThemeType
}



export const GlobalStyle = createGlobalStyle<Props>`
  html{
    font-size: 18px;
    background: ${({ theme }) => theme.colors.background};
  }

  body {
    font-size: 1rem;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: background 0.2s ease-in, color 0.2s ease-in;
    font-family: ${({ theme }) => theme.font?.families?.body || '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    font-size: ${({ theme }) => theme.font.sizes.link};
    /* text-decoration: none; */
    cursor: pointer;
  }

  p, h1, h2, h3, h4, h5, h6 {
    width: 100%;
  }

`
