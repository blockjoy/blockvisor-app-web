import { styles } from './nodeFilters.styles';
import { styles as blockStyles } from './NodeFiltersBlock.styles';
import { Checkbox, Button } from '@shared/components';
import { SetterOrUpdater, useRecoilState, useRecoilValue } from 'recoil';
import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { nodeAtoms, FilterItem } from '../../../store/nodeAtoms';
import { UIFilterCriteria as FilterCriteria } from '@modules/client/grpc_client';
import { NodeFiltersHeader } from './NodeFiltersHeader';
import { NodeFiltersBlock } from './NodeFiltersBlock';
import { apiClient } from '@modules/client';
import IconClose from '@public/assets/icons/close-12.svg';

export const NodeFilters = ({
  loadNodes,
}: {
  loadNodes: (filters?: FilterCriteria) => void;
}) => {
  const [filtersBlockchain, setFiltersBlockchain] = useRecoilState(
    nodeAtoms.filtersBlockchain,
  );

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
      id: item.id,
      name: item.name,
      isChecked: false,
    }));
    setFiltersBlockchain(filtersBlockchainCopy);

    let filtersStatusCopy = filtersStatus.map((item) => ({
      id: item.id,
      name: item.name,
      isChecked: false,
    }));
    setFiltersStatus(filtersStatusCopy);

    let filtersTypeCopy = filtersType.map((item) => ({
      id: item.id,
      name: item.name,
      isChecked: false,
    }));
    setFiltersType(filtersTypeCopy);

    localStorage.removeItem('nodeFilters');

    const params = buildParams([], [], []);

    refreshNodeList(params);
  };

  const refreshNodeList = (params?: any) => {
    loadNodes(params);
  };

  const buildParams = (
    blockchain: FilterItem[],
    type: FilterItem[],
    status: FilterItem[],
  ) => {
    const blockchainFilters: string[] = blockchain
      .filter((item) => item.isChecked)
      .map((item) => item.id!);

    const typeFilters: string[] = type
      .filter((item) => item.isChecked)
      .map((item) => item.id!);

    const statusFilters: string[] = status
      .filter((item) => item.isChecked)
      .map((item) => item.id!);

    console.log('statusFilters', statusFilters);

    const params: FilterCriteria = {
      blockchain: blockchainFilters?.length ? blockchainFilters : undefined,
      node_type: typeFilters?.length ? typeFilters : undefined,
      node_status: statusFilters?.length ? statusFilters : undefined,
    };

    return params;
  };

  const loadFiltersFromLocalStorage = async () => {
    if (localStorage.getItem('nodeFilters')) {
      const localStorageFilters = JSON.parse(
        localStorage.getItem('nodeFilters')!,
      );

      const blockchain: FilterItem[] = localStorageFilters.blockchain;
      const status: FilterItem[] = localStorageFilters.status;
      const type: FilterItem[] = localStorageFilters.type;

      console.log({
        blockchain,
        status,
        type,
      });

      // if (blockchain?.length) {
      //   setFiltersBlockchain(blockchain);
      // }

      return {
        blockchain,
        status,
        type,
      };
    } else {
      return null;
    }
  };

  const handleUpdateClicked = () => {
    const params = buildParams(filtersBlockchain, filtersType, filtersStatus);

    console.log('params', params);

    const localStorageFilters = {
      blockchain: filtersBlockchain,
      type: filtersType,
      status: filtersStatus,
    };

    // console.log('test', localStorageFilters.status);

    localStorage.setItem('nodeFilters', JSON.stringify(localStorageFilters));

    refreshNodeList(params);
  };

  const handleHealthChanged = (health: string) => {
    setFiltersHealth(filtersHealth === health ? null : health);
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
      filterCount: blockchainFilterCount,
      filterList: filtersBlockchain,
      setFilterList: setFiltersBlockchain,
    },
    {
      name: 'Status',
      filterCount: statusFilterCount,
      filterList: filtersStatus,
      setFilterList: setFiltersStatus,
    },
    {
      name: 'Type',
      filterCount: typeFilterCount,
      filterList: filtersType,
      setFilterList: setFiltersType,
    },
  ];

  const isFiltersDirty = () => {
    const localStorageFilters = localStorage.getItem('nodeFilters');

    const currentFilters = {
      blockchain: filtersBlockchain,
      status: filtersStatus,
      type: filtersType,
    };

    const currentFiltersString = JSON.stringify(currentFilters);

    const parsedLocalStorageFilters = JSON.parse(localStorageFilters!);

    const localStorageFiltersString = JSON.stringify(parsedLocalStorageFilters);

    console.log('currentFiltersString', currentFilters);
    console.log('localStorageFiltersString', parsedLocalStorageFilters);

    console.log(
      'isFiltersDirty',
      JSON.stringify(parsedLocalStorageFilters) !==
        JSON.stringify(currentFilters),
    );

    const result =
      JSON.stringify(parsedLocalStorageFilters) !==
      JSON.stringify(currentFilters);

    return result;
  };

  useEffect(() => {
    (async () => {
      if (localStorage.getItem('nodeFiltersCollapsed') === 'false') {
        setIsFiltersCollapsed(false);
      } else {
        setIsFiltersCollapsed(true);
      }

      if (!localStorage.getItem('nodeFilters')) {
        loadLookups();
        refreshNodeList();
      } else {
        const localStorageFilters = await loadFiltersFromLocalStorage();

        setFiltersBlockchain(localStorageFilters?.blockchain!);
        setFiltersType(localStorageFilters?.type!);
        setFiltersStatus(localStorageFilters?.status!);

        const params = buildParams(
          localStorageFilters?.blockchain!,
          localStorageFilters?.type!,
          localStorageFilters?.status!,
        );

        // setFiltersStatus(status);
        // setFiltersType(type);

        console.log('params', params);

        refreshNodeList(params);
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
        <Button
          disabled={!isFiltersDirty()}
          display="block"
          style="primary"
          onClick={handleUpdateClicked}
          size="small"
        >
          Refresh
        </Button>
        <div css={styles.filters}>
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
    </div>
  );
};
