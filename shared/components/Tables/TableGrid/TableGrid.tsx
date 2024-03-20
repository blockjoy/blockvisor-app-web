import { useRecoilValue } from 'recoil';
import { styles } from './TableGrid.styles';
import { GridCell } from './types/GridCell';
import { TableGridLoader } from './TableGridLoader';
import { sidebarOpen } from '@modules/layout/store/layoutAtoms';
import { hostAtoms } from '@modules/host';
import { nodeAtoms } from '@modules/node';

type Props = {
  cells: GridCell[] | null;
  entityName?: 'hosts' | 'nodes';
  preload?: number;
  isLoading?: LoadingState;
};

export const TableGrid = ({
  cells,
  entityName = 'nodes',
  preload,
  isLoading,
}: Props) => {
  const isSidebarOpen = useRecoilValue(sidebarOpen);

  const isHostFiltersOpen = useRecoilValue(hostAtoms.isFiltersOpen);

  const isNodeFiltersOpen = useRecoilValue(nodeAtoms.isFiltersOpen);

  const isFiltersOpen = isHostFiltersOpen || isNodeFiltersOpen;

  return isLoading === 'initializing' ? (
    <div css={[styles.base, styles[entityName](isSidebarOpen, isFiltersOpen)]}>
      <TableGridLoader length={preload || 0} />
    </div>
  ) : (
    <div css={[styles.base, styles[entityName](isSidebarOpen, isFiltersOpen)]}>
      {cells?.map(({ component: Component }) => Component)}
      {isLoading === 'loading' && preload ? (
        <TableGridLoader length={preload} />
      ) : null}
    </div>
  );
};
