import { FC } from 'react';
import { styles } from './tableGrid.styles';
import { GridCell } from './types/GridCell';
import IconSort from '@public/assets/icons/sort-12.svg';
import IconDown from '@public/assets/icons/down-16.svg';
import SizedIcon from '@modules/layout/components/shared/SizedIcon';
import { TableSkeleton } from '@shared/components';
import TableGridLoader from './TableGridLoader';

type Props = {
  cells: GridCell[] | null;
  totalCells?: number;
  entityName?: string;
  preload?: number;
  isLoading?: LoadingState;
};

export const TableGrid: FC<Props> = ({
  cells,
  totalCells = 6,
  entityName = 'node',
  preload,
  isLoading,
}) => {
  return isLoading === 'initializing' ? (
    <div css={styles.grid}>
      <TableGridLoader length={preload || 0} />
    </div>
  ) : (
    <div css={styles.grid}>
      {cells?.map(({ component: Component }) => Component)}
      { isLoading === 'loading' && preload ? <TableGridLoader length={preload} /> : null }
    </div>
  );
};
