import { PropsWithChildren } from 'react';
import { IState } from 'redux/root/rootReducer';
import { useSelector } from 'react-redux';
import Block from 'components/Block/Block';
import Button from 'components/Button/Button';
import * as Styled from './ClaimLimitation.styled';

interface IClaimLimitationProps {}

function ClaimLimitation({ children }: PropsWithChildren<IClaimLimitationProps>) {
  const { allClaimed } = useSelector((state: IState) => state.terminalApp);

  const show = !allClaimed;
  return (
    <>
      {!show && (
        <Block variant="viewport-sized">
          <Styled.DisableWrap>
            <Styled.TextWrap>
              <Styled.Text>Error: already claimed, try your luck next time.</Styled.Text>
            </Styled.TextWrap>
            <Button title="Go back to website" href="https://app.beta.gearbox.fi/" />
          </Styled.DisableWrap>
        </Block>
      )}
      {show && children}
    </>
  );
}

export default ClaimLimitation;
