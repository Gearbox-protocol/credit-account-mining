import React from 'react';
import dynamic from 'next/dynamic';
import Layout from 'components/Layout/Layout';

const TerminalController = dynamic(
  () => import('components/TerminalController/TerminalController'),
  { ssr: false },
);

const Index = () => (
  <Layout
    layoutParams={{
      title: 'Gearbox',
      description: 'Gearbox-terminal main page',
      keyWords: 'Gearbox, crypto',
      url: 'http://landing-test.gearbox.finance',
    }}
  >
    <TerminalController />
  </Layout>
);

export default Index;
