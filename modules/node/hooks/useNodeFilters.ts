import { useEffect } from 'react';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
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

  const [tempFilters, setTempFilters] = useRecoilState(nodeAtoms.tempFilters);
  const [tempFiltersTotal, setTempFiltersTotal] = useRecoilState(
    nodeAtoms.filtersTempTotal,
  );

  const setSearchQuery = useSetRecoilState(nodeAtoms.filtersSearchQuery);
  const resetPagination = useResetRecoilState(nodeAtoms.nodeListPagination);
  const setAppLoadingState = useSetRecoilState(settingsAtoms.appLoadingState);

  const filtersProtocolAll = useRecoilValue(nodeSelectors.filtersProtocolAll);
  const filtersStatusAll = useRecoilValue(nodeSelectors.filtersStatusAll);
  const filtersVersionsAll = useRecoilValue(nodeSelectors.filtersVersionAll);

  const { updateSettings } = useSettings();

  useEffect(() => {
    if (isEmpty(tempFilters)) setTempFilters(filters);
  }, [filters]);

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
      id: 'protocol',
      name: 'Protocol',
      disabled: false,
      count: tempFilters.protocol?.length,
      list: filtersProtocolAll,
    },
    {
      id: 'nodeStatus',
      name: 'Node Status',
      disabled: false,
      count: tempFilters.nodeStatus?.length,
      list: filtersStatusAll,
    },
    {
      id: 'semanticVersions',
      name: 'Version',
      disabled: false,
      count: tempFilters.semanticVersions?.length,
      list: filtersVersionsAll,
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
