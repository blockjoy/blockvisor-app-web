import { useIdentityRepository } from '@modules/auth';
import { apiClient } from '@modules/client';
import { isStatusResponse } from '@modules/organizations';
import { env } from '@shared/constants/env';
import { delay } from '@shared/utils/delay';
import { useRecoilState } from 'recoil';
import { hostsAtoms } from '../store/hostAtoms';

export function useGetHostById() {
  const [host, setHost] = useRecoilState(hostsAtoms.host);
  const [loadingHostState, setLoadingHost] = useRecoilState(
    hostsAtoms.hostLoading,
  );
  const repository = useIdentityRepository();

  const getHostById = async (id: string) => {
    setLoadingHost('loading');
    // revisit this once types are consolidated
    const orgId = repository?.getIdentity()?.defaultOrganization?.id;
    const response = await apiClient.getHosts(undefined, orgId, undefined);

    if (isStatusResponse(response)) {
      setLoadingHost('finished');
      // add some error handling
      // throw new ApplicationError('GetHost', response.message);
    } else {
      const host = response?.find((hst) => {
        if (hst.id === id) {
          return hst;
        }
        return null;
      });
      setHost(host ?? null);
      await delay(env.loadingDuration);
      setLoadingHost('finished');
    }

    // temp fix to get host from full list
  };
  return {
    getHostById,
    loading:
      loadingHostState === 'initializing' || loadingHostState === 'loading',
    finished: loadingHostState === 'finished',
    host,
  };
}
