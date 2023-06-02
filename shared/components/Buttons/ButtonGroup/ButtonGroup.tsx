import { ReactNode } from 'react';
import { styles } from './ButtonGroup.styles';

type ButtonGroupProps = {
  type?: 'default' | 'flex' | 'inline';
  children: ReactNode;
};

export const ButtonGroup = ({
  type = 'default',
  children,
}: ButtonGroupProps) => {
  return <div css={[styles.wrapper, styles[type]]}>{children}</div>;
};
