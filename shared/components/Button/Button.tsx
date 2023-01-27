import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';
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
import { LightSpinner } from '../LoadingSpinner';
import { Tooltip } from '@shared/components';

type Props = {
  id?: string;
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
  tooltip?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  onClick,
  size = 'medium',
  style = 'primary',
  border = 'rounded',
  display = 'inline',
  type = 'button',
  disabled = false,
  tooltip,
  id,
  href,
  customCss,
  loading,
  ...rest
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
      <Link css={[buttonStyles]} href={href} passHref>
        {children}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled}
      {...rest}
      id={id}
      type={type}
      css={buttonStyles}
      onClick={onClick}
    >
      {loading ? <LightSpinner size="medium" /> : children}
      {tooltip && <Tooltip hideOnMobile top="-18px" tooltip={tooltip} />}
    </button>
  );
}
