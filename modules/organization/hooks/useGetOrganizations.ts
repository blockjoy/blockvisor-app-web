import { apiClient } from '@modules/client';
import { useRecoilState } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';

export function useGetOrganizations() {
  const [organizations, setOrganizations] = useRecoilState(
    organizationAtoms.allOrganizations,
  );
  const [isLoading, setIsLoading] = useRecoilState(
    organizationAtoms.organizationsLoadingState,
  );

  const getOrganizations = async () => {
    setIsLoading('initializing');

    const organizations: any = await apiClient.getOrganizations();
    setOrganizations(organizations);

    setIsLoading('finished');
  };

  return {
    organizations,
    getOrganizations,
    isLoading,
  };
}
