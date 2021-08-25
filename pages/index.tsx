import React from 'react';
import dynamic from 'next/dynamic';
import Layout from 'components/Layout/Layout';

const Terminal = dynamic(() => import('components/Terminal/Terminal'), { ssr: false });

const Index = () => (
  <Layout
    layoutParams={{
      title: 'Gearbox',
      description: 'Gearbox-console main page',
      keyWords: 'Gearbox, crypto',
      url: 'http://landing-test.gearbox.finance',
    }}
  >
    <Terminal />
  </Layout>
);

export default Index;
