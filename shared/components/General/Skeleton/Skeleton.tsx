import { styles } from './Skeleton.styles';

type Props = {
  width?: string;
  height?: string;
  margin?: string;
};

export const Skeleton = ({ width, height, margin }: Props) => (
  <span
    style={{
      width,
      height,
      margin,
    }}
    css={styles.skeleton}
  />
);
