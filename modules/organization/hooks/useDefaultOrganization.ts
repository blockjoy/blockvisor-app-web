import { useIdentityRepository } from '@modules/auth';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import { useRecoilState } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';

export function useDefaultOrganization() {
  const [defaultOrganization, setDefaultOrganization] = useRecoilState(
    organizationAtoms.defaultOrganization,
  );

  const getDefaultOrganization = async (organizations: Org[]) => {
    if (!defaultOrganization) {
      const organization = organizations[0];
      setDefaultOrganization({
        name: organization.name,
        id: organization.id,
      });
    }
  };

  return {
    defaultOrganization,
    getDefaultOrganization,
  };
}
