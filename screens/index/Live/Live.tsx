import React from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { IState } from 'redux/root/rootReducer';
import { videoSource } from 'config/config';
import FadingSwitcher from 'components/FadingSwitcher/FadingSwitcher';
import VideoPlayer from 'components/VideoPlayer/VideoPlayer';
import DisableMobile from 'components/DisableMobile/DisableMobile';
import Block from 'components/Block/Block';

const TerminalController = dynamic(
  () => import('components/TerminalController/TerminalController'),
  { ssr: false },
);

function LiveIndex() {
  const { playVideo } = useSelector((state: IState) => state.terminalApp);

  return (
    <FadingSwitcher isTransition={playVideo} transitionDuration={2000}>
      <DisableMobile>
        <Block variant="viewport-sized">
          <TerminalController />
        </Block>
      </DisableMobile>
      <VideoPlayer src={videoSource} />
    </FadingSwitcher>
  );
}

export default LiveIndex;
