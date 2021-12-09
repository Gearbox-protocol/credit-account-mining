import React from 'react';
import { Transition } from 'react-transition-group';
import { IVideoPlayerProps } from 'components/VideoPlayer/VideoPlayer';
import * as Styled from './FadingSwitcher.styled';

interface IFadingSwitcherProps {
  transitionDuration: number;
  isTransition: boolean;
  children: [React.ReactElement, React.ReactElement];
}

function FadingSwitcher({ transitionDuration, isTransition, children }: IFadingSwitcherProps) {
  return (
    <>
      <Transition in={!isTransition} timeout={transitionDuration}>
        {(state) => (
          <Styled.FadingWrapper transitionDuration={transitionDuration} phase={state}>
            {React.cloneElement(children[0], {
              entered: state === 'entered',
            })}
          </Styled.FadingWrapper>
        )}
      </Transition>

      <Transition in={isTransition} timeout={transitionDuration}>
        {(state) => (
          <Styled.AppearingWrapper phase={state}>
            {React.isValidElement<IVideoPlayerProps>(children[1])
              ? React.cloneElement(children[1], {
                play: state === 'entered',
              })
              : children[1]}
          </Styled.AppearingWrapper>
        )}
      </Transition>
    </>
  );
}

export default FadingSwitcher;
