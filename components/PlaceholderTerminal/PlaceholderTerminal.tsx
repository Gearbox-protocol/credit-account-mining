import React from 'react';
import Button from 'components/Button/Button';
import * as Styled from './PlaceholderTerminal.styled';

const EmptyTerminal = () => (
  <Styled.Container>
    <Styled.BackgroundVideo
      loop={true}
      autoPlay={true}
      muted={true}
      src="/videos/background.webm"
    />
    <Styled.AbsoluteBlock>
      <Styled.TextBlock>
        <Styled.Text>Approximate start: 15:00 UTC - Dec 16</Styled.Text>
      </Styled.TextBlock>
      <Button
        title="MINING GUIDE"
        href="https://medium.com/gearbox-protocol/credit-account-mining-guide-fueling-up-for-the-launch-abc17fbddbad"
      />
    </Styled.AbsoluteBlock>
  </Styled.Container>
);

export default EmptyTerminal;
