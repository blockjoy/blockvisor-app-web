import { useIdentityRepository } from '@modules/auth';
import { readToken } from '@shared/utils/readToken';
import { useRecoilState, useRecoilValue } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';

export function useDefaultOrganization() {
  const repository = useIdentityRepository();
  const [loadingState, setLoadingState] = useRecoilState(
    organizationAtoms.organizationDefaultLoadingState,
  );
  const [defaultOrganization, setDefaultOrganization] = useRecoilState(
    organizationAtoms.defaultOrganization,
  );

  const organizations = useRecoilValue(organizationAtoms.allOrganizations);

  const getDefaultOrganization = async () => {
    setLoadingState('loading');

    const identity = repository?.getIdentity();
    const user: any = readToken(identity?.accessToken!);
    const userData: any = user?.data;
    const orgId = userData.org_id ?? '';

    const organization = organizations.find(org => org.id === orgId);

    const orgName = organization?.name ?? '';

    repository?.saveDefaultOrganization(
      orgName,
      orgId
    );

    setDefaultOrganization({
      name: orgName,
      id: orgId,
    });

    setLoadingState('finished');
  };

  return {
    defaultOrganization,
    loading: loadingState === 'initializing' || loadingState === 'loading',
    getDefaultOrganization,
  };
}
