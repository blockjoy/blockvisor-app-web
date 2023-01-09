import { useIdentityRepository } from '@modules/auth';
import { apiClient } from '@modules/client';
import { useRecoilState } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';

export function useDefaultOrganization() {
  const repository = useIdentityRepository();
  const [loadingState, setLoadingState] = useRecoilState(
    organizationAtoms.organizationLoadingState,
  );
  const [defaultOrganization, setDefaultOrganization] = useRecoilState(
    organizationAtoms.defaultOrganization,
  );

  const getDefaultOrganization = async () => {
    setLoadingState('loading');

    const defaultOrg = repository?.getDefaultOrganization();

    if (!defaultOrg) {
      const res: any = await apiClient.getOrganizations();

      // mocked
      const { name, id } = res[0];
      repository?.saveDefaultOrganization(name, id);
      setDefaultOrganization({ name, id });
      return;
    }

    setDefaultOrganization({
      name: defaultOrg.name ?? '',
      id: defaultOrg.id ?? '',
    });

    setLoadingState('finished');
  };

  return {
    defaultOrganization,
    loading: loadingState === 'initializing' || loadingState === 'loading',
    getDefaultOrganization,
  };
}
