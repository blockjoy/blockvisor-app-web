import { useMemo, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import IconClose from '@public/assets/icons/common/Close.svg';
import IconRefresh from '@public/assets/icons/common/Refresh.svg';
import { styles } from './nodeFilters.styles';
import {
  Skeleton,
  SkeletonGrid,
  Scrollbar,
  SvgIcon,
  FiltersHeader,
  FiltersBlock,
} from '@shared/components';
import {
  nodeAtoms,
  blockchainSelectors,
  useNodeFilters,
  useNodeUIContext,
  blockchainAtoms,
} from '@modules/node';

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

  const [isFiltersOpen, setFiltersOpen] = useRecoilState(
    nodeAtoms.isFiltersOpen,
  );

  const [openFilterId, setOpenFilterId] = useState('');

  const hasFiltersApplied = filters.some((filter) =>
    filter.list?.some((l: FilterListItem) => l.isChecked),
  );

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
    setFiltersOpen(!isFiltersOpen);
  };

  if (
    nodeListLoadingState === 'finished' &&
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
