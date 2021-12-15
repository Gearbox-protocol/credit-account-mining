import styled from 'styled-components';
import { ButtonThemeVariant, ButtonSizeVariant, TextSizeVariant } from 'components/Button/Button';

const ButtonLink = styled.a<{
  colorTheme?: ButtonThemeVariant;
  size?: ButtonSizeVariant;
  textSize?: TextSizeVariant;
}>`
  padding: ${({ size }) => {
    switch (size) {
      case 'md':
        return '8px 14px 8px 14px';
      case 'sm':
        return '7px 8px';
      default:
        return '8px 28px 8px 28px';
    }
  }};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ textSize }) => {
    switch (textSize) {
      case 'sm':
        return '13px';
      default:
        return '22px';
    }
  }};
  line-height: 1.55;
  font-weight: 400;
  text-decoration: none;
  color: ${({ theme, colorTheme }) => {
    switch (colorTheme) {
      case 'dark':
        return theme.palette.buttons.dark.contrast;
      default:
        return theme.palette.secondary.contrast;
    }
  }};
  background-color: ${({ theme, colorTheme }) => {
    switch (colorTheme) {
      case 'dark':
        return theme.palette.buttons.dark.main;
      default:
        return theme.palette.secondary.main;
    }
  }};
  border-radius: 10px;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;

  &:hover,
  &:focus {
    color: ${({ theme, colorTheme }) => {
    switch (colorTheme) {
      case 'dark':
        return theme.palette.buttons.dark.contrast;
      default:
        return theme.palette.secondary.contrast;
    }
  }};
    background-color: ${({ theme, colorTheme }) => {
    switch (colorTheme) {
      case 'dark':
        return theme.palette.hovers.primary.main;
      default:
        return theme.palette.hovers.secondary.main;
    }
  }};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    padding: ${({ size }) => {
    switch (size) {
      case 'md':
        return '8px 14px 8px 14px';
      case 'sm':
        return '7px 6px';
      default:
        return '8px 22px 8px 22px';
    }
  }};
    font-size: ${({ textSize }) => {
    switch (textSize) {
      case 'sm':
        return '11px';
      default:
        return '18px';
    }
  }};
  }
`;

const Button = styled.button<{
  colorTheme?: ButtonThemeVariant;
  size?: ButtonSizeVariant;
  textSize?: TextSizeVariant;
}>`
  padding: ${({ size }) => {
    switch (size) {
      case 'md':
        return '8px 14px 8px 14px';
      case 'sm':
        return '7px 8px';
      default:
        return '8px 28px 8px 28px';
    }
  }};
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: ${({ textSize }) => {
    switch (textSize) {
      case 'sm':
        return '13px';
      default:
        return '16px';
    }
  }};
  line-height: 1.55;
  font-weight: 400;
  text-decoration: none;
  color: ${({ theme, colorTheme }) => {
    switch (colorTheme) {
      case 'dark':
        return theme.palette.buttons.dark.contrast;
      default:
        return theme.palette.secondary.contrast;
    }
  }};
  background-color: ${({ theme, colorTheme }) => {
    switch (colorTheme) {
      case 'dark':
        return theme.palette.buttons.dark.main;
      default:
        return theme.palette.secondary.main;
    }
  }};
  border: none;
  border-radius: 10px;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;

  &:hover,
  &:focus {
    background-color: ${({ theme, colorTheme }) => {
    switch (colorTheme) {
      case 'dark':
        return theme.palette.hovers.primary.main;
      default:
        return theme.palette.hovers.secondary.main;
    }
  }};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    padding: ${({ size }) => {
    switch (size) {
      case 'md':
        return '8px 14px 8px 14px';
      case 'sm':
        return '7px 6px';
      default:
        return '8px 22px 8px 22px';
    }
  }};
    font-size: ${({ textSize }) => {
    switch (textSize) {
      case 'sm':
        return '11px';
      default:
        return '14px';
    }
  }};
  }
`;

export { ButtonLink, Button };
