import { apiClient } from '@modules/client';
import { useRecoilState } from 'recoil';
import { organisationAtoms } from '../store/organizationAtoms';

export function useGetOrganizations() {
  const [organizations, setOrganizations] = useRecoilState(organisationAtoms.allOrganizations);
  const [isLoading, setIsLoading] = useRecoilState(organisationAtoms.organizationsLoadingState);

  const getOrganizations = async () => {
    setIsLoading('initializing');

    const organizations: any = await apiClient.getOrganizations();
    setOrganizations(organizations);

    setIsLoading('finished');
  };

  return {
    organizations,
    getOrganizations,
    isLoading
  };
}
