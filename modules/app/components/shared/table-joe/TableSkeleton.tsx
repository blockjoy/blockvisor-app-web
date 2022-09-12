import { Skeleton } from '../skeleton/Skeleton';
import { skeletonStyles } from '../skeleton/skeleton.styles';

export const TableSkeleton = () => (
  <div css={skeletonStyles.skeletonGrid}>
    <Skeleton width="200px" />
    <Skeleton width="300px" />
    <Skeleton width="150px" />
    <Skeleton />
  </div>
);
