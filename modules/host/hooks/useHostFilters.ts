import { useEffect, useState } from 'react';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import isEqual from 'lodash/isEqual';
import { UIHostFilterCriteria } from '@modules/grpc/clients/hostClient';
import {
  HOST_FILTERS_CUSTOM_VALUES,
  HOST_FILTERS_DEFAULT,
  HOST_FILTERS_STEPS,
  HOST_PAGINATION_DEFAULT,
} from '@shared/constants/lookups';
import { formatters } from '@shared/index';
import { hostAtoms, hostSelectors } from '@modules/host';
import { useSettings } from '@modules/settings';

type UseHostFiltersHook = {
  isDirty: boolean;
  filters: FilterItem[];
  tempSearchQuery: string;
  tempFiltersTotal: number;
  changeTempFilters: (type: string, value: string) => void;
  updateFilters: VoidFunction;
  resetFilters: VoidFunction;
};

export const useHostFilters = (): UseHostFiltersHook => {
  const filters = useRecoilValue(hostSelectors.filters);
  const setPagination = useSetRecoilState(hostAtoms.hostListPagination);
  const resetPagination = useResetRecoilState(hostAtoms.hostListPagination);
  const [tempFilters, setTempFilters] = useState<UIHostFilterCriteria>(filters);
  const [tempFiltersTotal, setTempFiltersTotal] = useRecoilState(
    hostAtoms.filtersTempTotal,
  );
  const filtersStatusAll = useRecoilValue(
    hostSelectors.filtersStatusAll(tempFilters.hostStatus!),
  );

  const { updateSettings } = useSettings();

  useEffect(() => {
    const isDirtyMemory = !isEqual(
      tempFilters.hostMemory,
      HOST_FILTERS_DEFAULT.hostMemory,
    );
    const isDirtyCPU = !isEqual(
      tempFilters.hostCPU,
      HOST_FILTERS_DEFAULT.hostCPU,
    );
    const isDirtySpace = !isEqual(
      tempFilters.hostSpace,
      HOST_FILTERS_DEFAULT.hostSpace,
    );

    const total = [
      tempFilters.hostStatus?.length,
      isDirtyMemory,
      isDirtyCPU,
      isDirtySpace,
    ].filter(Boolean).length;

    setTempFiltersTotal(total);
  }, [tempFilters]);

  const updateFilters = async () => {
    await updateSettings('hosts', { filters: tempFilters }, resetPagination);

    if (!isEqual(tempFilters, filters))
      setPagination((oldPagi) => ({
        ...oldPagi,
        currentPage: 0,
      }));
  };

  const resetFilters = async () => {
    await updateSettings('hosts', { filters: undefined }, resetPagination);

    setTempFilters((currentTempFilters) => ({
      ...currentTempFilters,
      ...HOST_FILTERS_DEFAULT,
    }));

    setPagination(HOST_PAGINATION_DEFAULT);
  };

  const changeTempFilters = (key: string, value: string) => {
    const updateFunc = (currentItems: string[]) => {
      const index = currentItems.indexOf(value);

      if (index > -1) return currentItems.filter((_, i) => i !== index);
      else return [...currentItems, value];
    };

    switch (key) {
      case 'keyword':
        setTempFilters((currentTempFilters) => ({
          ...currentTempFilters,
          [key]: value,
        }));
        return;
      case 'hostStatus':
        setTempFilters((currentTempFilters) => ({
          ...currentTempFilters,
          [key]: updateFunc(currentTempFilters[key]!),
        }));
        return;
      default:
        return;
    }
  };

  const handleCustomUpdate = (type: string, value: [number, number]) => {
    setTempFilters((currentTempFilters) => ({
      ...currentTempFilters,
      [type]: value,
    }));
  };

  const isDirty = !isEqual(filters, tempFilters);

  const filtersAll: FilterItem[] = [
    {
      id: 'hostStatus',
      name: 'Status',
      disabled: false,
      count: tempFilters.hostStatus?.length,
      list: filtersStatusAll,
    },
    {
      id: 'hostMemory',
      name: 'Memory',
      type: 'range',
      label: 'GB',
      disabled: false,
      step: HOST_FILTERS_STEPS.hostMemory,
      min: HOST_FILTERS_DEFAULT.hostMemory?.[0],
      max: HOST_FILTERS_DEFAULT.hostMemory?.[1],
      values: tempFilters.hostMemory,
      setValues: (val: [number, number]) =>
        handleCustomUpdate('hostMemory', val),
      formatter: (value: number) => formatters.formatSize(value, 'bytes'),
    },
    {
      id: 'hostCPU',
      name: 'CPU Cores',
      type: 'range',
      disabled: false,
      step: HOST_FILTERS_STEPS.hostCPU,
      min: HOST_FILTERS_DEFAULT.hostCPU?.[0],
      max: HOST_FILTERS_DEFAULT.hostCPU?.[1],
      values: tempFilters.hostCPU,
      setValues: (val: [number, number]) => handleCustomUpdate('hostCPU', val),
      formatter: formatters.formatSize,
    },
    {
      id: 'hostSpace',
      name: 'Disk space',
      type: 'range',
      label: 'GB',
      disabled: false,
      step: HOST_FILTERS_STEPS.hostSpace,
      min: HOST_FILTERS_DEFAULT.hostSpace?.[0],
      max: HOST_FILTERS_DEFAULT.hostSpace?.[1],
      values: tempFilters.hostSpace,
      setValues: (val: [number, number]) =>
        handleCustomUpdate('hostSpace', val),
      customValues: HOST_FILTERS_CUSTOM_VALUES.hostSpace,
      formatter: (value: number) => formatters.formatSize(value, 'bytes'),
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
