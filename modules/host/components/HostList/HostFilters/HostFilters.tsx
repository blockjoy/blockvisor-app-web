import { ChangeEvent, useMemo, useRef, useState } from 'react';
import { SetterOrUpdater, useRecoilState, useRecoilValue } from 'recoil';
import { styles } from './HostFilters.styles';
import {
  Skeleton,
  SkeletonGrid,
  Scrollbar,
  // SvgIcon,
  FiltersBlock,
  FiltersRange,
  FiltersHeader,
} from '@shared/components';
import { blockchainSelectors } from '@modules/node';
import {
  organizationAtoms,
  useDefaultOrganization,
  useSwitchOrganization,
} from '@modules/organization';
import {
  hostAtoms,
  hostSelectors,
  useHostUIContext,
  useFilters,
} from '@modules/host';
// import IconClose from '@public/assets/icons/common/Close.svg';
// import IconRefresh from '@public/assets/icons/common/Refresh.svg';

export type HostFiltersProps = {
  isLoading: LoadingState;
};

export const HostFilters = ({ isLoading }: HostFiltersProps) => {
  const hostUIContext = useHostUIContext();
  const hostUIProps = useMemo(() => {
    return {
      setQueryParams: hostUIContext.setQueryParams,
      queryParams: hostUIContext.queryParams,
    };
  }, [hostUIContext]);

  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );

  const { filters, updateFilters, removeFilters, resetFilters } =
    useFilters(hostUIProps);

  const { switchOrganization } = useSwitchOrganization();

  const [isDirty, setIsDirty] = useState(false);

  const hasBlockchainError = useRecoilValue(
    blockchainSelectors.blockchainsHasError,
  );

  const [isFiltersOpen, setFiltersOpen] = useRecoilState(
    hostAtoms.isFiltersOpen,
  );

  const filtersTotal = useRecoilValue(hostSelectors.filtersTotal);

  const [openFilterName, setOpenFilterName] =
    useState<string | 'Memory' | 'Status' | 'CPU Cores' | 'Disk space'>('');

  const isCompleted = useRef(false);

  const handleFilterChanged = (
    e: ChangeEvent<HTMLInputElement>,
    list: FilterItem[],
    setFilterList: SetterOrUpdater<FilterItem[]>,
  ) => {
    if (!isDirty && !!setFilterList) {
      setIsDirty(true);
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

  const handleTouched = () => setIsDirty(true);

  // TODO: ADD BACK IN ONCE LUUK HAS IMPLEMENTED THEM
  // const hasFiltersApplied = filters.some((filter: any) => {
  //   if (filter.name === 'Organization') return false;
  //   else if (filter.type === 'check') {
  //     return filter.filterList.some((l: any) => l.isChecked);
  //   } else if (filter.type === 'range') {
  //     return filter.min !== filter.values[0] || filter.max !== filter.values[1];
  //   }
  // });

  // const handleResetFilters = () => {
  //   setIsDirty(false);
  //   resetFilters();
  //   removeFilters();
  //   setOpenFilterName('');
  // };

  // const handleUpdateClicked = () => {
  //   updateFilters();
  //   setIsDirty(false);
  // };

  const handleFilterBlockClicked = (filterName: string) => {
    setOpenFilterName(filterName);
  };

  const handlePlusMinusClicked = (filterName: string, isOpen: boolean) => {
    const filterNameValue = isOpen ? '' : filterName;
    setOpenFilterName(filterNameValue);
  };

  const handleFiltersToggle = () => {
    setFiltersOpen(!isFiltersOpen);
    localStorage.setItem('hostFiltersOpen', JSON.stringify(!isFiltersOpen));
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
            {filters.map((item: any) => {
              if (item.type === 'check')
                return (
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
                );
              else if (item.type === 'range')
                return (
                  <FiltersRange
                    key={item.name}
                    name={item.name}
                    step={item.step}
                    min={item.min}
                    max={item.max}
                    values={item.values}
                    customValues={item.customValues}
                    setValues={item.setValues}
                    isOpen={item.name === openFilterName}
                    onPlusMinusClicked={handlePlusMinusClicked}
                    onFilterBlockClicked={handleFilterBlockClicked}
                    onStateChange={handleTouched}
                    formatter={item.formatter}
                  />
                );
              else return null;
            })}
          </Scrollbar>
          {/* TODO: ADD BACK IN ONCE LUUK HAS IMPLEMENTED THEM */}
          {/* <button
            css={styles.updateButton}
            type="button"
            disabled={!isDirty}
            onClick={handleUpdateClicked}
          >
            <IconRefresh />
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
          )} */}
        </div>
      )}
    </div>
  );
};
