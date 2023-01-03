import { isEqual } from 'lodash';
import { styles } from './nodeFilters.styles';
import { styles as blockStyles } from './NodeFiltersBlock.styles';
import { Checkbox } from '@shared/components';
import { SetterOrUpdater, useRecoilState } from 'recoil';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { nodeAtoms, FilterItem } from '../../../store/nodeAtoms';
import { NodeFiltersHeader } from './NodeFiltersHeader';
import { NodeFiltersBlock } from './NodeFiltersBlock';
import { apiClient } from '@modules/client';
import IconClose from '@public/assets/icons/close-12.svg';
import IconRefresh from '@public/assets/icons/refresh-12.svg';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { nodeStatusList } from '@shared/constants/lookups';

import { useNodeUIContext } from '@modules/node/ui/NodeUIContext';
import { InitialFilter, InitialQueryParams } from '@modules/node/ui/NodeUIHelpers';
import { buildParams, loadPersistedFilters } from '@modules/node/helpers/NodeHelpers';

export const NodeFilters = () => {
  const nodeUIContext = useNodeUIContext();
  const nodeUIProps = useMemo(() => {
    return {
      setQueryParams: nodeUIContext.setQueryParams,
      queryParams: nodeUIContext.queryParams,
    };
  }, [nodeUIContext]);

  const prepareFilter = (queryParams: InitialQueryParams, values: InitialFilter) => {
    const { blockchain, node_status, node_type } = values;
    const newQueryParams = { ...queryParams };

    const filter : InitialFilter = {
      blockchain: [],
      node_type: [],
      node_status: [],
    }

    filter.blockchain = blockchain !== undefined ? blockchain : [];
    filter.node_type = node_type !== undefined ? node_type : [];
    filter.node_status = node_status !== undefined ? node_status : [];

    newQueryParams.filter = filter;
    return newQueryParams;
  };

  const applyFilter = (values: any) => {
    const newQueryParams = prepareFilter(nodeUIProps.queryParams, values);
    if (!isEqual(newQueryParams, nodeUIProps.queryParams)) {
      newQueryParams.pagination.current_page = 1;
      nodeUIProps.setQueryParams(newQueryParams);
    }
  };

  const [filtersBlockchain, setFiltersBlockchain] = useRecoilState(
    nodeAtoms.filtersBlockchain,
  );

  const [isDirty, setIsDirty] = useState(false);

  const [filtersType, setFiltersType] = useRecoilState(nodeAtoms.filtersType);

  const [filtersStatus, setFiltersStatus] = useRecoilState(
    nodeAtoms.filtersStatus,
  );

  const [filtersHealth, setFiltersHealth] = useRecoilState(
    nodeAtoms.filtersHealth,
  );

  const [isFiltersOpen, setIsFiltersOpen] = useRecoilState(
    nodeAtoms.isFiltersOpen,
  );
  const [isFiltersCollapsed, setIsFiltersCollapsed] = useRecoilState(
    nodeAtoms.isFiltersCollapsed,
  );

  const [openFilterName, setOpenFilterName] =
    useState<string | 'Blockchain' | 'Status' | 'Type'>('');

  const loadLookups = async () => {
    const blockchains: any = await apiClient.getBlockchains();

    const mappedBlockchains: FilterItem[] = blockchains?.map((b: any) => ({
      id: b.id,
      name: b.name,
      isChecked: false,
    }));

    setFiltersBlockchain(mappedBlockchains);
  };

  const handleFilterChanged = (
    e: ChangeEvent<HTMLInputElement>,
    list: FilterItem[],
    setter: SetterOrUpdater<FilterItem[]>,
  ) => {
    if (!isDirty) {
      setIsDirty(true);
    }

    const { target } = e;
    const { id, checked } = target;

    let listCopy = Array.from(list);
    let itemFound = { ...listCopy?.find((item) => item.name === id) };
    let itemIndex = listCopy.findIndex((item) => item.name === id);

    itemFound.isChecked = checked;
    listCopy.splice(itemIndex, 1, itemFound);

    setter(listCopy);
  };

  const handleResetClicked = async () => {
    setFiltersHealth(null);

    let filtersBlockchainCopy = filtersBlockchain.map((item) => ({
      ...item,
      isChecked: false,
    }));
    setFiltersBlockchain(filtersBlockchainCopy);

    let filtersStatusCopy = filtersStatus.map((item) => ({
      ...item,
      isChecked: false,
    }));
    setFiltersStatus(filtersStatusCopy);

    let filtersTypeCopy = filtersType.map((item) => ({
      ...item,
      isChecked: false,
    }));
    setFiltersType(filtersTypeCopy);

    localStorage.removeItem('nodeFilters');

    const params = buildParams([], [], []);
    applyFilter(params);
  };

  const handleUpdateClicked = () => {
    const params = buildParams(filtersBlockchain, filtersType, filtersStatus);
    applyFilter(params);

    setIsDirty(false);

    const localStorageFilters = {
      blockchain: filtersBlockchain,
      type: filtersType,
      status: filtersStatus,
      health: filtersHealth,
    };

    localStorage.setItem('nodeFilters', JSON.stringify(localStorageFilters));
  };

  const handleHealthChanged = (health: string) => {
    if (!isDirty) {
      setIsDirty(true);
    }

    setFiltersHealth(filtersHealth === health ? null : health);

    const statuses = nodeStatusList
      .filter((item) => item.id !== 0)
      .map((item) => ({
        name: item.name,
        // id: item.id.toString()!,
        id: item.name.toString().toLowerCase()!,
        isChecked:
          filtersHealth === health
            ? false
            : health === 'online'
            ? item.isOnline
            : !item.isOnline,
        isOnline: item.isOnline,
      }));

    setFiltersStatus(statuses);
  };

  const handleFilterBlockClicked = (filterName: string) => {
    setOpenFilterName(filterName);
  };

  const handlePlusMinusClicked = (filterName: string, isOpen: boolean) => {
    if (isOpen) {
      setOpenFilterName('');
    } else {
      setOpenFilterName(filterName);
    }
  };

  const blockchainFilterCount = filtersBlockchain?.filter(
    (item) => item.isChecked,
  ).length;

  const typeFilterCount = filtersType?.filter((item) => item.isChecked).length;

  const statusFilterCount = filtersStatus?.filter(
    (item) => item.isChecked,
  ).length;

  const filters = [
    {
      name: 'Blockchain',
      isDisabled: false,
      filterCount: blockchainFilterCount,
      filterList: filtersBlockchain,
      setFilterList: setFiltersBlockchain,
    },
    {
      name: 'Status',
      isDisabled: !!filtersHealth,
      filterCount: statusFilterCount,
      filterList: filtersStatus,
      setFilterList: setFiltersStatus,
    },
    {
      name: 'Type',
      isDisabled: false,
      filterCount: typeFilterCount,
      filterList: filtersType,
      setFilterList: setFiltersType,
    },
  ];

  useEffect(() => {
    (() => {
      if (localStorage.getItem('nodeFiltersCollapsed') === 'false') {
        setIsFiltersCollapsed(false);
      } else {
        setIsFiltersCollapsed(true);
      }

      if (!localStorage.getItem('nodeFilters')) {
        loadLookups();
      } else {
        const localStorageFilters = loadPersistedFilters();

        setFiltersBlockchain(localStorageFilters?.blockchain!);
        setFiltersType(localStorageFilters?.type!);
        setFiltersStatus(localStorageFilters?.status!);
        setFiltersHealth(localStorageFilters?.health || '');
      }
    })();
  }, []);

  return (
    <div
      css={[
        styles.outerWrapper,
        isFiltersCollapsed && styles.outerWrapperCollapsed,
      ]}
    >
      <NodeFiltersHeader />
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
        <PerfectScrollbar css={styles.filters}>
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
        </PerfectScrollbar>
        <button
          css={styles.resetButton}
          type="button"
          onClick={handleResetClicked}
        >
          <IconClose />
          Reset Filters
        </button>
      </div>
    </div>
  );
};
