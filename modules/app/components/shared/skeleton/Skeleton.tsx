import { FC } from 'react';
import { skeletonStyles } from './skeleton.styles';

type Props = {
  width?: string;
  height?: string;
  margin?: string;
};

export const Skeleton: FC<Props> = ({ width, height, margin }) => (
  <span
    style={{
      width,
      height,
      margin,
    }}
    css={skeletonStyles.skeleton}
  />
);
