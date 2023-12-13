import { ChangeEvent, useMemo, useRef, useState } from 'react';
import { SetterOrUpdater, useRecoilState, useRecoilValue } from 'recoil';
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
import { useSwitchOrganization } from '@modules/organization';
import {
  nodeAtoms,
  blockchainSelectors,
  useFilters,
  useNodeUIContext,
} from '@modules/node';

export type NodeFiltersProps = {
  isLoading: LoadingState;
};

export const NodeFilters = ({ isLoading }: NodeFiltersProps) => {
  const nodeUIContext = useNodeUIContext();
  const nodeUIProps = useMemo(() => {
    return {
      setQueryParams: nodeUIContext.setQueryParams,
      queryParams: nodeUIContext.queryParams,
    };
  }, [nodeUIContext]);

  const { filters, updateFilters, removeFilters, resetFilters } =
    useFilters(nodeUIProps);

  const { switchOrganization } = useSwitchOrganization();

  const [isDirty, setIsDirty] = useState(false);

  const hasBlockchainError = useRecoilValue(
    blockchainSelectors.blockchainsHasError,
  );

  const [isFiltersOpen, setFiltersOpen] = useRecoilState(
    nodeAtoms.isFiltersOpen,
  );

  const filtersTotal = useRecoilValue(nodeAtoms.filtersTotal);

  const [openFilterName, setOpenFilterName] =
    useState<string | 'Blockchain' | 'Status' | 'Type'>('');

  const isCompleted = useRef(false);

  const handleFilterChanged = (
    e: ChangeEvent<HTMLInputElement>,
    list: FilterItem[],
    setFilterList: SetterOrUpdater<FilterItem[]>,
  ) => {
    if (!isDirty && !!setFilterList) {
      setIsDirty(true);
    }

    if (!setFilterList) {
      const foundOrg = list.find((item) => item.id === e.target.id);
      switchOrganization(foundOrg?.id!, foundOrg?.name!);
      return;
    }

    const filtersList = list.map((item) => {
      if (item.id === e.target.id) {
        return {
          ...item,
          isChecked: !item.isChecked,
        };
      }

      return item;
    });

    setFilterList(filtersList);
  };

  const hasFiltersApplied = filters.some(
    (filter) =>
      filter.name !== 'Organization' &&
      filter.filterList.some((l) => l.isChecked),
  );

  const handleResetFilters = () => {
    setIsDirty(false);
    resetFilters();
    removeFilters();
    setOpenFilterName('');
  };

  const handleUpdateClicked = () => {
    updateFilters();
    setIsDirty(false);
  };

  const handleFilterBlockClicked = (filterName: string) => {
    setOpenFilterName(filterName);
  };

  const handlePlusMinusClicked = (filterName: string, isOpen: boolean) => {
    const filterNameValue = isOpen ? '' : filterName;
    setOpenFilterName(filterNameValue);
  };

  const handleFiltersToggle = () => {
    setFiltersOpen(!isFiltersOpen);

    localStorage.setItem('nodeFiltersOpen', JSON.stringify(false));
  };

  if (isLoading === 'finished') isCompleted.current = true;

  return (
    <div
      css={[
        styles.outerWrapper,
        !isFiltersOpen && styles.outerWrapperCollapsed,
      ]}
    >
      <FiltersHeader
        isLoading={!isCompleted.current}
        filtersTotal={filtersTotal}
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
                hasError={item.name === 'Blockchain' && hasBlockchainError}
                isDisabled={item.isDisabled}
                isOpen={item.name === openFilterName}
                onPlusMinusClicked={handlePlusMinusClicked}
                onFilterBlockClicked={handleFilterBlockClicked}
                key={item.name}
                name={item.name}
                filterCount={item.filterCount}
                filterList={item.filterList}
                setFilterList={item?.setFilterList!}
                onFilterChanged={handleFilterChanged}
              />
            ))}
          </Scrollbar>
          <button
            css={styles.updateButton}
            type="button"
            disabled={!isDirty}
            onClick={handleUpdateClicked}
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
