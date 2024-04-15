import { useEffect, useMemo, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isMobile } from 'react-device-detect';
import { Filters, FiltersHeader, Search } from '@shared/components';
import {
  nodeAtoms,
  useNodeFilters,
  useNodeUIContext,
  blockchainAtoms,
  nodeSelectors,
  NodeSorting,
} from '@modules/node';
import { styles } from './nodeFilters.styles';

export const NodeFilters = () => {
  const nodeUIContext = useNodeUIContext();
  const nodeUIProps = useMemo(() => {
    return {
      setQueryParams: nodeUIContext.setQueryParams,
      queryParams: nodeUIContext.queryParams,
    };
  }, [nodeUIContext]);

  const {
    filters,
    isDirty,
    tempSearchQuery,
    tempFiltersTotal,
    updateFilters,
    resetFilters,
    changeTempFilters,
  } = useNodeFilters(nodeUIProps);

  const isCompleted = useRef(false);

  const nodeListLoadingState = useRecoilValue(nodeAtoms.isLoading);
  const blockchainsLoadingState = useRecoilValue(
    blockchainAtoms.blockchainsLoadingState,
  );
  const [isFiltersOpen, setFiltersOpen] = useRecoilState(
    nodeAtoms.isFiltersOpen,
  );
  const filtersBlockchainSelectedIds = useRecoilValue(
    nodeSelectors.filtersBlockchainSelectedIds,
  );
  const [activeView, setActiveView] = useRecoilState(nodeAtoms.activeView);

  useEffect(() => {
    if (isMobile) setFiltersOpen(false);
  }, []);

  const handleFiltersToggle = () => {
    setFiltersOpen(!isFiltersOpen);
  };

  const handleSearch = (value: string) => changeTempFilters('keyword', value);

  const handleActiveView = (view: View) => setActiveView(view);

  if (
    nodeListLoadingState === 'finished' &&
    (blockchainsLoadingState === 'finished' ||
      !filtersBlockchainSelectedIds.length)
  )
    isCompleted.current = true;

  return (
    <div
      css={[
        styles.outerWrapper,
        !isFiltersOpen && styles.outerWrapperCollapsed,
      ]}
    >
      <FiltersHeader
        isLoading={!isCompleted.current}
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
      <form css={styles.form}>
        <Search
          onInput={handleSearch}
          value={tempSearchQuery}
          size="small"
          additionalStyles={styles.search}
        />
      </form>
      <Filters
        filters={filters}
        isDirty={isDirty}
        changeTempFilters={changeTempFilters}
        isFiltersOpen={isFiltersOpen}
        resetFilters={resetFilters}
        updateFilters={updateFilters}
        isLoading={!isCompleted.current}
      />
    </div>
  );
};
