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

  const prepareFilter = (
    queryParams: InitialQueryParams,
    values: InitialFilter,
  ) => {
    const { hostStatus } = values;
    const newQueryParams = { ...queryParams };

    const filter: InitialFilter = {
      hostStatus: [],
    };

    filter.hostStatus = hostStatus !== undefined ? hostStatus : [];

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
    const params = buildParams(filtersStatus);
    applyFilter(params);

    const filtersToUpdate = {
      status: filtersStatus,
    };

    localStorage.setItem('hostFilters', JSON.stringify(filtersToUpdate));
  };

  const removeFilters = () => {
    let filtersStatusCopy = filtersStatus.map((item) => ({
      ...item,
      isChecked: false,
    }));
    setFiltersStatus(filtersStatusCopy);

    localStorage.removeItem('hostFilters');
  };

  const resetFilters = () => {
    const params = buildParams([]);
    applyFilter(params);
  };

  const filters = [
    {
      name: 'Organization',
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
      isDisabled: false,
      filterCount: filtersStatusTotal,
      filterList: filtersStatus,
      setFilterList: setFiltersStatus,
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
