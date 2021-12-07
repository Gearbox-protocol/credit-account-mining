import React from 'react';
import { isMobile } from 'react-device-detect';
import Block from 'components/Block/Block';
import Button from 'components/Button/Button';
import * as Styled from './DisableMobile.styled';

const DisableMobile: React.FC = ({ children }) => (
  <>
    {isMobile && (
      <Block variant="viewport-sized">
        <Styled.DisableWrap>
          <Styled.TextWrap>
            <Styled.Text>
              Gearbox apps are currently accessible from larger screens only: tablet, desktop, etc.
              Apologies for the inconvenience.
            </Styled.Text>
          </Styled.TextWrap>
          <Button title="Go back to website" href="https://app.beta.gearbox.fi/" />
        </Styled.DisableWrap>
      </Block>
    )}
    {!isMobile && children}
  </>
);
export default DisableMobile;
