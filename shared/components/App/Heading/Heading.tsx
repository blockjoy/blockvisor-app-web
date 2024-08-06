import { ReactNode } from 'react';
import { styles } from './Heading.styles';

type HeadingProps = {
  children: ReactNode;
};

export const Heading = ({ children }: HeadingProps) => {
  return <h3 css={styles.heading}>{children}</h3>;
};
