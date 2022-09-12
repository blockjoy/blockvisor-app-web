import { FC, ReactNode } from 'react';
import { skeletonStyles } from './skeleton.styles';

type Props = {
  children: ReactNode;
  padding?: string;
};

export const SkeletonGrid: FC<Props> = ({ children, padding = '' }) => (
  <div css={skeletonStyles.skeletonGrid(padding)}>{children}</div>
);
