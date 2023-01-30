import { Skeleton } from '@shared/components';
import { styles } from './table.styles';

export const TableSkeleton = () => (
  <div css={styles.tableSkeleton}>
    <Skeleton width="200px" />
    <Skeleton width="300px" />
    <Skeleton width="150px" />
  </div>
);
