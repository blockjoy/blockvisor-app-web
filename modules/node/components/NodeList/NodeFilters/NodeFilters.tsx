import { styles } from './nodeFilters.styles';
import { styles as blockStyles } from './NodeFiltersBlock.styles';
import {
  Checkbox,
  Skeleton,
  SkeletonGrid,
  Scrollbar,
} from '@shared/components';
import { SetterOrUpdater, useRecoilValue } from 'recoil';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { nodeAtoms, FilterItem } from '../../../store/nodeAtoms';
import { NodeFiltersHeader } from './NodeFiltersHeader';
import { NodeFiltersBlock } from './NodeFiltersBlock';
import IconClose from '@public/assets/icons/close-12.svg';
import IconRefresh from '@public/assets/icons/refresh-12.svg';
import { useNodeUIContext } from '@modules/node/ui/NodeUIContext';
import { organizationAtoms } from '@modules/organization';
import { useFilters } from '@modules/node/hooks/useFilters';
import { blockchainSelectors } from '@modules/node/store/blockchains';

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

  const {
    filters,
    updateFilters,
    removeFilters,
    resetFilters,
    updateHealthFilter,
    updateStatusFilterByHealth,
    filtersHealth,
  } = useFilters(nodeUIProps);

  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );
  const currentOrganization = useRef(defaultOrganization);

  const [isDirty, setIsDirty] = useState(false);

  const hasBlockchainError = useRecoilValue(
    blockchainSelectors.blockchainsHasError,
  );

  const isFiltersOpen = useRecoilValue(nodeAtoms.isFiltersOpen);

  const [openFilterName, setOpenFilterName] =
    useState<string | 'Blockchain' | 'Status' | 'Type'>('');

  const isCompleted = useRef(false);

  useEffect(() => {
    if (currentOrganization.current?.id !== defaultOrganization?.id) {
      handleResetFilters();
      currentOrganization.current = defaultOrganization;
    }
  }, [defaultOrganization?.id]);

  const handleFilterChanged = (
    e: ChangeEvent<HTMLInputElement>,
    list: FilterItem[],
    setter: SetterOrUpdater<FilterItem[]>,
  ) => {
    if (!isDirty) {
      setIsDirty(true);
    }

    const filtersList = list.map((item) => {
      if (item.name === e.target.id) {
        return {
          ...item,
          isChecked: !item.isChecked,
        };
      }

      return item;
    });

    setter(filtersList);
  };

  const handleResetFilters = () => {
    resetFilters();
    removeFilters();
  };

  const handleUpdateClicked = () => {
    updateFilters();

    setIsDirty(false);
  };

  const handleHealthChanged = (health: string) => {
    updateHealthFilter(health);
    updateStatusFilterByHealth(health);

    if (!isDirty) setIsDirty(true);
  };

  const handleFilterBlockClicked = (filterName: string) => {
    setOpenFilterName(filterName);
  };

  const handlePlusMinusClicked = (filterName: string, isOpen: boolean) => {
    const filterNameValue = isOpen ? '' : filterName;
    setOpenFilterName(filterNameValue);
  };

  if (isLoading === 'finished') isCompleted.current = true;

  return (
    <div
      css={[
        styles.outerWrapper,
        !isFiltersOpen && styles.outerWrapperCollapsed,
      ]}
    >
      <NodeFiltersHeader isLoading={!isCompleted.current} />

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
          <button
            css={styles.updateButton}
            type="button"
            disabled={!isDirty}
            onClick={handleUpdateClicked}
          >
            <IconRefresh />
            Apply
          </button>
          <Scrollbar additionalStyles={[styles.filters]}>
            <div
              css={blockStyles.filterBlock}
              onClick={() => setOpenFilterName('')}
            >
              <label css={blockStyles.labelHeader}>
                <span css={blockStyles.labelText}>Health</span>
              </label>
              <div css={[blockStyles.checkboxList]}>
                <div css={blockStyles.checkboxRow}>
                  <Checkbox
                    onChange={() => handleHealthChanged('online')}
                    name="healthOnline"
                    checked={filtersHealth === 'online'}
                  >
                    Online
                  </Checkbox>
                </div>
                <div css={blockStyles.checkboxRow}>
                  <Checkbox
                    onChange={() => handleHealthChanged('offline')}
                    name="healthOffline"
                    checked={filtersHealth === 'offline'}
                  >
                    Offline
                  </Checkbox>
                </div>
              </div>
            </div>
            {filters.map((item) => (
              <NodeFiltersBlock
                hasError={item.name === 'Blockchain' && hasBlockchainError}
                isDisabled={item.isDisabled}
                isOpen={item.name === openFilterName}
                onPlusMinusClicked={handlePlusMinusClicked}
                onFilterBlockClicked={handleFilterBlockClicked}
                key={item.name}
                name={item.name}
                filterCount={item.filterCount}
                filterList={item.filterList}
                setFilterList={item.setFilterList}
                onFilterChanged={handleFilterChanged}
              />
            ))}
          </Scrollbar>
          <button
            css={styles.resetButton}
            type="button"
            onClick={handleResetFilters}
          >
            <IconClose />
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
