import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import isEqual from 'lodash/isEqual';
import { UINodeFilterCriteria } from '@modules/grpc/clients/nodeClient';
import {
  initialFilter,
  NodeUIProps,
  nodeSelectors,
  nodeAtoms,
} from '@modules/node';

type UseNodeFiltersHook = {
  isDirty: boolean;
  filters: FilterItem[];
  tempFiltersTotal: number;
  changeTempFilters: (type: string, value: string) => void;
  updateFilters: VoidFunction;
  resetFilters: VoidFunction;
};

export const useNodeFilters = (
  nodeUIProps: NodeUIProps,
): UseNodeFiltersHook => {
  const [filtersBlockchainSelectedIds, setFiltersBlockchainSelectedIds] =
    useRecoilState(nodeSelectors.filtersBlockchainSelectedIds);
  const [filtersStatusSelectedIds, setFiltersStatusSelectedIds] =
    useRecoilState(nodeSelectors.filtersStatusSelectedIds);
  const [filtersTypeSelectedIds, setFiltersTypeSelectedIds] = useRecoilState(
    nodeSelectors.filtersTypeSelectedIds,
  );

  const [tempBlockchainSelectedIds, setTempBlockchainSelectedIds] = useState<
    string[]
  >(filtersBlockchainSelectedIds);
  const [tempStatusSelectedIds, setTempStatusSelectedIds] = useState<string[]>(
    filtersStatusSelectedIds,
  );
  const [tempTypeSelectedIds, setTempTypeSelectedIds] = useState<string[]>(
    filtersTypeSelectedIds,
  );

  const [tempFiltersTotal, setTempFiltersTotal] = useRecoilState(
    nodeAtoms.filtersTempTotal,
  );

  const filtersBlockchainAll = useRecoilValue(
    nodeSelectors.filtersBlockchainAll(tempBlockchainSelectedIds),
  );
  const filtersStatusAll = useRecoilValue(
    nodeSelectors.filtersStatusAll(tempStatusSelectedIds),
  );
  const filtersTypeAll = useRecoilValue(
    nodeSelectors.filtersTypeAll(tempTypeSelectedIds),
  );

  const resetInitialFilters = useResetRecoilState(nodeAtoms.filters);

  useEffect(() => {
    const total = [
      tempBlockchainSelectedIds.length,
      tempStatusSelectedIds.length,
      tempTypeSelectedIds.length,
    ].filter(Boolean).length;

    setTempFiltersTotal(total);
  }, [tempBlockchainSelectedIds, tempStatusSelectedIds, tempTypeSelectedIds]);

  const applyFilter = (values: UINodeFilterCriteria = initialFilter) => {
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

  const updateFilters = () => {
    setFiltersBlockchainSelectedIds(tempBlockchainSelectedIds);
    setFiltersStatusSelectedIds(tempStatusSelectedIds);
    setFiltersTypeSelectedIds(tempTypeSelectedIds);

    const params: UINodeFilterCriteria = {
      blockchain: tempBlockchainSelectedIds,
      nodeStatus: tempStatusSelectedIds,
      nodeType: tempTypeSelectedIds,
    };

    applyFilter(params);
  };

  const resetFilters = () => {
    resetInitialFilters();

    setTempBlockchainSelectedIds([]);
    setTempStatusSelectedIds([]);
    setTempTypeSelectedIds([]);

    applyFilter();
  };

  const changeTempFilters = (type: string, value: string) => {
    const updateFunc = (currentItems: string[]) => {
      const index = currentItems.indexOf(value);

      if (index > -1) return currentItems.filter((_, i) => i !== index);
      else return [...currentItems, value];
    };

    switch (type) {
      case 'blockchain':
        setTempBlockchainSelectedIds(updateFunc);
        return;
      case 'nodeStatus':
        setTempStatusSelectedIds(updateFunc);
        return;
      case 'nodeType':
        setTempTypeSelectedIds(updateFunc);
        return;
      default:
        return;
    }
  };

  const isDirty = !isEqual(
    [
      filtersBlockchainSelectedIds,
      filtersStatusSelectedIds,
      filtersTypeSelectedIds,
    ],
    [tempBlockchainSelectedIds, tempStatusSelectedIds, tempTypeSelectedIds],
  );

  const filters: FilterItem[] = [
    {
      id: 'blockchain',
      name: 'Blockchain',
      disabled: false,
      count: tempBlockchainSelectedIds.length,
      list: filtersBlockchainAll,
    },
    {
      id: 'nodeStatus',
      name: 'App Status',
      disabled: false,
      count: tempStatusSelectedIds.length,
      list: filtersStatusAll,
    },
    {
      id: 'nodeType',
      name: 'Node Type',
      disabled: false,
      count: tempTypeSelectedIds.length,
      list: filtersTypeAll,
    },
  ];

  return {
    isDirty,

    filters,

    tempFiltersTotal,

    changeTempFilters,

    updateFilters,
    resetFilters,
  };
};
