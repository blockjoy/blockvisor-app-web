import { apiClient } from '@modules/client';
import { useRecoilState } from 'recoil';
import { organisationAtoms } from '../store/organizationAtoms';
import { isStatusResponse } from '../utils/typeGuards';

export function useGetOrganizations() {
  const [organizations, setOrganizations] = useRecoilState(
    organisationAtoms.allOrganizations,
  );
  const [loadingState, setLoadingState] = useRecoilState(
    organisationAtoms.organizationsLoadingState,
  );

  const getOrganizations = async () => {
    setLoadingState('loading');
    const response = await apiClient.getOrganizations();
    if (response && isStatusResponse(response)) {
      setLoadingState('finished');
      setOrganizations([]);
      // add some error handling
      //throw new ApplicationError('GetOrganizations', response.message);
    } else {
      const organizations = response?.map((org) => ({ ...org })) ?? [];
      setOrganizations(organizations);
      setLoadingState('finished');
    }
  };

  return {
    getOrganizations,
    loading: loadingState === 'initializing' || loadingState === 'loading',
    organizations,
  };
}
