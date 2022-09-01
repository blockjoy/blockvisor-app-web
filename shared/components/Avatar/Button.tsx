import { MouseEventHandler, ReactNode, Children } from 'react';
import {
  buttonBorder,
  buttonSize,
  buttonDisplay,
  buttonStyle,
  button,
} from './Button.styles';
import { reset } from 'styles/utils.reset.styles';
import { css } from '@emotion/react'
import Link from 'next/link';

type Props = {
  children?: ReactNode;
  size?: ButtonSize;
  style?: ButtonStyle;
  border?: ButtonBorder;
  type?: 'button' | 'submit' | 'reset';
  display?: ButtonDisplay;
  customCss?: SerializedStyles[];
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export function Button({
  children,
  onClick,
  size = 'normal',
  style = 'primary',
  border = 'rounded',
  display = 'inline',
  type = 'button',
  href,
  customCss,
}: Props) {
  const buttonStyles = [
    reset.button,
    button,
    buttonSize[size],
    buttonBorder[border],
    buttonDisplay[display],
    buttonStyle[style],
  ];

  if (customCss) {
    buttonStyles.push(...customCss);
  }

  if (href) {
    return (
      <Link href={href} passHref>
        <a css={[buttonStyles]}>{children}</a>
      </Link>
    );
  }

  return (
    <button type={type} css={[buttonStyles]} onClick={onClick}>
      {children}
    </button>
  );
}
