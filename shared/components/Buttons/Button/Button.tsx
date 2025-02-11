import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import {
  buttonBorder,
  buttonSize,
  buttonDisplay,
  buttonStyle,
  buttonTooltip,
  button,
} from './Button.styles';
import { reset } from 'styles/utils.reset.styles';
import { SerializedStylesAll } from 'types/theme';
import Link from 'next/link';
import { Tooltip } from '@shared/components';
import { ButtonSpinner } from './ButtonSpinner';

type Props = {
  id?: string;
  children?: ReactNode;
  size?: ButtonSize;
  style?: ButtonStyle;
  border?: ButtonBorder;
  type?: 'button' | 'submit' | 'reset';
  display?: ButtonDisplay;
  customCss?: SerializedStylesAll;
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
    buttonStyles.push(customCss);
  }

  if (href) {
    return (
      <Link css={[buttonStyles]} href={href} passHref shallow>
        {children}
      </Link>
    );
  }

  const ButtonComponent = () => (
    <button
      disabled={disabled || loading}
      {...rest}
      id={id}
      type={type}
      css={buttonStyles}
      onClick={onClick}
    >
      {loading ? <ButtonSpinner size={size} /> : children}
    </button>
  );

  return tooltip ? (
    <div css={buttonTooltip}>
      <Tooltip noWrap hideOnMobile left="50%" top="-30px" tooltip={tooltip} />
      <ButtonComponent />
    </div>
  ) : (
    <ButtonComponent />
  );
}
