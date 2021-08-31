import { DefaultTheme } from 'styled-components';

const defaultTheme: DefaultTheme = {
  breakpoints: {
    xxl: 1440,
    xl: 1200,
    lg: 992,
    md: 768,
    sm: 576,
    xs: 440,
  },

  palette: {
    primary: {
      main: '#070d20',
      contrast: '#ffffff',
    },
    secondary: {
      main: '#ea3690',
      contrast: '#ffffff',
    },
    buttons: {
      dark: {
        main: '#656e7b',
        contrast: '#ffffff',
      },
    },
    hovers: {
      secondary: {
        main: 'rgb(185, 4, 111)',
        contrast: '#ccc',
      },
      primary: {
        main: '#5b6574',
        contrast: '#757f9e',
      },
    },
  },
};

export default defaultTheme;
