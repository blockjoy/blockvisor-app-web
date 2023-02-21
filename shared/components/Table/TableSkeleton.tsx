import { Skeleton } from '@shared/components';
import { styles } from './table.styles';

type Props = {
  dataCy?: string;
};
export const TableSkeleton = ({ dataCy }: Props) => (
  <div data-cy={dataCy} css={styles.tableSkeleton}>
    <Skeleton width="200px" />
    <Skeleton width="300px" />
    <Skeleton width="150px" />
  </div>
);
