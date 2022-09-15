import { AnchorHTMLAttributes, FC } from 'react';
import { reset } from 'styles/utils.reset.styles';
import { styles } from './IconButton.styles';

interface Props {
  border?: ButtonBorder;
  size?: IconButtonSize;
  style?: ButtonStyle;
  cssCustom?: string;
  asLink: boolean;
  children: React.ReactNode;
  handleOnClick: VoidFunction;
  href?: string;
}

export const IconButton: FC<Props> = ({
  asLink,
  children,
  size = 'medium',
  style = 'primary',
  border = 'rounded',
  cssCustom = '',
  handleOnClick,
  href,
  ...rest
}) => {
  const classes = [
    reset.button,
    styles.base,
    styles[border],
    styles[size],
    styles[style],
  ];

  if (asLink) {
    return (
      <a href={href} onClick={handleOnClick} css={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button css={classes} onClick={handleOnClick} {...rest}>
      {children}
    </button>
  );
};
