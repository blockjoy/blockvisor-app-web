import { useRecoilState } from 'recoil';
import { Alert, OrganizationPicker, ViewPicker } from '@shared/components';
import { styles } from './HostListHeader.styles';
import { hostAtoms, HostSorting, useHostList } from '@modules/host';

export const HostListHeader = () => {
  const [activeView, setactiveView] = useRecoilState(hostAtoms.activeView);

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
      <Alert
        isRounded
        isSuccess={hostCount > 0}
        additionalStyles={[styles.alert]}
      >
        {hostCount} {hostCount === 1 ? 'Host' : 'Hosts'}
      </Alert>

      <div css={styles.sorting}>
        <HostSorting />
      </div>

      <div css={styles.orgPicker}>
        <OrganizationPicker isRightAligned maxWidth="140px" />
      </div>

      <div css={[styles.endBlock, styles.listTypePicker]}>
        <ViewPicker
          activeView={activeView}
          handleActiveView={handleActiveView}
        />
      </div>
    </div>
  );
};
