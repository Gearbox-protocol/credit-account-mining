import React from 'react';
import ReactPlayer from 'react-player/lazy';
import PlayerWrapper from './VideoPlayer.styled';

interface IVideoPlayerProps {
  src: string;
  play?: boolean;
}

const VideoPlayer: React.FC<IVideoPlayerProps> = ({ src, play = false }) => (
  <PlayerWrapper>
    <ReactPlayer url={src} playing={play} controls width="100%" height="100%" />
  </PlayerWrapper>
);

export type { IVideoPlayerProps };
export default VideoPlayer;
