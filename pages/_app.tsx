import React from 'react';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import dynamic from 'next/dynamic';
import { isLive } from 'config/config';
import 'crt-terminal/src/styles.scss';

const LiveApp = dynamic(() => import('screens/_app/Live/Live'));
const PlaceholderApp = dynamic(() => import('screens/_app/Placeholder/Placeholder'));

function GearboxTerminal(pageProps: AppProps) {
  return isLive ? <LiveApp {...pageProps} /> : <PlaceholderApp {...pageProps} />;
}

export default GearboxTerminal;
