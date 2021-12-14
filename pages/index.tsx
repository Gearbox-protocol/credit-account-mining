import React from 'react';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { IState } from 'redux/root/rootReducer';
import { videoSource, isLive } from 'config/config';
import generateClaims from 'utils/node-scripts/generate-merkle-claims';
import Layout from 'components/Layout/Layout';
import FadingSwitcher from 'components/FadingSwitcher/FadingSwitcher';
import VideoPlayer from 'components/VideoPlayer/VideoPlayer';

const DisableMobile = dynamic(() => import('components/DisableMobile/DisableMobile'), {
  ssr: false,
});
const TerminalController = dynamic(
  () => import('components/TerminalController/TerminalController'),
  { ssr: false },
);

function Index() {
  const { playVideo } = useSelector((state: IState) => state.terminalApp);

  return (
    <Layout
      layoutParams={{
        title: 'Gearbox',
        description: 'Gearbox-terminal main page',
        keyWords: 'Gearbox, crypto',
        url: 'http://landing-test.gearbox.finance',
      }}
    >
      <FadingSwitcher isTransition={playVideo} transitionDuration={2000}>
        <DisableMobile>
          <TerminalController />
        </DisableMobile>
        <VideoPlayer src={videoSource} />
      </FadingSwitcher>
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
