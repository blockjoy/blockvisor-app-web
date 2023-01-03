import { apiClient } from '@modules/client';
import { useRecoilState } from 'recoil';
import { organisationAtoms } from '../store/organizationAtoms';

export function useGetOrganization() {
  const [organization, setOrganization] = useRecoilState(organisationAtoms.selectedOrganization);
  const [isLoading, setIsLoading] = useRecoilState(organisationAtoms.organizationLoadingState);

  const getOrganization = async (id: string) => {
    setIsLoading('initializing');

    const organizations: any = await apiClient.getOrganizations(id);
    const organization: any = organizations.length > 0 ? organizations[0] : null;

    setOrganization(organization);
    setIsLoading('finished');
  };

  return {
    organization,
    getOrganization,
    isLoading,
  };
}
