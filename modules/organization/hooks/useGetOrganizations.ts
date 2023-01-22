import { apiClient } from '@modules/client';
import { env } from '@shared/constants/env';
import { delay } from '@shared/utils/delay';
import { useRecoilState } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';
import { useSetDefaultOrganization } from './useSetDefaultOrganization';

export function useGetOrganizations() {
  const [organizations, setOrganizations] = useRecoilState(
    organizationAtoms.allOrganizations,
  );
  const [isLoading, setIsLoading] = useRecoilState(
    organizationAtoms.organizationsLoadingState,
  );
  const { setDefaultOrganization } = useSetDefaultOrganization();

  const getOrganizations = async (init?: boolean) => {
    setIsLoading('initializing');

    const organizations: any = await apiClient.getOrganizations();
    setOrganizations(organizations);

    if (init) {
      const organization = organizations.find((org: any) => org.personal);

      if (organization) {
        setDefaultOrganization(
          organization.id,
          organization.name,
        );
      }
    }

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
