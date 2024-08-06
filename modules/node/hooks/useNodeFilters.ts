import { useEffect, useState } from 'react';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import isEqual from 'lodash/isEqual';
import { UINodeFilterCriteria } from '@modules/grpc/clients/nodeClient';
import { nodeSelectors, nodeAtoms } from '@modules/node';
import { NODE_FILTERS_DEFAULT } from '@shared/constants/lookups';
import { settingsAtoms, useSettings } from '@modules/settings';

type UseNodeFiltersHook = {
  isDirty: boolean;
  filters: FilterItem[];
  tempSearchQuery: string;
  tempFiltersTotal: number;
  changeTempFilters: (type: string, value: string) => void;
  updateFilters: () => Promise<void>;
  resetFilters: () => Promise<void>;
};

export const useNodeFilters = (): UseNodeFiltersHook => {
  const filters = useRecoilValue(nodeSelectors.filters);
  const isFiltersEmpty = useRecoilValue(nodeSelectors.isFiltersEmpty);
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
  const filtersNetworksAll = useRecoilValue(
    nodeSelectors.filtersNetworksAll(tempFilters.networks!),
  );
  const setSearchQuery = useSetRecoilState(nodeAtoms.filtersSearchQuery);
  const resetPagination = useResetRecoilState(nodeAtoms.nodeListPagination);
  const setAppLoadingState = useSetRecoilState(settingsAtoms.appLoadingState);

  const { updateSettings } = useSettings();

  useEffect(() => {
    const total = Object.values(tempFilters).reduce(
      (acc, current) => acc + (current.length ? 1 : 0),
      0,
    );

    setTempFiltersTotal(total);
  }, [tempFilters]);

  const updateFilters = async () => {
    setAppLoadingState('loading');
    const { keyword, ...restFilters } = tempFilters;

    setSearchQuery(keyword ?? '');

    await updateSettings('nodes', { filters: restFilters }, resetPagination);
  };

  const resetFilters = async () => {
    if (!isFiltersEmpty) setAppLoadingState('loading');
    await updateSettings('nodes', { filters: undefined }, resetPagination);

    setTempFilters((currentTempFilters) => ({
      ...currentTempFilters,
      ...NODE_FILTERS_DEFAULT,
    }));
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
