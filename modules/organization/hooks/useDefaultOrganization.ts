import { useIdentityRepository } from '@modules/auth';
import { apiClient } from '@modules/client';
import { useRecoilState } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';

export function useDefaultOrganization() {
  const repository = useIdentityRepository();
  const [loadingState, setLoadingState] = useRecoilState(
    organizationAtoms.organizationDefaultLoadingState,
  );
  const [defaultOrganization, setDefaultOrganization] = useRecoilState(
    organizationAtoms.defaultOrganization,
  );

  const getDefaultOrganization = async () => {
    setLoadingState('loading');
    let defaultOrg = repository?.getDefaultOrganization();

    // mocked
    if (!defaultOrg) {
      const allOrganizations: any = await apiClient.getOrganizations();
      defaultOrg = allOrganizations[0];
    }

    repository?.saveDefaultOrganization(
      defaultOrg?.name ?? '',
      defaultOrg?.id ?? ''
    );

    setDefaultOrganization({
      name: defaultOrg?.name ?? '',
      id: defaultOrg?.id ?? '',
    });

    setLoadingState('finished');
  };

  return {
    defaultOrganization,
    loading: loadingState === 'initializing' || loadingState === 'loading',
    getDefaultOrganization,
  };
}
