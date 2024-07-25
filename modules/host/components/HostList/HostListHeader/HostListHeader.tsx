import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Alert, Search, ViewPicker } from '@shared/components';
import { hostAtoms, useHostList, HostSorting } from '@modules/host';
import { layoutSelectors } from '@modules/layout';
import { settingsAtoms, useSettings } from '@modules/settings';
import { styles } from './HostListHeader.styles';

export const HostListHeader = () => {
  // const isLoading = useRecoilValue(hostAtoms.hostListLoadingState);
  // const filtersTotal = useRecoilValue(hostAtoms.filtersTempTotal);
  // const isFiltersOpen = useRecoilValue(layoutSelectors.isHostFiltersOpen);
  const activeView = useRecoilValue(layoutSelectors.hostView);
  const [searchQuery, setSearchQuery] = useRecoilState(
    hostAtoms.filtersSearchQuery,
  );
  const setPagination = useSetRecoilState(hostAtoms.hostListPagination);
  const setAppLoadingState = useSetRecoilState(settingsAtoms.appLoadingState);

  const { hostCount } = useHostList();
  const { updateSettings } = useSettings();

  const handleSearch = async (keyword: string) => {
    setAppLoadingState('loading');
    setSearchQuery(keyword);

    setPagination((oldPagi) => ({
      ...oldPagi,
      currentPage: 0,
    }));
  };

  const handleActiveView = (view: View) => {
    updateSettings('layout', {
      'hosts.view': view,
    });
  };

  // TODO: ADD FILTERS BACK IN ONCE IMPLEMENTED
  // const handleFilterCollapseToggled = async () => {
  //   await updateSettings('layout', {
  //     'hosts.filters.isOpen': !isFiltersOpen,
  //   });
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
