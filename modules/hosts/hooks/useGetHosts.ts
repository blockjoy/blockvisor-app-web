import { useIdentityRepository } from '@modules/auth';
import { apiClient } from '@modules/client';
import { isStatusResponse } from '@modules/organizations';
import { useRecoilState } from 'recoil';
import { hostsAtoms } from '../store/hostAtoms';

export function useGetHosts() {
  const [hosts, setHosts] = useRecoilState(hostsAtoms.hosts);
  const [loadingHostsState, setLoadingHosts] = useRecoilState(
    hostsAtoms.hostsLoading,
  );
  const repository = useIdentityRepository();

  const getHosts = async () => {
    setLoadingHosts('loading');
    const orgId = repository?.getIdentity()?.defaultOrganization?.id;

    const response = await apiClient.getHosts(undefined, orgId, undefined);

    if (response && isStatusResponse(response)) {
      setLoadingHosts('finished');
      setHosts([]);
      // add some error handling
      //throw new ApplicationError('GetHosts', response.message);
    } else {
      setHosts(response ?? []);
      setLoadingHosts('finished');
    }
  };

  return {
    getHosts,
    loading:
      loadingHostsState === 'initializing' || loadingHostsState === 'loading',
    finished: loadingHostsState === 'finished',
    hosts,
  };
}
