import { useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { styles } from './HostFilters.styles';
import { Filters, FiltersHeader } from '@shared/components';
import { useViewport } from '@shared/index';
import { useSettings } from '@modules/settings';
import { hostAtoms, useHostFilters, HostSorting } from '@modules/host';
import { blockchainAtoms } from '@modules/node';
import { layoutAtoms, layoutSelectors } from '@modules/layout';

export const HostFilters = () => {
  const {
    // filters,
    isDirty,
    tempSearchQuery,
    tempFiltersTotal,
    updateFilters,
    resetFilters,
    changeTempFilters,
  } = useHostFilters();

  const isCompleted = useRef(false);

  const hostListLoadingState = useRecoilValue(hostAtoms.isLoading);
  const blockchainsLoadingState = useRecoilValue(
    blockchainAtoms.blockchainsLoadingState,
  );
  const isFiltersOpen = useRecoilValue(layoutSelectors.isHostFiltersOpen);
  const [isFiltersOpenMobile, setIsFiltersOpenMobile] = useRecoilState(
    layoutAtoms.isHostFiltersOpenMobile,
  );
  const activeView = useRecoilValue(layoutSelectors.hostView);

  const { updateSettings } = useSettings();
  const { isXlrg } = useViewport();

  const handleFiltersToggle = () => {
    if (isXlrg) setIsFiltersOpenMobile(!isFiltersOpenMobile);
    else updateSettings('layout', { 'hosts.filters.isOpen': !isFiltersOpen });
  };

  const handleSearch = (value: string) => changeTempFilters('keyword', value);

  const handleActiveView = (view: View) => {
    updateSettings('layout', {
      'nodes.view': view,
    });
  };

  if (
    hostListLoadingState === 'finished' &&
    blockchainsLoadingState === 'finished'
  )
    isCompleted.current = true;

  const isOpen = isXlrg ? isFiltersOpenMobile : isFiltersOpen;

  return (
    <div css={[styles.outerWrapper, !isOpen && styles.outerWrapperCollapsed]}>
      <FiltersHeader
        isLoading={!isCompleted.current}
        filtersTotal={tempFiltersTotal}
        isFiltersOpen={isOpen}
        handleFiltersToggle={handleFiltersToggle}
        elements={
          <div css={styles.sorting}>
            <HostSorting />
          </div>
        }
        activeView={activeView}
        handleActiveView={handleActiveView}
      />

      <Filters
        filters={[]}
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
