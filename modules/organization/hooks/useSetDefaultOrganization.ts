import { useIdentityRepository } from '@modules/auth';
import { useSetRecoilState } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';

export const useSetDefaultOrganization = () => {
  const repository = useIdentityRepository();
  const setDefaultOrgState = useSetRecoilState(
    organizationAtoms.defaultOrganization,
  );
  const setDefaultOrganization = (id: string, name: string) => {
    setDefaultOrgState({
      name,
      id,
    });

    repository?.saveDefaultOrganization(name, id);
  };

  return {
    setDefaultOrganization,
  };
};
