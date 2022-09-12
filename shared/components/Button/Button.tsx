import { MouseEventHandler, ReactNode, Children } from 'react';
import {
  buttonBorder,
  buttonSize,
  buttonDisplay,
  buttonStyle,
  button,
} from './Button.styles';
import { reset } from 'styles/utils.reset.styles';
import { SerializedStyles } from '@emotion/serialize';
import Link from 'next/link';
import { LoadingSpinner } from '../LoadingSpinner';

type Props = {
  children?: ReactNode;
  size?: ButtonSize;
  style?: ButtonStyle;
  border?: ButtonBorder;
  type?: 'button' | 'submit' | 'reset';
  display?: ButtonDisplay;
  customCss?: SerializedStyles[];
  href?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export function Button({
  children,
  onClick,
  size = 'medium',
  style = 'primary',
  border = 'rounded',
  display = 'inline',
  type = 'button',
  disabled = false,
  href,
  customCss,
  loading,
  disabled,
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
    <button
      disabled={disabled}
      type={type}
      css={buttonStyles}
      onClick={onClick}
    >
      {loading ? <LoadingSpinner size="small" /> : children}
    </button>
  );
}
