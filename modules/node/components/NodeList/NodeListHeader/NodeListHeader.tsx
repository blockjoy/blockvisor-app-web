import { useRecoilState, useRecoilValue } from 'recoil';
import {
  Skeleton,
  GridTableViewPicker,
  FiltersHeaderIconText,
  Alert,
} from '@shared/components';
import { nodeAtoms } from '@modules/node';
import { layoutAtoms, layoutSelectors } from '@modules/layout';
import { styles } from './styles';
import { useSettings } from '@modules/settings';
import { useViewport } from '@shared/index';

export const NodeListHeader = () => {
  const [isFiltersOpenMobile, setIsFiltersOpenMobile] = useRecoilState(
    layoutAtoms.isNodeFiltersOpenMobile,
  );
  const isLoadingNodes = useRecoilValue(nodeAtoms.isLoading);
  const nodeCount = useRecoilValue(nodeAtoms.nodeCount);
  const isFiltersOpen = useRecoilValue(layoutSelectors.isNodeFiltersOpen);
  const filtersTotal = useRecoilValue(nodeAtoms.filtersTempTotal);
  const view = useRecoilValue(layoutSelectors.nodeView);

  const { updateSettings } = useSettings();
  const { isXlrg } = useViewport();

  const handleFilterCollapseToggled = () => {
    if (isXlrg) setIsFiltersOpenMobile(!isFiltersOpenMobile);
    else updateSettings('layout', { 'nodes.filters.isOpen': !isFiltersOpen });
  };

  const handleGridTableViewChanged = (type: View) => {
    updateSettings('layout', { 'nodes.view': type });
  };

  const isLoading = isLoadingNodes !== 'finished';

  return (
    <div css={styles.wrapper}>
      {!isFiltersOpen && (
        <div css={styles.wrapperInner}>
          {isLoading ? (
            <Skeleton width="80px" />
          ) : (
            <button
              onClick={handleFilterCollapseToggled}
              css={[styles.filterToggle, styles.endBlock]}
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
        <Alert isRounded isSuccess={nodeCount > 0}>
          {nodeCount} {nodeCount === 1 ? 'Node' : 'Nodes'}
        </Alert>
      )}

      <div css={[styles.endBlock, styles.listTypePicker]}>
        <GridTableViewPicker
          onChange={handleGridTableViewChanged}
          activeListType={view}
        />
      </div>
    </div>
  );
};
