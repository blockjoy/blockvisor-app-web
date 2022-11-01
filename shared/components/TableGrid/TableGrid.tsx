import { FC } from 'react';
import { styles } from './tableGrid.styles';
import { GridCell } from './types/GridCell';
import IconSort from '@public/assets/icons/sort-12.svg';
import IconDown from '@public/assets/icons/down-16.svg';
import SizedIcon from '@modules/layout/components/shared/SizedIcon';
import { TableSkeleton } from '@shared/components';

type Props = {
  cells: GridCell[] | null;
  totalCells?: number;
  entityName?: string;
  isLoading?: boolean;
};

export const TableGrid: FC<Props> = ({
  cells,
  totalCells = 6,
  entityName = 'node',
  isLoading,
}) => {
  return isLoading ? (
    <TableSkeleton />
  ) : (
    <>
      <header css={styles.gridHeader}>
        <button css={styles.gridHeaderSortBy}>
          <SizedIcon size="10px">
            <IconSort />
          </SizedIcon>
          Sort By
          <SizedIcon size="10px">
            <IconDown />
          </SizedIcon>
        </button>
        <span css={styles.gridHeaderTotal}>
          Showing {totalCells}{' '}
          {totalCells === 1 ? entityName : `${entityName}s`}
        </span>
      </header>
      <div css={styles.grid}>
        {cells?.map(({ component: Component }) => Component)}
      </div>
    </>
  );
};
