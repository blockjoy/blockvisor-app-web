import { Skeleton } from '../skeleton/Skeleton';
import { tableStyles } from './table.styles';

export const TableSkeleton = () => (
  <div css={tableStyles.tableSkeleton}>
    <Skeleton width="200px" />
    <Skeleton width="300px" />
    <Skeleton width="150px" />
  </div>
);
