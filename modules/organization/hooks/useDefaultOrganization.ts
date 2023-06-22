import { useIdentityRepository } from '@modules/auth';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
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

  const getDefaultOrganization = async (organizations: Org[]) => {
    setLoadingState('loading');

    // TODO: store default organization in api/localStorage
    const organization = organizations[0];

    const orgName = organization?.name ?? '';

    repository?.saveDefaultOrganization(orgName, organization.id);

    setDefaultOrganization({
      name: orgName,
      id: organization.id,
    });

    setLoadingState('finished');
  };

  return {
    defaultOrganization,
    loading: loadingState === 'initializing' || loadingState === 'loading',
    getDefaultOrganization,
  };
}
