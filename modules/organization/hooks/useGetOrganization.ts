import { apiClient } from '@modules/client';
import { delay } from '@shared/utils/delay';
import { useRecoilState } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';
import { env } from '@shared/constants/env';

export function useGetOrganization() {
  const [organization, setOrganization] = useRecoilState(
    organizationAtoms.selectedOrganization,
  );
  const [isLoading, setIsLoading] = useRecoilState(
    organizationAtoms.organizationLoadingState,
  );

  const getOrganization = async (id: string) => {
    setIsLoading('initializing');

    const organizations: any = await apiClient.getOrganizations(id);
    const organization: any =
      organizations.length > 0 ? organizations[0] : null;

    setOrganization(organization);

    await delay(env.loadingDuration);

    setIsLoading('finished');
  };

  return {
    organization,
    getOrganization,
    isLoading,
  };
}
