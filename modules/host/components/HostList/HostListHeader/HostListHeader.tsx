import { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { Alert, Search, ViewPicker } from '@shared/components';
import { styles } from './HostListHeader.styles';
import {
  hostAtoms,
  hostSelectors,
  HostSorting,
  useHostList,
  useHostUIContext,
} from '@modules/host';

export const HostListHeader = () => {
  const hostUIContext = useHostUIContext();
  const hostUIProps = useMemo(() => {
    return {
      setQueryParams: hostUIContext.setQueryParams,
      queryParams: hostUIContext.queryParams,
    };
  }, [hostUIContext]);

  const [activeView, setactiveView] = useRecoilState(hostAtoms.activeView);

  const [searchQuery, setSearchQuery] = useRecoilState(
    hostSelectors.filtersSearchQuery,
  );

  const handleSearch = (keyword: string) => {
    setSearchQuery(keyword);

    const newQueryParams = {
      ...hostUIProps.queryParams,
      filter: {
        ...hostUIProps.queryParams.filter,
        keyword,
      },
    };

    newQueryParams.pagination.currentPage = 0;
    hostUIProps.setQueryParams(newQueryParams);
  };

  // const [isFiltersOpen, setIsFiltersOpen] = useRecoilState(
  //   hostAtoms.isFiltersOpen,
  // );
  // const filtersTotal = useRecoilValue(hostAtoms.filtersTempTotal);

  // const isLoading = useRecoilValue(hostAtoms.isLoading);

  const { hostCount } = useHostList();

  const handleActiveView = (view: View) => {
    setactiveView(view);
  };

  // TODO: ADD FILTERS BACK IN ONCE IMPLEMENTED
  // const handleFilterCollapseToggled = () => {
  //   setIsFiltersOpen(!isFiltersOpen);
  // };

  return (
    <div css={styles.wrapper}>
      {/* {!isFiltersOpen && (
        <div css={styles.wrapperInner}>
          {isLoading !== 'finished' ? (
            <Skeleton width="90px" />
          ) : (
            <button
              onClick={handleFilterCollapseToggled}
              css={[styles.filterToggle, styles.endBlock]}
            >
              <FiltersHeaderIconText filtersTotal={filtersTotal} />
            </button>
          )}
        </div>
      )} */}
      <Search version="instant" onSearch={handleSearch} value={searchQuery} />
      <Alert
        isRounded
        isSuccess={hostCount > 0}
        additionalStyles={[styles.count]}
      >
        {hostCount} {hostCount === 1 ? 'Host' : 'Hosts'}
      </Alert>

      <HostSorting />

      <div css={[styles.endBlock, styles.listTypePicker]}>
        <ViewPicker
          activeView={activeView}
          handleActiveView={handleActiveView}
        />
      </div>
    </div>
  );
};
