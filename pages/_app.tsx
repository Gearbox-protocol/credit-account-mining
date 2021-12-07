import React from 'react';
import { ThemeProvider } from 'styled-components';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { wrapper } from 'redux/store';
import theme from 'styles/theme';
import 'crt-terminal/src/styles.scss';

const GearboxTerminal: React.FC<AppProps> = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <Component {...pageProps} />
  </ThemeProvider>
);

export default wrapper.withRedux(GearboxTerminal);
