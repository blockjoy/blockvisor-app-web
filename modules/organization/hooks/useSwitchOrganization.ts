import { authAtoms, useIdentityRepository } from '@modules/auth';
import { apiClient } from '@modules/client';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { useSetDefaultOrganization } from './useSetDefaultOrganization';

export function useSwitchOrganization() {
  const [user, setUser] = useRecoilState(authAtoms.user);
  const repository = useIdentityRepository();

  const { setDefaultOrganization } = useSetDefaultOrganization();

  const switchOrganization = async (orgId: string, orgName: string) => {
    try {
      const response: any = await apiClient.switchOrganization(orgId);

      const updatedUser = {
        ...user,
        accessToken: response.value,
      };

      // update user state
      setUser(updatedUser);
      // update identity
      repository?.updateIdentity(updatedUser);
      // update default organization
      setDefaultOrganization(orgId, orgName);

      toast.success('Successfully switched the organization');
    } catch (error) {
      toast.error('Error while switching the organization');
    }
  };

  return {
    switchOrganization,
  };
}
