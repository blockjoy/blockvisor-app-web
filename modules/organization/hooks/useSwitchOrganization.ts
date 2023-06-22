import { useProvisionToken } from './useProvisionToken';
import { useSetDefaultOrganization } from './useSetDefaultOrganization';

export function useSwitchOrganization() {
  const { setDefaultOrganization } = useSetDefaultOrganization();
  const { getProvisionToken } = useProvisionToken();

  const switchOrganization = async (orgId: string, orgName: string) => {
    try {
      setDefaultOrganization(orgId, orgName);
      getProvisionToken();
    } catch (error) {
      console.log('Error changing organization: ', error);
    }
  };

  return {
    switchOrganization,
  };
}
