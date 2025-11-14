import * as boxshadows from '../styled-boxshadows/styled-boxshadows';
import * as colors from '../styled-colors/styled-colors';

export const lightTheme = {
  body: colors.bg_primary,

  colors: {
    background: colors.bg_primary,
    backgroundSecondary: colors.bg_secondary,
    backgroundTertiary: colors.bg_tertiary,
    text: colors.text_primary,
    textSecondary: colors.text_secondary,
    textTertiary: colors.text_tertiary,
    textMuted: colors.text_muted,
    primary: colors.accent_primary,
    primaryHover: colors.accent_hover,
    link: colors.accent_primary,
    linkHover: colors.accent_hover,
    border: colors.border_light,
    borderMedium: colors.border_medium,
    borderLight: colors.border_light,
    
    // Code colors
    codeBackground: colors.code_bg,
    codeText: colors.code_text,
    codeBorder: colors.code_border,
    
    // Legacy support
    black_1: colors.bg_tertiary,
    gray_1: colors.bg_tertiary,
    gray_2: colors.border_medium,
    gray_3: colors.text_muted,
    gray_4: colors.text_tertiary,
    white_1: colors.text_primary,
    white_2: colors.text_secondary,
    white_3: colors.text_tertiary,
    pink_1: colors.accent_primary,
    pink_2: colors.accent_hover,
    pink_3: colors.accent_hover,
    blue_1: colors.accent_primary,
  },

  backgrounds: {
    primary: colors.bg_primary,
    secondary: colors.bg_secondary,
    sidebar: colors.bg_secondary,
  },

  boxshadows: {},

  titles: {
    title: colors.text_primary,
    subTitle: colors.text_secondary,
    hover:{
      title: colors.text_primary,
      subTitle: colors.text_secondary,
    },
    focus:{
      title: colors.text_primary,
      subTitle: colors.text_secondary,
    }
  },

  texts: {
    body: colors.text_secondary,
    side: colors.text_tertiary,
    quote: colors.text_tertiary,
    link: colors.accent_primary,
    hover :{
      body: colors.text_secondary,
      side: colors.text_tertiary,
      quote: colors.text_tertiary,
      link: colors.accent_hover,
    },
    focus:{
      body: colors.text_secondary,
      side: colors.text_primary,
      quote: colors.text_tertiary,
      link: colors.accent_hover,
    }
  },

  sidecolors: {},

  text_hover: {},

  background_hover: {},

  color_hover: {},

  boxshadow_hover: {},

  font:{
    sizes:{
      title: '3.2rem',
      subTitle: '1.05rem',
      side: '1rem',
      quote: '1rem',
      link: '1.1rem',
      body: '1.1rem',
      hover: {
        body: '1rem',
        title: '1rem',
        subTitle: '1rem',
        side: '1rem',
        quote: '1rem',
        link: '1.1rem',
      },
      focus: {
        body: '1rem',
        title: '1rem',
        subTitle: '1rem',
        side: '1rem',
        quote: '1rem',
        link: '1.1rem',
      }
    },
    families: {
      body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    }
  }
}

export const darkTheme = {
  body: colors.dark_bg_primary,

  colors: {
    background: colors.dark_bg_primary,
    backgroundSecondary: colors.dark_bg_secondary,
    backgroundTertiary: colors.dark_bg_tertiary,
    text: colors.dark_text_primary,
    textSecondary: colors.dark_text_secondary,
    textTertiary: colors.dark_text_tertiary,
    textMuted: colors.dark_text_muted,
    primary: colors.dark_accent_primary,
    primaryHover: colors.dark_accent_hover,
    link: colors.dark_accent_primary,
    linkHover: colors.dark_accent_hover,
    border: colors.dark_border_light,
    borderMedium: colors.dark_border_medium,
    borderLight: colors.dark_border_light,
    
    // Code colors
    codeBackground: colors.dark_code_bg,
    codeText: colors.dark_code_text,
    codeBorder: colors.dark_code_border,
    
    // Legacy support
    black_1: colors.black_1,
    gray_1: colors.gray_1,
    gray_2: colors.gray_2,
    gray_3: colors.gray_3,
    gray_4: colors.gray_4,
    white_1: colors.white_1,
    white_2: colors.white_2,
    white_3: colors.white_3,
    pink_1: colors.pink_1,
    pink_2: colors.pink_2,
    pink_3: colors.pink_3,
    blue_1: colors.blue_1,
  },

  backgrounds: {
    primary: colors.dark_bg_primary,
    secondary: colors.dark_bg_secondary,
    sidebar: colors.dark_bg_secondary,
  },

  boxshadows: {},

  titles: {
    title: colors.dark_text_primary,
    subTitle: colors.dark_text_secondary,
    hover:{
      title: colors.dark_text_primary,
      subTitle: colors.dark_text_secondary,
    },
    focus:{
      title: colors.dark_text_primary,
      subTitle: colors.dark_text_secondary,
    }
  },

  texts: {
    body: colors.dark_text_secondary,
    side: colors.dark_text_tertiary,
    quote: colors.dark_text_tertiary,
    link: colors.dark_accent_primary,
    hover :{
      body: colors.dark_text_secondary,
      side: colors.dark_text_tertiary,
      quote: colors.dark_text_tertiary,
      link: colors.dark_accent_hover,
    },
    focus:{
      body: colors.dark_text_secondary,
      side: colors.dark_text_primary,
      quote: colors.dark_text_tertiary,
      link: colors.dark_accent_hover,
    }
  },

  sidecolors: {},

  text_hover: {},

  background_hover: {},

  color_hover: {},

  boxshadow_hover: {},

  font:{
    sizes:{
      title: '3.2rem',
      subTitle: '1.05rem',
      side: '1rem',
      quote: '1rem',
      link: '1.1rem',
      body: '1.1rem',
      hover: {
        body: '1rem',
        title: '1rem',
        subTitle: '1rem',
        side: '1rem',
        quote: '1rem',
        link: '1.1rem',
      },
      focus: {
        body: '1rem',
        title: '1rem',
        subTitle: '1rem',
        side: '1rem',
        quote: '1rem',
        link: '1.1rem',
      }
    },
    families: {
      body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    }
  }
}

export type ThemeType = typeof lightTheme
