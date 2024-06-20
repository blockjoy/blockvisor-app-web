import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import isEqual from 'lodash/isEqual';
import { UINodeFilterCriteria } from '@modules/grpc/clients/nodeClient';
import { NodeUIProps, nodeSelectors, nodeAtoms } from '@modules/node';
import { NODE_FILTERS_DEFAULT } from '@shared/constants/lookups';
import { useSettings } from '@modules/settings';

type UseNodeFiltersHook = {
  isDirty: boolean;
  filters: FilterItem[];
  tempSearchQuery: string;
  tempFiltersTotal: number;
  changeTempFilters: (type: string, value: string) => void;
  updateFilters: VoidFunction;
  resetFilters: VoidFunction;
};

export const useNodeFilters = (
  nodeUIProps: NodeUIProps,
): UseNodeFiltersHook => {
  const filters = useRecoilValue(nodeSelectors.filters);

  const [tempFilters, setTempFilters] = useState<UINodeFilterCriteria>(filters);
  const [tempFiltersTotal, setTempFiltersTotal] = useRecoilState(
    nodeAtoms.filtersTempTotal,
  );

  const filtersBlockchainAll = useRecoilValue(
    nodeSelectors.filtersBlockchainAll(tempFilters.blockchain!),
  );
  const filtersStatusAll = useRecoilValue(
    nodeSelectors.filtersStatusAll(tempFilters.nodeStatus!),
  );
  // const filtersTypeAll = useRecoilValue(
  //   nodeSelectors.filtersTypeAll(tempFilters.nodeType!),
  // );
  const filtersNetworksAll = useRecoilValue(
    nodeSelectors.filtersNetworksAll(tempFilters.networks!),
  );
  const setSearchQuery = useSetRecoilState(nodeAtoms.filtersSearchQuery);

  const { updateSettings, removeSettings } = useSettings();

  useEffect(() => {
    const total = Object.values(tempFilters).reduce(
      (acc, current) => acc + (current.length ? 1 : 0),
      0,
    );

    setTempFiltersTotal(total);
  }, [tempFilters]);

  const applyFilter = (values: UINodeFilterCriteria = NODE_FILTERS_DEFAULT) => {
    const newQueryParams = {
      ...nodeUIProps.queryParams,
      filter: {
        ...nodeUIProps.queryParams.filter,
        ...values,
      },
    };

    if (!isEqual(newQueryParams, nodeUIProps.queryParams)) {
      newQueryParams.pagination.currentPage = 0;
      nodeUIProps.setQueryParams(newQueryParams);
    }
  };

  const updateFilters = async () => {
    const { keyword, ...restFilters } = tempFilters;

    setSearchQuery(keyword ?? '');

    await updateSettings('nodes', { filters: restFilters });

    applyFilter(tempFilters);
  };

  const resetFilters = async () => {
    await removeSettings('nodes');

    setTempFilters((currentTempFilters) => ({
      ...currentTempFilters,
      ...NODE_FILTERS_DEFAULT,
    }));

    applyFilter();
  };

  const changeTempFilters = (key: string, value: string) => {
    const updateFunc = (currentItems: string[]) => {
      const index = currentItems?.indexOf(value);

      if (index > -1) return currentItems?.filter((_, i) => i !== index);
      else return [...currentItems, value];
    };

    setTempFilters((currentTempFilters) => ({
      ...currentTempFilters,
      [key]: key === 'keyword' ? value : updateFunc(currentTempFilters[key]),
    }));
  };

  const isDirty = !isEqual(filters, tempFilters);

  const filtersAll: FilterItem[] = [
    {
      id: 'blockchain',
      name: 'Blockchain',
      disabled: false,
      count: tempFilters.blockchain?.length,
      list: filtersBlockchainAll,
    },
    {
      id: 'nodeStatus',
      name: 'Node Status',
      disabled: false,
      count: tempFilters.nodeStatus?.length,
      list: filtersStatusAll,
    },
    // {
    //   id: 'nodeType',
    //   name: 'Node Type',
    //   disabled: false,
    //   count: tempFilters.nodeType?.length,
    //   list: filtersTypeAll,
    // },
    {
      id: 'networks',
      name: 'Network',
      disabled: false,
      count: tempFilters.networks?.length,
      list: filtersNetworksAll,
    },
  ];

  return {
    isDirty,

    filters: filtersAll,

    tempSearchQuery: tempFilters.keyword ?? '',
    tempFiltersTotal,

    changeTempFilters,

    updateFilters,
    resetFilters,
  };
};
