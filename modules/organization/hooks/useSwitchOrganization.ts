import { useDefaultOrganization } from './useDefaultOrganization';
import { useProvisionToken } from './useProvisionToken';

export function useSwitchOrganization() {
  const { setDefaultOrganization } = useDefaultOrganization();
  const { getProvisionToken } = useProvisionToken();

  const switchOrganization = async (orgId: string, name: string) => {
    try {
      setDefaultOrganization({ orgId, name });
      getProvisionToken(orgId);
    } catch (error) {
      console.log('Error changing organization: ', error);
    }
  };

  return {
    switchOrganization,
  };
}
