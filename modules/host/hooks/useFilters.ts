import {
  useDefaultOrganization,
  useGetOrganizations,
} from '@modules/organization';
import { useSwitchOrganization } from '@modules/organization/hooks/useSwitchOrganization';
import { hostFiltersDefaults } from '@shared/constants/lookups';
import isEqual from 'lodash/isEqual';
import { useRecoilState } from 'recoil';
import { hostAtoms } from '../store/hostAtoms';
import { HostUIProps } from '../ui/HostUIContext';
import { InitialFilter, InitialQueryParams } from '../ui/HostUIHelpers';
import { buildParams } from '../utils/buildParams';

export const useFilters = (hostUIProps: HostUIProps) => {
  const { organizationsSorted } = useGetOrganizations();
  const { defaultOrganization } = useDefaultOrganization();
  const { switchOrganization } = useSwitchOrganization();

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
      hostMemory: hostFiltersDefaults.memory,
      hostCPU: hostFiltersDefaults.cpu,
      hostSpace: hostFiltersDefaults.space,
    };

    filter.hostStatus = hostStatus !== undefined ? hostStatus : [];
    filter.hostMemory =
      hostMemory !== undefined ? hostMemory : hostFiltersDefaults.memory;
    filter.hostCPU = hostCPU !== undefined ? hostCPU : hostFiltersDefaults.cpu;
    filter.hostSpace =
      hostSpace !== undefined ? hostSpace : hostFiltersDefaults.space;

    newQueryParams.filter = filter;
    return newQueryParams;
  };

  const applyFilter = (values: InitialFilter) => {
    const newQueryParams = prepareFilter(hostUIProps.queryParams, values);
    if (!isEqual(newQueryParams, hostUIProps.queryParams)) {
      newQueryParams.pagination.current_page = 1;
      hostUIProps.setQueryParams(newQueryParams);
    }
  };

  const updateFilters = () => {
    const params = buildParams(filtersMemory, filtersCPU, filtersSpace);
    applyFilter(params);

    const filtersToUpdate = {
      memory: filtersMemory,
      cpu: filtersCPU,
      space: filtersSpace,
    };

    localStorage.setItem('hostFilters', JSON.stringify(filtersToUpdate));
  };

  const removeFilters = () => {
    setFiltersMemory(hostFiltersDefaults.memory);
    setFiltersCPU(hostFiltersDefaults.cpu);
    setFiltersSpace(hostFiltersDefaults.space);

    localStorage.removeItem('hostFilters');
  };

  const resetFilters = () => {
    const params = buildParams(
      hostFiltersDefaults.memory,
      hostFiltersDefaults.cpu,
      hostFiltersDefaults.space,
    );
    applyFilter(params);
  };

  // TODO: ADD FILTERS BACK IN ONCE LUUK IMPLEMENTS THEM
  const filters: any = [
    {
      name: 'Organization',
      type: 'check',
      isDisabled: organizationsSorted?.length === 1,
      filterCount: 1,
      filterList: organizationsSorted?.map((org) => ({
        id: org.id,
        name: org.name,
        isChecked: org.id === defaultOrganization?.id,
      })),
      switchOrganization,
    },
    // {
    //   name: 'Status',
    //   type: 'check',
    //   isDisabled: false,
    //   filterCount: filtersStatusTotal,
    //   filterList: filtersStatus,
    //   setFilterList: setFiltersStatus,
    // },
    // {
    //   name: 'Memory',
    //   type: 'range',
    //   label: 'GB',
    //   isDisabled: false,
    //   step: hostFiltersSteps.memory,
    //   min: hostFiltersDefaults.memory[0],
    //   max: hostFiltersDefaults.memory[1],
    //   values: filtersMemory,
    //   setValues: setFiltersMemory,
    //   formatter: formatters.formatBytes,
    // },
    // {
    //   name: 'CPU Cores',
    //   type: 'range',
    //   isDisabled: false,
    //   step: hostFiltersSteps.cpu,
    //   min: hostFiltersDefaults.cpu[0],
    //   max: hostFiltersDefaults.cpu[1],
    //   values: filtersCPU,
    //   setValues: setFiltersCPU,
    //   formatter: formatters.plain,
    // },
    // {
    //   name: 'Disk space',
    //   type: 'range',
    //   label: 'GB',
    //   isDisabled: false,
    //   step: hostFiltersSteps.space,
    //   min: hostFiltersDefaults.space[0],
    //   max: hostFiltersDefaults.space[1],
    //   values: filtersSpace,
    //   customValues: hostFiltersCustomValues.space,
    //   setValues: setFiltersSpace,
    //   formatter: formatters.formatBytes,
    // },
  ];

  return {
    filters,
    applyFilter,
    updateFilters,
    removeFilters,
    resetFilters,
  };
};
