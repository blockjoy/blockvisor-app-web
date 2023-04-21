import { nodeStatusList } from '@shared/constants/lookups';
import { isEqual } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { FilterItem, nodeAtoms } from '../store/nodeAtoms';
import { NodeUIProps } from '../ui/NodeUIContext';
import { InitialFilter, InitialQueryParams } from '../ui/NodeUIHelpers';
import { buildParams } from '../utils';

export const useFilters = (nodeUIProps: NodeUIProps) => {
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

  const filtersBlockchainTotal = useRecoilValue(
    nodeAtoms.filtersBlockchainTotal,
  );
  const filtersTypeTotal = useRecoilValue(nodeAtoms.filtersTypeTotal);
  const filtersStatusTotal = useRecoilValue(nodeAtoms.filtersStatusTotal);

  const prepareFilter = (
    queryParams: InitialQueryParams,
    values: InitialFilter,
  ) => {
    const { blockchain, nodeStatus, nodeType } = values;
    const newQueryParams = { ...queryParams };

    const filter: InitialFilter = {
      blockchain: [],
      nodeType: [],
      nodeStatus: [],
    };

    filter.blockchain = blockchain !== undefined ? blockchain : [];
    filter.nodeType = nodeType !== undefined ? nodeType : [];
    filter.nodeStatus = nodeStatus !== undefined ? nodeStatus : [];

    newQueryParams.filter = filter;
    return newQueryParams;
  };

  const applyFilter = (values: InitialFilter) => {
    const newQueryParams = prepareFilter(nodeUIProps.queryParams, values);
    if (!isEqual(newQueryParams, nodeUIProps.queryParams)) {
      newQueryParams.pagination.current_page = 1;
      nodeUIProps.setQueryParams(newQueryParams);
    }
  };

  const updateFilters = () => {
    const params = buildParams(filtersBlockchain, filtersType, filtersStatus);
    applyFilter(params);

    const filtersToUpdate = {
      blockchain: filtersBlockchain,
      type: filtersType,
      status: filtersStatus,
      health: filtersHealth,
    };

    localStorage.setItem('nodeFilters', JSON.stringify(filtersToUpdate));
  };

  const removeFilters = () => {
    setFiltersHealth(null);

    let filtersBlockchainCopy = filtersBlockchain.map((item: FilterItem) => ({
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
  };

  const resetFilters = () => {
    const params = buildParams([], [], []);
    applyFilter(params);
  };

  const updateHealthFilter = (health: string) => {
    setFiltersHealth(filtersHealth === health ? null : health);
  };

  const updateStatusFilterByHealth = (health: string) => {
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

  const filters = [
    {
      name: 'Blockchain',
      isDisabled: false,
      filterCount: filtersBlockchainTotal,
      filterList: filtersBlockchain,
      setFilterList: setFiltersBlockchain,
    },
    {
      name: 'Status',
      isDisabled: !!filtersHealth,
      filterCount: filtersStatusTotal,
      filterList: filtersStatus,
      setFilterList: setFiltersStatus,
    },
    {
      name: 'Type',
      isDisabled: false,
      filterCount: filtersTypeTotal,
      filterList: filtersType,
      setFilterList: setFiltersType,
    },
  ];

  return {
    filters,

    applyFilter,
    updateFilters,
    removeFilters,

    resetFilters,

    updateHealthFilter,
    updateStatusFilterByHealth,

    filtersHealth,
  };
};
