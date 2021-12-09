import Link from 'next/link';
import React from 'react';

import * as Styled from './Button.styled';

type ButtonThemeVariant = 'dark';
type ButtonSizeVariant = 'sm' | 'md';
type TextSizeVariant = 'sm';

interface IButtonPropsTypes {
  title: string;
  element?: 'link' | 'button';
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  colorTheme?: ButtonThemeVariant;
  size?: ButtonSizeVariant;
  textSize?: TextSizeVariant;
  target?: string;
  onClick?: () => void;
}

function Button({
  title,
  colorTheme,
  size,
  textSize,
  onClick,
  target,
  element = 'link',
  href = '/',
  type = 'button',
  disabled = false,
}: IButtonPropsTypes) {
  return (
    <>
      {element === 'link' ? (
        <Link href={href} shallow={true}>
          <Styled.ButtonLink
            href={href}
            colorTheme={colorTheme}
            size={size}
            textSize={textSize}
            target={target}
          >
            {title}
          </Styled.ButtonLink>
        </Link>
      ) : (
        <Styled.Button
          type={type}
          disabled={disabled}
          colorTheme={colorTheme}
          size={size}
          textSize={textSize}
          onClick={onClick}
        >
          {title}
        </Styled.Button>
      )}
    </>
  );
}

export default Button;
export type {
  IButtonPropsTypes, ButtonThemeVariant, ButtonSizeVariant, TextSizeVariant,
};
