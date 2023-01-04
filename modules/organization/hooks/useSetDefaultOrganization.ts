import { useIdentityRepository } from '@modules/auth';

export const useSetDefaultOrganization = () => {
  const repository = useIdentityRepository();

  const setDefaultOrganization = (id: string, name: string) => {
    repository?.saveDefaultOrganization(name, id);
  };

  return {
    setDefaultOrganization,
  };
};
