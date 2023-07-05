import { useDefaultOrganization } from './useDefaultOrganization';
import { useProvisionToken } from './useProvisionToken';

export function useSwitchOrganization() {
  const { setDefaultOrganization } = useDefaultOrganization();
  const { getProvisionToken } = useProvisionToken();

  const switchOrganization = async (id: string, name: string) => {
    try {
      setDefaultOrganization({ id, name });
      getProvisionToken(id);
    } catch (error) {
      console.log('Error changing organization: ', error);
    }
  };

  return {
    switchOrganization,
  };
}
