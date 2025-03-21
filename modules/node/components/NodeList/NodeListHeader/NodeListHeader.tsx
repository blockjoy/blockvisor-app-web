import { useRecoilValue } from 'recoil';
import {
  Skeleton,
  FiltersHeaderIconText,
  Alert,
  ViewPicker,
} from '@shared/components';
import { nodeAtoms, NodeSorting, NodeCustomize } from '@modules/node';
import { layoutSelectors } from '@modules/layout';
import { useSettings } from '@modules/settings';
import { styles } from './NodeListHeader.styles';

export const NodeListHeader = () => {
  const nodeListLoadingState = useRecoilValue(nodeAtoms.nodeListLoadingState);
  const nodeCount = useRecoilValue(nodeAtoms.nodeCount);
  const filtersTotal = useRecoilValue(nodeAtoms.filtersTempTotal);
  const isFiltersOpen = useRecoilValue(layoutSelectors.isNodeFiltersOpen);
  const activeView = useRecoilValue(layoutSelectors.nodeView);

  const { updateSettings } = useSettings();

  const handleFilterCollapseToggled = () => {
    updateSettings('layout', { 'nodes.filters.isOpen': !isFiltersOpen });
  };

  const handleActiveView = (type: View) => {
    updateSettings('layout', { 'nodes.view': type });
  };

  const isLoading = nodeListLoadingState === 'initializing';

  return (
    <div css={styles.wrapper}>
      {!isFiltersOpen && (
        <div>
          {isLoading ? (
            <Skeleton width="80px" />
          ) : (
            <button
              onClick={handleFilterCollapseToggled}
              css={[styles.filterToggle]}
            >
              <FiltersHeaderIconText
                filtersTotal={filtersTotal}
                isFiltersOpen={isFiltersOpen}
              />
            </button>
          )}
        </div>
      )}
      {isLoading ? (
        <Skeleton width="115px" />
      ) : (
        <Alert
          isRounded
          isSuccess={nodeCount > 0}
          additionalStyles={[styles.count]}
        >
          {nodeCount} {nodeCount === 1 ? 'Node' : 'Nodes'}
        </Alert>
      )}
      <ViewPicker activeView={activeView} handleActiveView={handleActiveView} />
      <div css={[styles.listTypePicker]}>
        {activeView === 'grid' && <NodeSorting />}
        {activeView === 'table' && <NodeCustomize />}
      </div>
    </div>
  );
};
