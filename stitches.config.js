//estilos
import { createStitches } from '@stitches/react';

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    fonts: {
      system: 'Inter, apple-system, sans-serif',
    },
    colors: {
      black: '#081B33',
      white: '#FFFFFF',
      links: '#4C79EC',
      border: '#EBEBEB',
      muted: '#0000',
      success: '#35A361',
      danger: '#D63535',
      mint: '#C4F4D4',
      mintTransparent: 'rgba(196,244,212,0)',
      skyblue: '#C5E1F2',
      yellow: '#FCF7B9',
      purple: '#E8C3F3',
      cyan: '#C4F3E5',
      salmon: '#FCB9B9',
      orange: '#FCD9B9',
      deeppurple: '#BEB9FC',
    },
    fontSizes: {
      // f0: "2.5rem",
      // h1: "2rem",
      // h2: "1.5rem",
      // h3: "1.25rem",
      // h4: "1rem",
      xxlargeheading: '2.5rem',
      xlargeheading: '2rem',
      largeheading: '1.5rem',
      mediumheading: '1.25rem',
      smallheading: '1rem',
      normal: '0.9rem',
      small: '0.75rem',
    },
    fontWeights: {
      bold: '600',
      bolder: '800',
      normal: '400',
    },
    shadows: {
      card: '0px 1px 8px rgba(0, 0, 0, 0.08)',
    },
  },
  media: {
    bp1: '(min-width: 480px)',
  },
  utils: {
    marginX: value => ({ marginLeft: value, marginRight: value }),
  },
});
