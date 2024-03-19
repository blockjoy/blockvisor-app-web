import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import isEqual from 'lodash/isEqual';
import { UIHostFilterCriteria } from '@modules/grpc/clients/hostClient';
import {
  HOST_FILTERS_CUSTOM_VALUES,
  HOST_FILTERS_DEFAULT,
  HOST_FILTERS_STEPS,
} from '@shared/constants/lookups';
import { formatters } from '@shared/index';
import {
  hostAtoms,
  hostSelectors,
  HostUIProps,
  initialFilter,
} from '@modules/host';

type UseHostFiltersHook = {
  isDirty: boolean;
  filters: FilterItem[];
  tempFiltersTotal: number;
  changeTempFilters: (type: string, value: string) => void;
  updateFilters: VoidFunction;
  resetFilters: VoidFunction;
};

export const useHostFilters = (
  hostUIProps: HostUIProps,
): UseHostFiltersHook => {
  const [filtersStatusSelectedIds, setFiltersStatusSelectedIds] =
    useRecoilState(hostSelectors.filtersStatusSelectedIds);
  const [filtersMemorySelectedRange, setFiltersMemorySelectedRange] =
    useRecoilState(hostSelectors.filtersMemorySelectedRange);
  const [filtersCPUSelectedRange, setFiltersCPUSelectedRange] = useRecoilState(
    hostSelectors.filtersCPUSelectedRange,
  );
  const [filtersSpaceSelectedRange, setFiltersSpaceSelectedRange] =
    useRecoilState(hostSelectors.filtersSpaceSelectedRange);

  const [tempStatusSelectedIds, setTempStatusSelectedIds] = useState<string[]>(
    filtersStatusSelectedIds,
  );
  const [tempMemorySelectedRange, setTempMemorySelectedRange] = useState<
    [number, number]
  >(filtersMemorySelectedRange);
  const [tempCPUSelectedRange, setTempCPUSelectedRange] = useState<
    [number, number]
  >(filtersCPUSelectedRange);
  const [tempSpaceSelectedRange, setTempSpaceSelectedRange] = useState<
    [number, number]
  >(filtersSpaceSelectedRange);

  const [tempFiltersTotal, setTempFiltersTotal] = useRecoilState(
    hostAtoms.filtersTempTotal,
  );

  const filtersStatusAll = useRecoilValue(
    hostSelectors.filtersStatusAll(tempStatusSelectedIds),
  );

  const resetInitialFilters = useResetRecoilState(hostAtoms.filters);

  useEffect(() => {
    const isDirtyMemory = !isEqual(
      tempMemorySelectedRange,
      HOST_FILTERS_DEFAULT.hostMemory,
    );
    const isDirtyCPU = !isEqual(
      tempCPUSelectedRange,
      HOST_FILTERS_DEFAULT.hostCPU,
    );
    const isDirtySpace = !isEqual(
      tempSpaceSelectedRange,
      HOST_FILTERS_DEFAULT.hostSpace,
    );

    const total = [
      tempStatusSelectedIds.length,
      isDirtyMemory,
      isDirtyCPU,
      isDirtySpace,
    ].filter(Boolean).length;

    setTempFiltersTotal(total);
  }, [
    tempStatusSelectedIds,
    tempMemorySelectedRange,
    tempCPUSelectedRange,
    tempSpaceSelectedRange,
  ]);

  const applyFilter = (values: UIHostFilterCriteria = initialFilter) => {
    const newQueryParams = {
      ...hostUIProps.queryParams,
      filter: {
        ...hostUIProps.queryParams.filter,
        ...values,
      },
    };

    if (!isEqual(newQueryParams, hostUIProps.queryParams)) {
      newQueryParams.pagination.currentPage = 0;
      hostUIProps.setQueryParams(newQueryParams);
    }
  };

  const updateFilters = () => {
    setFiltersMemorySelectedRange(tempMemorySelectedRange);
    setFiltersCPUSelectedRange(tempCPUSelectedRange);
    setFiltersSpaceSelectedRange(tempSpaceSelectedRange);
    setFiltersStatusSelectedIds(tempStatusSelectedIds);

    const params: UIHostFilterCriteria = {
      hostMemory: tempMemorySelectedRange,
      hostCPU: tempCPUSelectedRange,
      hostSpace: tempSpaceSelectedRange,
      hostStatus: tempStatusSelectedIds,
    };

    applyFilter(params);
  };

  const resetFilters = () => {
    resetInitialFilters();

    setTempStatusSelectedIds([]);
    setTempCPUSelectedRange(HOST_FILTERS_DEFAULT.hostCPU);
    setTempMemorySelectedRange(HOST_FILTERS_DEFAULT.hostMemory);
    setTempSpaceSelectedRange(HOST_FILTERS_DEFAULT.hostSpace);

    applyFilter();
  };

  const changeTempFilters = (type: string, value: string) => {
    const updateFunc = (currentItems: string[]) => {
      const index = currentItems.indexOf(value);

      if (index > -1) return currentItems.filter((_, i) => i !== index);
      else return [...currentItems, value];
    };

    switch (type) {
      case 'hostStatus':
        setTempStatusSelectedIds(updateFunc);
        return;
      default:
        return;
    }
  };

  const isDirty = !isEqual(
    [
      filtersCPUSelectedRange,
      filtersMemorySelectedRange,
      filtersSpaceSelectedRange,
      filtersStatusSelectedIds,
    ],
    [
      tempCPUSelectedRange,
      tempMemorySelectedRange,
      tempSpaceSelectedRange,
      tempStatusSelectedIds,
    ],
  );

  const filters: FilterItem[] = [
    {
      id: 'hostStatus',
      name: 'Status',
      disabled: false,
      count: tempStatusSelectedIds.length,
      list: filtersStatusAll,
    },
    {
      id: 'hostMemory',
      name: 'Memory',
      type: 'range',
      label: 'GB',
      disabled: false,
      step: HOST_FILTERS_STEPS.hostMemory,
      min: HOST_FILTERS_DEFAULT.hostMemory[0],
      max: HOST_FILTERS_DEFAULT.hostMemory[1],
      values: tempMemorySelectedRange,
      setValues: setTempMemorySelectedRange,
      formatter: (value: number) => formatters.formatSize(value, 'bytes'),
    },
    {
      id: 'hostCPU',
      name: 'CPU Cores',
      type: 'range',
      disabled: false,
      step: HOST_FILTERS_STEPS.hostCPU,
      min: HOST_FILTERS_DEFAULT.hostCPU[0],
      max: HOST_FILTERS_DEFAULT.hostCPU[1],
      values: tempCPUSelectedRange,
      setValues: setTempCPUSelectedRange,
      formatter: formatters.formatSize,
    },
    {
      id: 'hostSpace',
      name: 'Disk space',
      type: 'range',
      label: 'GB',
      disabled: false,
      step: HOST_FILTERS_STEPS.hostSpace,
      min: HOST_FILTERS_DEFAULT.hostSpace[0],
      max: HOST_FILTERS_DEFAULT.hostSpace[1],
      values: tempSpaceSelectedRange,
      customValues: HOST_FILTERS_CUSTOM_VALUES.hostSpace,
      setValues: setTempSpaceSelectedRange,
      formatter: (value: number) => formatters.formatSize(value, 'bytes'),
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
