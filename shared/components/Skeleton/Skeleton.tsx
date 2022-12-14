import { SerializedStyles } from '@emotion/react';
import { FC } from 'react';
import { styles } from './Skeleton.styles';

type Props = {
  width?: string;
  height?: string;
  margin?: string;
  additionalStyles?: SerializedStyles[];
};

export const Skeleton: FC<Props> = ({
  width,
  height,
  margin,
  additionalStyles = [],
}) => (
  <span
    style={{
      width,
      height,
      margin,
    }}
    css={[styles.skeleton, ...additionalStyles]}
  />
);
