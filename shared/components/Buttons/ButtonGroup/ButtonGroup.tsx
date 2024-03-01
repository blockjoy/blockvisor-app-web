import { SerializedStyles } from '@emotion/react';
import { ReactNode } from 'react';
import { styles } from './ButtonGroup.styles';

type ButtonGroupProps = {
  type?: 'default' | 'flex' | 'inline';
  additionalStyles?: SerializedStyles;
  children: ReactNode;
};

export const ButtonGroup = ({
  type = 'default',
  additionalStyles,
  children,
}: ButtonGroupProps) => {
  return (
    <div css={[styles.wrapper, styles[type], additionalStyles]}>{children}</div>
  );
};
