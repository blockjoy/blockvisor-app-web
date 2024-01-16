import { FC } from 'react';
import { styles } from './Grid.styles';
import { GridCell } from './types/GridCell';
import TableGridLoader from './TableGridLoader';

type Props = {
  cells: GridCell[] | null;
  entityName?: 'hosts' | 'nodes';
  preload?: number;
  isLoading?: LoadingState;
};

export const TableGrid: FC<Props> = ({
  cells,
  entityName = 'nodes',
  preload,
  isLoading,
}) => {
  return isLoading === 'initializing' ? (
    <div css={[styles.base, styles[entityName]]}>
      <TableGridLoader length={preload || 0} />
    </div>
  ) : (
    <div css={[styles.base, styles[entityName]]}>
      {cells?.map(({ component: Component }) => Component)}
      {isLoading === 'loading' && preload ? (
        <TableGridLoader length={preload} />
      ) : null}
    </div>
  );
};
