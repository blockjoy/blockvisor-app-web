import { useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isMobile } from 'react-device-detect';
import { styles } from './HostFilters.styles';
import {
  Skeleton,
  SkeletonGrid,
  Scrollbar,
  SvgIcon,
  FiltersBlock,
  FiltersRange,
  FiltersHeader,
  Search,
} from '@shared/components';
import { hostAtoms, useHostUIContext, useHostFilters } from '@modules/host';
import IconClose from '@public/assets/icons/common/Close.svg';
import IconRefresh from '@public/assets/icons/common/Refresh.svg';
import { blockchainAtoms } from '@modules/node';
import { layoutSelectors, useLayout } from '@modules/layout';

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

  const isFiltersOpen = useRecoilValue(layoutSelectors.isHostFiltersOpen);

  const [openFilterId, setOpenFilterId] = useState('');

  const { updateLayout } = useLayout();

  useEffect(() => {
    if (isMobile) updateLayout('host.filters.isOpen', false);
  }, []);

  const hasFiltersApplied =
    filters.some((filter) => {
      if (filter.type === 'check') {
        return filter.list?.some((l: any) => l.isChecked);
      } else if (filter.type === 'range') {
        return (
          filter.min !== filter.values?.[0] || filter.max !== filter.values?.[1]
        );
      }
    }) || Boolean(tempSearchQuery.length);

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
    updateLayout('host.filters.isOpen', !isFiltersOpen);
  };

  const handleSearch = (value: string) => changeTempFilters('keyword', value);

  if (
    hostListLoadingState === 'finished' &&
    blockchainsLoadingState === 'finished'
  )
    isCompleted.current = true;

  return (
    <div
      css={[styles.outerWrapper, isFiltersOpen && styles.outerWrapperCollapsed]}
    >
      <FiltersHeader
        isLoading={!isCompleted.current}
        filtersTotal={tempFiltersTotal}
        isFiltersOpen={isFiltersOpen}
        handleFiltersToggle={handleFiltersToggle}
      />

      {!isCompleted.current ? (
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
          <form css={styles.form}>
            <Search
              onInput={handleSearch}
              value={tempSearchQuery}
              size="small"
              additionalStyles={styles.search}
            />
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
              type="submit"
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
          </form>
        </div>
      )}
    </div>
  );
};
