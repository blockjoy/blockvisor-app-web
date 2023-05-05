import { FC } from 'react';
import { styles } from './tableGrid.styles';
import { GridCell } from './types/GridCell';
import TableGridLoader from './TableGridLoader';

type Props = {
  cells: GridCell[] | null;
  totalCells?: number;
  entityName?: string;
  preload?: number;
  isLoading?: LoadingState;
  dataCy?: string;
};

export const TableGrid: FC<Props> = ({
  cells,
  totalCells = 6,
  entityName = 'node',
  preload,
  isLoading,
  dataCy,
}) => {
  return isLoading === 'initializing' ? (
    <div css={styles.grid}>
      <TableGridLoader length={preload || 0} />
    </div>
  ) : (
    <div data-cy={dataCy} css={styles.grid}>
      {cells?.map(({ component: Component }) => Component)}
      {isLoading === 'loading' && preload ? (
        <TableGridLoader length={preload} />
      ) : null}
    </div>
  );
};
