import { FC } from 'react';
import { styles } from './tableGrid.styles';
import { GridCell } from './types/GridCell';
import IconSort from '@public/assets/icons/sort-12.svg';
import IconDown from '@public/assets/icons/down-16.svg';
import SizedIcon from '@modules/layout/components/shared/SizedIcon';
import { TableGridSkeleton } from '@shared/components';
import LazyLoad from 'react-lazyload';

type Props = {
  cells: GridCell[] | null;
  totalCells?: number;
  entityName?: string;
  isLoading?: boolean;
  numberOfItems?: number;
};

export const TableGrid: FC<Props> = ({
  cells,
  totalCells = 6,
  entityName = 'node',
  isLoading,
  numberOfItems = 10,
}) => {
  return isLoading ? (
    <TableGridSkeleton numOfItems={numberOfItems} />
  ) : (
    <div css={styles.grid}>
      {cells?.map(({ component: Component }, idx) => {
        const lastIndex = cells.length - 1;
        return (
          <LazyLoad
            unmountIfInvisible={true}
            debounce={true}
            placeholder={<div css={[styles.lazyLoadGridItemPlaceholder]} />}
            style={{ minWidth: '100%' }}
          >
            {Component}
          </LazyLoad>
        );
      })}
    </div>
  );
};
