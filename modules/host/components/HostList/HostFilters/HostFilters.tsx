import { useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { styles } from './HostFilters.styles';
import {
  Skeleton,
  SkeletonGrid,
  Scrollbar,
  SvgIcon,
  FiltersBlock,
  FiltersRange,
  FiltersHeader,
} from '@shared/components';
import { hostAtoms, useHostUIContext, useHostFilters } from '@modules/host';
import IconClose from '@public/assets/icons/common/Close.svg';
import IconRefresh from '@public/assets/icons/common/Refresh.svg';
import { blockchainAtoms } from '@modules/node';

export const HostFilters = () => {
  const hostUIContext = useHostUIContext();
  const hostUIProps = useMemo(() => {
    return {
      setQueryParams: hostUIContext.setQueryParams,
      queryParams: hostUIContext.queryParams,
    };
  }, [hostUIContext]);

  const {
    filters,
    isDirty,
    tempFiltersTotal,
    updateFilters,
    resetFilters,
    changeTempFilters,
  } = useHostFilters(hostUIProps);

  const hostListLoadingState = useRecoilValue(hostAtoms.isLoading);
  const blockchainsLoadingState = useRecoilValue(
    blockchainAtoms.blockchainsLoadingState,
  );

  const [isFiltersOpen, setFiltersOpen] = useRecoilState(
    hostAtoms.isFiltersOpen,
  );

  const [openFilterId, setOpenFilterId] = useState('');

  const hasFiltersApplied = filters.some((filter) => {
    if (filter.type === 'check') {
      return filter.list?.some((l: any) => l.isChecked);
    } else if (filter.type === 'range') {
      return (
        filter.min !== filter.values?.[0] || filter.max !== filter.values?.[1]
      );
    }
  });

  const handleResetFilters = () => {
    resetFilters();
    setOpenFilterId('');
  };

  const handleFilterBlockClicked = (filterId: string) => {
    setOpenFilterId(filterId);
  };

  const handlePlusMinusClicked = (filterId: string, isOpen: boolean) => {
    const filterNameValue = isOpen ? '' : filterId;
    setOpenFilterId(filterNameValue);
  };

  const handleFiltersToggle = () => {
    setFiltersOpen(!isFiltersOpen);
  };

  const isLoading = !(
    hostListLoadingState === 'finished' &&
    blockchainsLoadingState === 'finished'
  );

  return (
    <div
      css={[styles.outerWrapper, isFiltersOpen && styles.outerWrapperCollapsed]}
    >
      <FiltersHeader
        isLoading={isLoading}
        filtersTotal={tempFiltersTotal}
        isFiltersOpen={isFiltersOpen}
        handleFiltersToggle={handleFiltersToggle}
      />

      {isLoading ? (
        isFiltersOpen && (
          <div css={[styles.skeleton]}>
            <SkeletonGrid>
              <Skeleton width="80%" />
              <Skeleton width="80%" />
            </SkeletonGrid>
          </div>
        )
      ) : (
        <div css={[styles.wrapper, isFiltersOpen && styles.wrapperOpen]}>
          <Scrollbar additionalStyles={[styles.filters]}>
            {filters.map((item: any) => {
              if (item.type === 'range')
                return (
                  <FiltersRange
                    key={item.id}
                    filter={item}
                    isOpen={item.id === openFilterId}
                    onPlusMinusClicked={handlePlusMinusClicked}
                    onFilterBlockClicked={handleFilterBlockClicked}
                  />
                );

              return (
                <FiltersBlock
                  key={item.id}
                  hasError={false}
                  isOpen={item.id === openFilterId}
                  filter={item}
                  onPlusMinusClicked={handlePlusMinusClicked}
                  onFilterBlockClicked={handleFilterBlockClicked}
                  onFilterChanged={changeTempFilters}
                />
              );
            })}
          </Scrollbar>
          <button
            css={styles.updateButton}
            type="button"
            disabled={!isDirty}
            onClick={updateFilters}
          >
            <SvgIcon size="12px">
              <IconRefresh />
            </SvgIcon>
            Apply
          </button>
          {hasFiltersApplied && (
            <button
              css={styles.resetButton}
              type="button"
              onClick={handleResetFilters}
            >
              <SvgIcon size="18px">
                <IconClose />
              </SvgIcon>
              Reset Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};
