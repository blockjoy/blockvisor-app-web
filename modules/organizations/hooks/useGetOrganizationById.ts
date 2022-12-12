import { apiClient } from '@modules/client';
import { useRecoilState } from 'recoil';
import { organisationAtoms } from '../store/organizationAtoms';

export function useGetOrganizationById() {
  const [selectedOrganization, setSelectedOrganization] = useRecoilState(
    organisationAtoms.selectedOrganization,
  );

  const [loadingState, setLoadingState] = useRecoilState(
    organisationAtoms.organizationLoadingState,
  );

  const getOrganization = async (id: string) => {
    setLoadingState('loading');
    // mocked part
    const res: any = await apiClient.getOrganizations();
    setSelectedOrganization(res.find((org: any) => org.id === id));
    setLoadingState('finished');
  };

  return {
    organization: selectedOrganization,
    loading: loadingState === 'initializing' || loadingState === 'loading',
    getOrganization,
  };
}
