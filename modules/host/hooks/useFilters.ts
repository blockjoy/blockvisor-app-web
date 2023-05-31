import {
  useDefaultOrganization,
  useGetOrganizations,
} from '@modules/organization';
import { useSwitchOrganization } from '@modules/organization/hooks/useSwitchOrganization';
import { isEqual } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { hostAtoms } from '../store/hostAtoms';
import { hostSelectors } from '../store/hostSelectors';
import { HostUIProps } from '../ui/HostUIContext';
import { InitialFilter, InitialQueryParams } from '../ui/HostUIHelpers';
import { buildParams } from '../utils/buildParams';

export const useFilters = (hostUIProps: HostUIProps) => {
  const { organizations } = useGetOrganizations();
  const { defaultOrganization } = useDefaultOrganization();
  const { switchOrganization } = useSwitchOrganization();

  const [filtersStatus, setFiltersStatus] = useRecoilState(
    hostAtoms.filtersStatus,
  );
  const filtersStatusTotal = useRecoilValue(hostSelectors.filtersStatusTotal);

  const [filtersMemory, setFiltersMemory] = useRecoilState(
    hostAtoms.filtersMemory,
  );
  const [filtersCPU, setFiltersCPU] = useRecoilState(hostAtoms.filtersCPU);
  const [filtersSpace, setFiltersSpace] = useRecoilState(
    hostAtoms.filtersSpace,
  );

  const prepareFilter = (
    queryParams: InitialQueryParams,
    values: InitialFilter,
  ) => {
    const { hostStatus, hostMemory, hostCPU, hostSpace } = values;
    const newQueryParams = { ...queryParams };

    const filter: InitialFilter = {
      hostStatus: [],
      hostMemory: [2, 512],
      hostCPU: [1, 64],
      hostSpace: [256, 10240],
    };

    filter.hostStatus = hostStatus !== undefined ? hostStatus : [];
    filter.hostMemory = hostMemory !== undefined ? hostMemory : [2, 512];
    filter.hostCPU = hostCPU !== undefined ? hostCPU : [1, 64];
    filter.hostSpace = hostSpace !== undefined ? hostSpace : [256, 10240];

    newQueryParams.filter = filter;
    return newQueryParams;
  };

  const applyFilter = (values: InitialFilter) => {
    const newQueryParams = prepareFilter(hostUIProps.queryParams, values);
    if (!isEqual(newQueryParams, hostUIProps.queryParams)) {
      newQueryParams.pagination.current_page = 1;
      hostUIProps.setQueryParams(newQueryParams);
    }

    console.log('newQueryParams', newQueryParams);
  };

  const updateFilters = () => {
    const params = buildParams(
      filtersStatus,
      filtersMemory,
      filtersCPU,
      filtersSpace,
    );
    applyFilter(params);

    const filtersToUpdate = {
      status: filtersStatus,
      memory: filtersMemory,
      cpu: filtersCPU,
      space: filtersSpace,
    };

    localStorage.setItem('hostFilters', JSON.stringify(filtersToUpdate));
  };

  const removeFilters = () => {
    let filtersStatusCopy = filtersStatus.map((item) => ({
      ...item,
      isChecked: false,
    }));
    setFiltersStatus(filtersStatusCopy);
    setFiltersMemory([2, 512]);
    setFiltersCPU([1, 64]);
    setFiltersSpace([256, 10240]);

    localStorage.removeItem('hostFilters');
  };

  const resetFilters = () => {
    const params = buildParams([], [2, 512], [1, 64], [256, 10240]);
    applyFilter(params);
  };

  const filters: any = [
    {
      name: 'Organization',
      type: 'check',
      isDisabled: organizations?.length === 1,
      filterCount: 1,
      filterList: organizations?.map((org) => ({
        id: org.id,
        name: org.name,
        isChecked: org.id === defaultOrganization?.id,
      })),
      switchOrganization,
    },
    {
      name: 'Status',
      type: 'check',
      isDisabled: false,
      filterCount: filtersStatusTotal,
      filterList: filtersStatus,
      setFilterList: setFiltersStatus,
    },
    {
      name: 'Memory',
      type: 'range',
      label: 'GB',
      isDisabled: false,
      step: 2,
      min: 2,
      max: 512,
      values: filtersMemory,
      setValues: setFiltersMemory,
    },
    {
      name: 'CPU Cores',
      type: 'range',
      isDisabled: false,
      step: 1,
      min: 1,
      max: 64,
      values: filtersCPU,
      setValues: setFiltersCPU,
    },
    {
      name: 'Disk space',
      type: 'range',
      label: 'GB',
      isDisabled: false,
      step: 256,
      min: 256,
      max: 10240,
      values: filtersSpace,
      setValues: setFiltersSpace,
    },
  ];

  return {
    filters,
    applyFilter,
    updateFilters,
    removeFilters,
    resetFilters,
  };
};
