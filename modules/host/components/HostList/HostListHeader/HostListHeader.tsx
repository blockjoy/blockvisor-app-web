import { useRecoilState, useRecoilValue } from 'recoil';
import {
  Alert,
  GridTableViewPicker,
  OrganizationPicker,
} from '@shared/components';
import { styles } from './HostListHeader.styles';
import { hostAtoms, hostSelectors, useHostList } from '@modules/host';

export const HostListHeader = () => {
  const [activeListType, setActiveListType] = useRecoilState(
    hostAtoms.activeListType,
  );

  const [isFiltersOpen, setIsFiltersOpen] = useRecoilState(
    hostAtoms.isFiltersOpen,
  );
  const filtersTotal = useRecoilValue(hostSelectors.filtersTotal);

  const isLoading = useRecoilValue(hostAtoms.isLoading);

  const { hostCount } = useHostList();

  const handleActiveListType = (type: string) => {
    setActiveListType(type);
  };

  // TODO: ADD FILTERS BACK IN ONCE IMPLEMENTED
  // const handleFilterCollapseToggled = () => {
  //   setIsFiltersOpen(!isFiltersOpen);
  //   localStorage.setItem('hostFiltersOpen', JSON.stringify(!isFiltersOpen));
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
      <Alert isRounded isSuccess={hostCount > 0}>
        {hostCount} {hostCount === 1 ? 'Host' : 'Hosts'}
      </Alert>
      <div css={styles.orgPicker}>
        <OrganizationPicker isRightAligned />
      </div>
      <div css={[styles.endBlock, styles.listTypePicker]}>
        <GridTableViewPicker
          onChange={handleActiveListType}
          activeListType={activeListType}
        />
      </div>
    </div>
  );
};
