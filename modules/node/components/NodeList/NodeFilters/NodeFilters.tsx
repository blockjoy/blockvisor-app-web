import { FormEvent, useMemo, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import IconClose from '@public/assets/icons/common/Close.svg';
import IconRefresh from '@public/assets/icons/common/Refresh.svg';
import { styles } from './nodeFilters2.styles';
import {
  Skeleton,
  SkeletonGrid,
  Scrollbar,
  SvgIcon,
  FiltersHeader,
  FiltersBlock,
  Search,
} from '@shared/components';
import {
  nodeAtoms,
  blockchainSelectors,
  useNodeFilters,
  useNodeUIContext,
  blockchainAtoms,
  nodeSelectors,
} from '@modules/node';
import { layoutAtoms, layoutSelectors } from '@modules/layout';
import { useSettings } from '@modules/settings';
import { useViewport } from '@shared/index';

export const NodeFilters = () => {
  const nodeUIContext = useNodeUIContext();
  const nodeUIProps = useMemo(() => {
    return {
      setQueryParams: nodeUIContext.setQueryParams,
      queryParams: nodeUIContext.queryParams,
    };
  }, [nodeUIContext]);

  const {
    filters,
    isDirty,
    tempSearchQuery,
    tempFiltersTotal,
    updateFilters,
    resetFilters,
    changeTempFilters,
  } = useNodeFilters(nodeUIProps);

  const isCompleted = useRef(false);

  const hasBlockchainError = useRecoilValue(
    blockchainSelectors.blockchainsHasError,
  );
  const nodeListLoadingState = useRecoilValue(nodeAtoms.isLoading);
  const blockchainsLoadingState = useRecoilValue(
    blockchainAtoms.blockchainsLoadingState,
  );
  const isFiltersOpen = useRecoilValue(layoutSelectors.isNodeFiltersOpen);
  const [isFiltersOpenMobile, setIsFiltersOpenMobile] = useRecoilState(
    layoutAtoms.isNodeFiltersOpenMobile,
  );
  const filtersBlockchainSelectedIds = useRecoilValue(
    nodeSelectors.filtersBlockchainSelectedIds,
  );

  const [openFilterId, setOpenFilterId] = useState('');

  const { updateSettings } = useSettings();
  const { isXlrg } = useViewport();

  const hasFiltersApplied =
    filters.some((filter) =>
      filter.list?.some((l: FilterListItem) => l.isChecked),
    ) || Boolean(tempSearchQuery.length);

  const handleResetFilters = () => {
    resetFilters();
    setOpenFilterId('');
  };

  const handleFilterBlockClicked = (filterId: string) => {
    setOpenFilterId(filterId);
  };

  const handlePlusMinusClicked = (filterId: string, isOpen: boolean) => {
    const filterIdValue = isOpen ? '' : filterId;
    setOpenFilterId(filterIdValue);
  };

  const handleFiltersToggle = () => {
    if (isXlrg) setIsFiltersOpenMobile(!isFiltersOpenMobile);
    else updateSettings('layout', { 'nodes.filters.isOpen': !isFiltersOpen });
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateFilters();
  };

  const handleSearch = (value: string) => changeTempFilters('keyword', value);

  if (
    nodeListLoadingState === 'finished' &&
    (blockchainsLoadingState === 'finished' ||
      !filtersBlockchainSelectedIds.length)
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
      />
      {!isCompleted.current ? (
        isOpen && (
          <div css={[styles.skeleton]}>
            <SkeletonGrid>
              <Skeleton width="80%" />
              <Skeleton width="80%" />
            </SkeletonGrid>
          </div>
        )
      ) : (
        <div css={[styles.wrapper, isOpen && styles.wrapperOpen]}>
          <form css={styles.form}>
            <Search
              onInput={handleSearch}
              value={tempSearchQuery}
              size="small"
              additionalStyles={styles.search}
            />
            <Scrollbar additionalStyles={[styles.filters]}>
              {filters.map((item) => (
                <FiltersBlock
                  key={item.id}
                  hasError={item.id === 'blockchain' && hasBlockchainError}
                  isOpen={item.id === openFilterId}
                  filter={item}
                  onPlusMinusClicked={handlePlusMinusClicked}
                  onFilterBlockClicked={handleFilterBlockClicked}
                  onFilterChanged={changeTempFilters}
                />
              ))}
            </Scrollbar>
            <button
              css={styles.updateButton}
              type="submit"
              disabled={!isDirty}
              onClick={handleSubmit}
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
