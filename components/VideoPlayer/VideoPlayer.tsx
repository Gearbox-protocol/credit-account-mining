import React from 'react';

import * as Styled from './VideoPlayer.styled';

interface IVideoPlayerProps {
  src: string;
}

const VideoPlayer: React.FC<IVideoPlayerProps> = ({ src }) => (
  <Styled.PlayerWrapper>
    <Styled.Frame allow="autoplay; fullscreen" src={`${src}?autoplay=1`} />
  </Styled.PlayerWrapper>
);

export default VideoPlayer;
