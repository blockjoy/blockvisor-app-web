import { ReactNode } from 'react';
import { styles } from './LogsWrapper.styles';

type LogsWrapperProps = {
  children: ReactNode;
};

export const LogsWrapper = ({ children }: LogsWrapperProps) => {
  return <div css={styles.wrapper}>{children}</div>;
};
