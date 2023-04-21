import { ROUTES } from '@shared/index';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetDefaultOrganization } from './useSetDefaultOrganization';

export function useSwitchOrganization() {
  const router = useRouter();

  const { setDefaultOrganization } = useSetDefaultOrganization();

  const switchOrganization = async (orgId: string, orgName: string) => {
    try {
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
