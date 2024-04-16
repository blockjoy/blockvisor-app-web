import { useEffect, useRef, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isMobile } from 'react-device-detect';
import { Filters, FiltersHeader } from '@shared/components';
import {
  hostAtoms,
  HostSorting,
  useHostFilters,
  useHostUIContext,
} from '@modules/host';
import { blockchainAtoms } from '@modules/node';
import { styles } from './HostFilters.styles';

export const HostFilters = () => {
  const hostUIContext = useHostUIContext();
  const hostUIProps = useMemo(() => {
    return {
      setQueryParams: hostUIContext.setQueryParams,
      queryParams: hostUIContext.queryParams,
    };
  }, [hostUIContext]);

  const {
    // filters,
    isDirty,
    tempSearchQuery,
    tempFiltersTotal,
    updateFilters,
    resetFilters,
    changeTempFilters,
  } = useHostFilters(hostUIProps);

  const isCompleted = useRef(false);

  const hostListLoadingState = useRecoilValue(hostAtoms.isLoading);
  const blockchainsLoadingState = useRecoilValue(
    blockchainAtoms.blockchainsLoadingState,
  );

  const [isFiltersOpen, setFiltersOpen] = useRecoilState(
    hostAtoms.isFiltersOpen,
  );

  const [activeView, setActiveView] = useRecoilState(hostAtoms.activeView);

  // const [openFilterId, setOpenFilterId] = useState('');

  useEffect(() => {
    if (isMobile) setFiltersOpen(false);
  }, []);

  // const hasFiltersApplied = filters.some((filter) => {
  //   if (filter.type === 'check') {
  //     return filter.list?.some((l: any) => l.isChecked);
  //   } else if (filter.type === 'range') {
  //     return (
  //       filter.min !== filter.values?.[0] || filter.max !== filter.values?.[1]
  //     );
  //   }
  // });

  // const handleResetFilters = () => {
  //   resetFilters();
  //   setOpenFilterId('');
  // };

  // const handleFilterBlockClicked = (filterId: string) => {
  //   setOpenFilterId(filterId);
  // };

  // const handlePlusMinusClicked = (filterId: string, isOpen: boolean) => {
  //   const filterNameValue = isOpen ? '' : filterId;
  //   setOpenFilterId(filterNameValue);
  // };

  const handleFiltersToggle = () => {
    setFiltersOpen(!isFiltersOpen);
  };

  const handleSearch = (value: string) => changeTempFilters('keyword', value);

  const handleActiveView = (view: View) => setActiveView(view);

  if (
    hostListLoadingState === 'finished' &&
    blockchainsLoadingState === 'finished'
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
        isFiltersOpen={isFiltersOpen}
        filtersTotal={tempFiltersTotal}
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
        isFiltersOpen={isFiltersOpen}
        resetFilters={resetFilters}
        updateFilters={updateFilters}
        isLoading={!isCompleted.current}
        handleSearch={handleSearch}
        searchValue={tempSearchQuery}
      />
    </div>
  );
};
