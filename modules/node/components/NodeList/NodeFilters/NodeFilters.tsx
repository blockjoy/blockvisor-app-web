import { useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  nodeAtoms,
  useNodeFilters,
  blockchainAtoms,
  nodeSelectors,
  NodeSorting,
} from '@modules/node';
import { layoutAtoms, layoutSelectors } from '@modules/layout';
import { useSettings } from '@modules/settings';
import { FiltersHeader, Filters } from '@shared/components';
import { useViewport } from '@shared/index';
import { styles } from './nodeFilters.styles';

export const NodeFilters = () => {
  const {
    filters,
    isDirty,
    tempSearchQuery,
    tempFiltersTotal,
    updateFilters,
    resetFilters,
    changeTempFilters,
  } = useNodeFilters();

  const isCompleted = useRef(false);

  const nodeListLoadingState = useRecoilValue(nodeAtoms.nodeListLoadingState);
  const blockchainsLoadingState = useRecoilValue(
    blockchainAtoms.blockchainsLoadingState,
  );
  const isFiltersOpen = useRecoilValue(layoutSelectors.isNodeFiltersOpen);
  const [isFiltersOpenMobile, setIsFiltersOpenMobile] = useRecoilState(
    layoutAtoms.isNodeFiltersOpenMobile,
  );
  const filtersBlockchainSelectedIds = useRecoilValue(
    nodeSelectors.filtersBlockchainSelectedIds,
  );

  const { updateSettings } = useSettings();
  const { isXlrg } = useViewport();

  const activeView = useRecoilValue(layoutSelectors.activeNodeView(isXlrg));

  const handleFiltersToggle = () => {
    if (isXlrg) setIsFiltersOpenMobile(!isFiltersOpenMobile);
    else updateSettings('layout', { 'nodes.filters.isOpen': !isFiltersOpen });
  };

  const handleSearch = (value: string) => changeTempFilters('keyword', value);

  const handleActiveView = (view: View) => {
    const activeViewKey = isXlrg ? 'mobile.nodes.view' : 'nodes.view';

    updateSettings('layout', { [activeViewKey]: view });
  };

  if (
    nodeListLoadingState === 'finished' &&
    (blockchainsLoadingState === 'finished' ||
      !filtersBlockchainSelectedIds.length)
  )
    isCompleted.current = true;

  const isOpen = isXlrg ? isFiltersOpenMobile : isFiltersOpen;

  return (
    <div css={[styles.outerWrapper, !isOpen && styles.outerWrapperCollapsed]}>
      <FiltersHeader
        isLoading={!isCompleted.current}
        isFiltersOpen={isOpen}
        filtersTotal={tempFiltersTotal}
        handleFiltersToggle={handleFiltersToggle}
        elements={
          <div css={styles.sorting}>
            <NodeSorting />
          </div>
        }
        activeView={activeView}
        handleActiveView={handleActiveView}
      />
      <Filters
        filters={filters}
        isDirty={isDirty}
        changeTempFilters={changeTempFilters}
        isFiltersOpen={isOpen}
        resetFilters={resetFilters}
        updateFilters={updateFilters}
        isLoading={!isCompleted.current}
        handleSearch={handleSearch}
        searchValue={tempSearchQuery}
      />
    </div>
  );
};
