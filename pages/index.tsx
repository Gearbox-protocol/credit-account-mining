import React from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { IState } from 'redux/root/rootReducer';
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
        <VideoPlayer src="https://www.youtube.com/embed/c6-L_3GMBxs" />
      </FadingSwitcher>
    </Layout>
  );
}

export default Index;
