import { SerializedStyles } from '@emotion/react';
import { ReactNode } from 'react';
import { styles } from './ButtonGroup.styles';

type ButtonGroupProps = {
  type?: 'default' | 'flex' | 'inline';
  children: ReactNode;
  additionalStyles?: SerializedStyles[];
};

export const ButtonGroup = ({
  type = 'default',
  children,
  additionalStyles,
}: ButtonGroupProps) => {
  return (
    <div
      css={[
        styles.wrapper,
        styles[type],
        additionalStyles ? additionalStyles : null,
      ]}
    >
      {children}
    </div>
  );
};
