import { Skeleton } from '@shared/components';
import { styles } from './SkeletonView.styles';

export const SkeletonView = () => (
  <div css={styles.wrapper}>
    <Skeleton width="200px" />
    <Skeleton width="300px" />
    <Skeleton width="150px" />
  </div>
);
