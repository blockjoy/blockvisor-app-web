import { FC } from 'react';
import { skeletonStyles } from './skeleton.styles';

type Props = {
  width?: string;
  height?: string;
};

export const Skeleton: FC<Props> = ({ width, height }) => (
  <span
    style={{
      width,
      height,
    }}
    css={skeletonStyles.skeleton}
  />
);
