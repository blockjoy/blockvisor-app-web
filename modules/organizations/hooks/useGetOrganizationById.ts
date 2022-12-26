import { apiClient } from '@modules/client';
import { useRecoilState } from 'recoil';
import { organisationAtoms } from '../store/organizationAtoms';

export function useGetOrganizationById() {
  const [organization, setOrganization] = useRecoilState(organisationAtoms.selectedOrganization);
  const [isLoading, setIsLoading] = useRecoilState(organisationAtoms.organizationLoadingState);

  const getOrganization = async (id: string) => {
    setIsLoading('initializing');

    const organizations: any = await apiClient.getOrganizations();
    const organization = organizations.find((org: any) => org.id === id);

    setOrganization(organization);
    setIsLoading('finished');
  };

  return {
    organization,
    getOrganization,
    isLoading,
  };
}
