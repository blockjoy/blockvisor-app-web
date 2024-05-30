import { useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  Alert,
  GridTableViewPicker,
  OrganizationPicker,
  Search,
} from '@shared/components';
import { styles } from './HostListHeader.styles';
import { hostSelectors, useHostList, useHostUIContext } from '@modules/host';
import { layoutSelectors, useLayout } from '@modules/layout';

export const HostListHeader = () => {
  const hostUIContext = useHostUIContext();
  const hostUIProps = useMemo(() => {
    return {
      setQueryParams: hostUIContext.setQueryParams,
      queryParams: hostUIContext.queryParams,
    };
  }, [hostUIContext]);

  const { hostCount } = useHostList();

  const view = useRecoilValue(layoutSelectors.hostView);

  // const isFiltersOpen = useRecoilValue(layoutSelectors.isHostFiltersOpen);
  // const filtersTotal = useRecoilValue(hostAtoms.filtersTempTotal);

  // const isLoading = useRecoilValue(hostAtoms.isLoading);

  const [searchQuery, setSearchQuery] = useRecoilState(
    hostSelectors.filtersSearchQuery,
  );

  const { updateLayout } = useLayout();

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

  const handleActiveListType = (type: View) => {
    updateLayout('host.view', type);
  };

  // TODO: ADD FILTERS BACK IN ONCE IMPLEMENTED
  // const handleFilterCollapseToggled = () => {
  //  updateLayout('host.filters.isOpen', !isFiltersOpen);
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
      <div css={styles.search}>
        <Search version="instant" onSearch={handleSearch} value={searchQuery} />
      </div>
      <Alert isRounded isSuccess={hostCount > 0}>
        {hostCount} {hostCount === 1 ? 'Host' : 'Hosts'}
      </Alert>
      <div css={styles.orgPicker}>
        <OrganizationPicker isRightAligned maxWidth="140px" />
      </div>
      <div css={[styles.endBlock, styles.listTypePicker]}>
        <GridTableViewPicker
          onChange={handleActiveListType}
          activeListType={view}
        />
      </div>
    </div>
  );
};
