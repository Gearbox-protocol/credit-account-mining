import React from 'react';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { isLive } from 'config/config';
import generateClaims from 'utils/node-scripts/generate-merkle-claims';
import Layout from 'components/Layout/Layout';

const LiveIndex = dynamic(() => import('screens/index/Live/Live'));
const PlaceholderIndex = dynamic(() => import('screens/index/Placeholder/Placeholder'), {
  ssr: false,
});

function Index() {
  return (
    <Layout
      layoutParams={{
        title: 'Gearbox',
        description: 'Gearbox-terminal main page',
        keyWords: 'Gearbox, crypto',
        url: 'http://landing-test.gearbox.finance',
      }}
    >
      {isLive ? <LiveIndex /> : <PlaceholderIndex />}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  if (isLive) generateClaims();
  return {
    props: {},
  };
};

export default Index;
