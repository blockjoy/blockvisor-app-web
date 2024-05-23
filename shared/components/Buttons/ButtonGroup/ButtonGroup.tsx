import { SerializedStyles } from '@emotion/react';
import { styles } from './ButtonGroup.styles';

type ButtonGroupProps = {
  type?: 'default' | 'extended' | 'flex';
  additionalStyles?: SerializedStyles[];
} & React.PropsWithChildren;

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
