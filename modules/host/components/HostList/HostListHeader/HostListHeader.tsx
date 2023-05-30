import { useRecoilState, useRecoilValue } from 'recoil';
import {
  FiltersHeaderIconText,
  GridTableViewPicker,
  Skeleton,
} from '@shared/components';
import { styles } from './HostListHeader.styles';
import { hostAtoms } from '@modules/host/store/hostAtoms';
import { hostSelectors } from '@modules/host/store/hostSelectors';

export const HostListHeader = () => {
  const [activeListType, setActiveListType] = useRecoilState(
    hostAtoms.activeListType,
  );

  const [isFiltersOpen, setIsFiltersOpen] = useRecoilState(
    hostAtoms.isFiltersOpen,
  );
  const filtersTotal = useRecoilValue(hostSelectors.filtersTotal);

  const isLoading = useRecoilValue(hostAtoms.isLoading);

  const handleActiveListType = (type: string) => {
    setActiveListType(type);
  };

  const handleFilterCollapseToggled = () => {
    setIsFiltersOpen(!isFiltersOpen);
    localStorage.setItem('nodeFiltersOpen', JSON.stringify(true));
  };

  return (
    <div css={styles.wrapper}>
      {!isFiltersOpen && (
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
      )}

      <div css={[styles.endBlock, styles.listTypePicker]}>
        <GridTableViewPicker
          onChange={handleActiveListType}
          activeListType={activeListType}
        />
      </div>
    </div>
  );
};
