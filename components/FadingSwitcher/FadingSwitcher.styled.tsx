import styled from 'styled-components';

const FadingWrapper = styled.div<{ transitionDuration: number; phase: string }>`
  ${({ phase }) => {
    switch (phase) {
      case 'entering':
        return 'opacity: 1; display: block;';
      case 'entered':
        return 'opacity: 1; display: block;';
      case 'exiting':
        return 'opacity: 0; display: block;';
      case 'exited':
        return 'opacity: 0; display: none;';
      case 'unmounted':
        return 'opacity: 0; display: none;';
      default:
        return 'opacity: 0; display: none;';
    }
  }}

  transition: opacity ${({ transitionDuration }) => transitionDuration}ms ease-in-out;
`;

const AppearingWrapper = styled.div<{ phase: string }>`
  ${({ phase }) => {
    switch (phase) {
      case 'entering':
        return 'display: block; position: absolute; left: -99999px; z-index: -999; opacity: 0;';
      case 'entered':
        return 'display: block; position: static; left: unset; z-index: unset; opacity: 1;';
      case 'exiting':
        return 'display: none;';
      case 'exited':
        return 'display: none;';
      case 'unmounted':
        return 'display: none;';
      default:
        return '';
    }
  }}
`;

export { FadingWrapper, AppearingWrapper };
