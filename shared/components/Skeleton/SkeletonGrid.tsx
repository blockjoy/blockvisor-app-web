import { FC, ReactNode } from 'react';
import { styles } from './Skeleton.styles';

type Props = {
  children: ReactNode;
  padding?: string;
};

export const SkeletonGrid: FC<Props> = ({ children, padding = '' }) => (
  <div css={styles.skeletonGrid(padding)}>{children}</div>
);
