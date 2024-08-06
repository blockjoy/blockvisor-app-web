import { useRecoilValue } from 'recoil';
import { styles } from './TableGrid.styles';
import { TableGridLoader } from './TableGridLoader';
import { layoutSelectors } from '@modules/layout';

type Props = {
  cells: Cell[] | null;
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
  const isSidebarOpen = useRecoilValue(layoutSelectors.isSidebarOpen);
  const isNodeFiltersOpen = useRecoilValue(layoutSelectors.isNodeFiltersOpen);
  const isHostFiltersOpen = useRecoilValue(layoutSelectors.isHostFiltersOpen);

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
