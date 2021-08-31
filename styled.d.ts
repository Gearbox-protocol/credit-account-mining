import 'styled-components';

interface IPalette {
  main: string;
  contrast: string;
}

interface IBreakpoints {
  xxl: number;
  xl: number;
  lg: number;
  md: number;
  sm: number;
  xs: number;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    breakpoints: IBreakpoints;
    palette: {
      primary: IPalette;
      secondary: IPalette;
      hovers: {
        primary: IPalette;
        secondary: IPalette;
      };
      buttons: {
        dark: IPalette;
      };
    };
  }
}
