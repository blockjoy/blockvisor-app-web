import { styles } from './nodeFilters.styles';
import { Skeleton, SkeletonGrid, Scrollbar, SvgIcon } from '@shared/components';
import { SetterOrUpdater, useRecoilValue } from 'recoil';
import { ChangeEvent, useMemo, useRef, useState } from 'react';
import { nodeAtoms, FilterItem } from '../../../store/nodeAtoms';
import { NodeFiltersHeader } from './NodeFiltersHeader';
import { NodeFiltersBlock } from './NodeFiltersBlock';
import IconClose from '@public/assets/icons/close-12.svg';
import IconRefresh from '@public/assets/icons/refresh-12.svg';
import { useNodeUIContext } from '@modules/node/ui/NodeUIContext';
import { useDefaultOrganization } from '@modules/organization';
import { useFilters } from '@modules/node/hooks/useFilters';
import { blockchainSelectors } from '@modules/node/store/blockchains';
import { useSwitchOrganization } from '@modules/organization/hooks/useSwitchOrganization';

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
  const { defaultOrganization } = useDefaultOrganization();

  const [isDirty, setIsDirty] = useState(false);

  const hasBlockchainError = useRecoilValue(
    blockchainSelectors.blockchainsHasError,
  );

  const isFiltersOpen = useRecoilValue(nodeAtoms.isFiltersOpen);

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
      const foundOrg = list.find((item) => item.name === e.target.id);
      switchOrganization(foundOrg?.id!, foundOrg?.name!);
      return;
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

    setFilterList(filtersList);
  };

  const handleResetFilters = () => {
    resetFilters();
    removeFilters();
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
          <Scrollbar additionalStyles={[styles.filters]}>
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
                setFilterList={item?.setFilterList!}
                setOrganization={switchOrganization}
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
            <IconRefresh />
            Apply
          </button>
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
        </div>
      )}
    </div>
  );
};
