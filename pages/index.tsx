import React from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { IState } from 'redux/root/rootReducer';
import Layout from 'components/Layout/Layout';
import VideoPlayer from 'components/VideoPlayer/VideoPlayer';

const TerminalController = dynamic(
  () => import('components/TerminalController/TerminalController'),
  { ssr: false },
);

const Index: React.FC = () => {
  const terminalApp = useSelector((state: IState) => state.terminalApp);

  return (
    <Layout
      layoutParams={{
        title: 'Gearbox',
        description: 'Gearbox-terminal main page',
        keyWords: 'Gearbox, crypto',
        url: 'http://landing-test.gearbox.finance',
      }}
    >
      {!terminalApp.playVideo && <TerminalController />}
      {terminalApp.playVideo && <VideoPlayer src="https://www.youtube.com/embed/c6-L_3GMBxs" />}
    </Layout>
  );
};

export default Index;
