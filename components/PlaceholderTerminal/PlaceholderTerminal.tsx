import React from 'react';
import Button from 'components/Button/Button';
import ReactPlayer from 'react-player/lazy';
import { Links } from 'utils/API/messages/messages';
import * as Styled from './PlaceholderTerminal.styled';

const EmptyTerminal = () => (
  <Styled.Container>
    <Styled.BackgroundVideo>
      <ReactPlayer
        url="https://youtu.be/2DZafHnECXs"
        playing={true}
        controls={false}
        loop={true}
        muted={true}
        width="100%"
        height="100%"
      />
    </Styled.BackgroundVideo>

    <Styled.AbsoluteBlock>
      <Styled.TextBlock>
        <Styled.Text>Approximate start: 15:00 UTC - Dec 16</Styled.Text>
      </Styled.TextBlock>
      <Button title="MINING GUIDE" href={Links.ABOUT} />
    </Styled.AbsoluteBlock>
  </Styled.Container>
);

export default EmptyTerminal;
