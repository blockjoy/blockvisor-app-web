import { apiClient } from '@modules/client';
import { env } from '@shared/constants/env';
import { delay } from '@shared/utils/delay';
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

    await delay(env.loadingDuration);

    setIsLoading('finished');
  };

  const updateOrganizations = (org_id: string) => {
    const newOrganizations = organizations.filter(
      (organization) => organization.id !== org_id,
    );
    setOrganizations(newOrganizations);
  };

  return {
    organizations,
    getOrganizations,
    updateOrganizations,
    isLoading,
  };
}
