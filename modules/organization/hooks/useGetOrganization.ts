import { apiClient } from '@modules/client';
import { useRecoilState, useRecoilValue } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';

export function useGetOrganization() {
  const [organization, setOrganization] = useRecoilState(
    organizationAtoms.selectedOrganization,
  );

  const allOrganizations = useRecoilValue(organizationAtoms.allOrganizations);

  const [isLoading, setIsLoading] = useRecoilState(
    organizationAtoms.organizationLoadingState,
  );

  const getOrganization = async (id: string) => {
    setIsLoading('initializing');

    const foundOrganization = allOrganizations.find((o: any) => o.id === id);

    if (foundOrganization) {
      console.log('foundOrganization', foundOrganization);
      setOrganization(foundOrganization);
    } else {
      const organizations: any = await apiClient.getOrganizations(id);
      const organization: any =
        organizations.length > 0 ? organizations[0] : null;

      setOrganization(organization);
    }

    setIsLoading('finished');
  };

  return {
    organization,
    getOrganization,
    setOrganization,
    isLoading,
  };
}
