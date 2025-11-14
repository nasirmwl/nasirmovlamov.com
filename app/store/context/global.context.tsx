import { ReactNode, createContext, useLayoutEffect, useState } from 'react';
import { darkTheme, lightTheme } from '@styled-components/styled-theme/styled-theme';

import { GlobalStyle } from '@styled-components/styled-global';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import i18n from '../../data/translation/i18n';

type CustomGlobalContextType = {
  isMenuOpen: boolean;
  darkMode: 'light' | 'dark' | null;
  toggleMenu: () => void;
  toggleTheme: () => void;
  lang: 'az' | 'en' | null;
  toggleLang: (lang: 'az' | 'en') => void;
};
export const GlobalContext = createContext<CustomGlobalContextType>({
  isMenuOpen: false,
  darkMode: 'dark',
  toggleMenu: () => {},
  toggleTheme: () => {},
  lang: 'az',
  toggleLang: () => {},
});

type Props = {
  children: ReactNode;
};

export const GlobalProvider = ({ children }: Props) => {
  const [darkMode, setDarkMode] = useState<'light' | 'dark' | null>('dark');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [lang, setLang] = useState<'az' | 'en' | null>('az');

  const toggleTheme = () => {
    const root = window.document.documentElement;
    root.classList.remove('light');
    root.classList.remove('dark');

    if (darkMode === 'dark') {
      localStorage.setItem('color-theme', 'light');
      root.classList.add('light');
      setDarkMode('light');
    }
    if (darkMode === 'light') {
      localStorage.setItem('color-theme', 'dark');
      root.classList.add('dark');
      setDarkMode('dark');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLang = () => {
    if (lang === 'az') {
      localStorage.setItem('site-language', 'en');
      setLang('en');
      i18n.changeLanguage('en');
    }
    if (lang === 'en') {
      localStorage.setItem('site-language', 'az');
      setLang('az');
      i18n.changeLanguage('az');
    }
  };

  useLayoutEffect(() => {
    const root = window.document.documentElement;
    const localTheme = localStorage.getItem('color-theme');
    console.log(localTheme);
    if (localTheme === 'dark') {
      root.classList.add('dark');
      setDarkMode('dark');
    }
    if (localTheme === 'light') {
      root.classList.add('light');
      setDarkMode('light');
    }

    if (localTheme === null) {
      root.classList.add('dark');
      setDarkMode('dark');
    }

    const localLang = localStorage.getItem('site-language');
    if (localLang === 'az') {
      setLang('az');
      i18n.changeLanguage('az');
    }
    if (localLang === 'en') {
      setLang('en');
      i18n.changeLanguage('en');
    }
    console.log(localLang);
    if (!localLang) {
      setLang('az');
      i18n.changeLanguage('az');
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{ isMenuOpen, toggleMenu, toggleTheme, darkMode, lang, toggleLang }}
    >
      <StyledThemeProvider theme={darkMode === 'light' ? lightTheme : darkTheme}>
        <GlobalStyle />
        {children}
      </StyledThemeProvider>
    </GlobalContext.Provider>
  );
};
