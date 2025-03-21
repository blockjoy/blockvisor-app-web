import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  FiltersBlock,
  FiltersRange,
  Scrollbar,
  Search,
  Skeleton,
  SkeletonGrid,
  SvgIcon,
} from '@shared/components';
import { protocolSelectors } from '@modules/node';
import { styles } from './Filters.styles';
import IconClose from '@public/assets/icons/common/Close.svg';
import IconRefresh from '@public/assets/icons/common/Refresh.svg';

type FiltersProps = {
  filters: FilterItem[];
  isFiltersOpen: boolean;
  resetFilters: () => Promise<void>;
  changeTempFilters: (type: string, value: string) => void;
  updateFilters: () => Promise<void>;
  isDirty: boolean;
  isLoading: boolean;
  handleSearch?: (value: string) => void;
  searchValue?: string;
};

export const Filters = ({
  filters,
  isFiltersOpen,
  resetFilters,
  changeTempFilters,
  updateFilters,
  isDirty,
  isLoading,
  handleSearch,
  searchValue,
}: FiltersProps) => {
  const hasBlockchainError = useRecoilValue(
    protocolSelectors.protocolsHasError,
  );

  const [openFilterId, setOpenFilterId] = useState('');

  const handleResetFilters = async () => {
    await resetFilters();
    setOpenFilterId('');
  };

  const handleFilterBlockClicked = (filterId: string) => {
    setOpenFilterId(filterId);
  };

  const handlePlusMinusClicked = (filterId: string, isOpen: boolean) => {
    const filterIdValue = isOpen ? '' : filterId;
    setOpenFilterId(filterIdValue);
  };

  const hasFiltersApplied = filters.some((filter) =>
    filter.list?.some((l: FilterListItem) => l.isChecked),
  );

  const handleFiltering = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters();
  };

  return (
    <>
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
          <form css={styles.form}>
            {handleSearch ? (
              <Search
                onInput={handleSearch}
                value={searchValue}
                size="small"
                additionalStyles={styles.search}
              />
            ) : null}
            {filters.length ? (
              <Scrollbar additionalStyles={[styles.filters]}>
                {filters.map((item) => {
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
                      hasError={item.id === 'blockchain' && hasBlockchainError}
                      isOpen={item.id === openFilterId}
                      filter={item}
                      onPlusMinusClicked={handlePlusMinusClicked}
                      onFilterBlockClicked={handleFilterBlockClicked}
                      onFilterChanged={changeTempFilters}
                    />
                  );
                })}
              </Scrollbar>
            ) : null}
            <button
              css={styles.updateButton}
              type="submit"
              disabled={!isDirty}
              onClick={handleFiltering}
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
    </>
  );
};
