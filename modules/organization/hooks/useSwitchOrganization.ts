import { authAtoms, useIdentityRepository } from '@modules/auth';
import { apiClient } from '@modules/client';
import { ROUTES } from '@shared/index';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { useSetDefaultOrganization } from './useSetDefaultOrganization';

export function useSwitchOrganization() {
  const [user, setUser] = useRecoilState(authAtoms.user);
  const repository = useIdentityRepository();
  const router = useRouter();

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
      // update route
      updateRouteIfNodeView();

      toast.success('Organization Changed');
    } catch (error) {
      console.log('Error changing organization: ', error);
      toast.error('Error Changing');
    }
  };

  const updateRouteIfNodeView = () => {
    if (router.pathname === '/nodes/[id]') {
      router.push(ROUTES.NODES, undefined, { shallow: true });
    }
  };

  return {
    switchOrganization,
  };
}
