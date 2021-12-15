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
        <Styled.Text>Some text</Styled.Text>
      </Styled.TextBlock>

      <Button title="with link" href="https://app.beta.gearbox.fi/" />
    </Styled.AbsoluteBlock>
  </Styled.Container>
);

export default EmptyTerminal;
