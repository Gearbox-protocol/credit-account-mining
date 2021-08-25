import React from 'react';
import { ThemeProvider } from 'styled-components';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import wrapper from 'redux/store';
import FixedGlobalStyle from 'styles/global';
import Fonts from 'styles/fonts';
import theme from 'styles/theme';
import 'components/TerminalLib/styles.scss';

const GearboxTerminal = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <Fonts />
    <FixedGlobalStyle />
    <Component {...pageProps} />
  </ThemeProvider>
);

export default wrapper.withRedux(GearboxTerminal);
