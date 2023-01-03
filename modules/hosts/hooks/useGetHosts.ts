import { useIdentityRepository } from '@modules/auth';
import { apiClient } from '@modules/client';
import { isStatusResponse } from '@modules/organization';
import { useRecoilState } from 'recoil';
import { hostsAtoms } from '../store/hostAtoms';
import { useProvisionKeysRepository } from './useProvisionKeysRepository';

export function useGetHosts() {
  const [hosts, setHosts] = useRecoilState(hostsAtoms.hosts);
  const [loadingHostsState, setLoadingHosts] = useRecoilState(
    hostsAtoms.hostsLoading,
  );
  const repository = useIdentityRepository();
  const keyRepository = useProvisionKeysRepository();

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
      // load provisioning hosts
      let loadedHosts: any = response ? [...response] : [];

      const hostProvisionKeys = keyRepository?.getHostProvisionKeys();

      // mocked provisioning
      if (hostProvisionKeys) {
        for (let key of hostProvisionKeys) {
          const response: any = await apiClient.getHostProvision(key);
          const hostProvisionRecord = response[0];
          if (!hostProvisionRecord?.claimedAt) {
            loadedHosts.unshift({
              isHostProvision: true,
              name: 'Host Provisioning',
              location: `Key: ${hostProvisionRecord.id}`,
              id: hostProvisionRecord.id,
              created_at_datetime: new Date(),
            });
          }
        }
      }

      setHosts(loadedHosts ?? []);
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
