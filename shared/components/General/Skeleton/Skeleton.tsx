import { FC } from 'react';
import { styles } from './Skeleton.styles';

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
    css={styles.skeleton}
  />
);
