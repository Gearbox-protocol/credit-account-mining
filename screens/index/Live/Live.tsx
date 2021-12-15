import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from 'redux/root/rootReducer';
import { subscribe, connectWeb3 } from 'redux/web3/web3Action';
import { videoSource } from 'config/config';
import FadingSwitcher from 'components/FadingSwitcher/FadingSwitcher';
import VideoPlayer from 'components/VideoPlayer/VideoPlayer';
import DisableMobile from 'components/DisableMobile/DisableMobile';
import ClaimLimitation from 'components/ClaimLimitation/ClaimLimitation';
import Block from 'components/Block/Block';

const TerminalController = dynamic(
  () => import('components/TerminalController/TerminalController'),
  { ssr: false },
);

function LiveIndex() {
  const { playVideo } = useSelector((state: IState) => state.terminalApp);

  const dispatch = useDispatch();

  useEffect(() => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      dispatch(connectWeb3());
      dispatch(subscribe());
    }
  }, [window.ethereum]);

  return (
    <FadingSwitcher isTransition={playVideo} transitionDuration={2000}>
      <DisableMobile>
        <ClaimLimitation>
          <Block variant="viewport-sized">
            <TerminalController />
          </Block>
        </ClaimLimitation>
      </DisableMobile>
      <VideoPlayer src={videoSource} />
    </FadingSwitcher>
  );
}

export default LiveIndex;
