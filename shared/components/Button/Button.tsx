import { MouseEventHandler, ReactNode } from 'react';
import {
  buttonBorder,
  buttonSize,
  buttonDisplay,
  buttonStyle,
  button,
} from './Button.styles';
import { reset } from 'styles/utils.reset.styles';
import { SerializedStyles } from '@emotion/react';

type ButtonSize = 'small' | 'medium' | 'normal';

type ButtonStyle =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'warning'
  | 'basic';

type ButtonBorder = 'rounded' | 'round';

type ButtonDisplay = 'inline' | 'block';

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
    <a href={href} css={[buttonStyles]}>
      {children}
    </a>;
  }

  return (
    <button type={type} css={[buttonStyles]} onClick={onClick}>
      {children}
    </button>
  );
}
