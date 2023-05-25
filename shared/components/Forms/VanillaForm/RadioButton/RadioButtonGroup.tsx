import { ReactNode } from 'react';
import { styles } from './RadioButtonGroup.styles';

type RadioButtonGroupProps = {
  children: ReactNode;
};

export const RadioButtonGroup = ({ children }: RadioButtonGroupProps) => {
  return <div css={styles.wrapper}>{children}</div>;
};
