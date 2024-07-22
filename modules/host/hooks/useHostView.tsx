import { useRecoilState, useRecoilValue } from 'recoil';
import { hostAtoms } from '../store/hostAtoms';
import { hostClient } from '@modules/grpc/clients/hostClient';
import { useHostList } from './useHostList';
import { toast } from 'react-toastify';
import { authSelectors } from '@modules/auth';
import {
  organizationSelectors,
  useSwitchOrganization,
} from '@modules/organization';

export const useHostView = () => {
  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);

  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );

  const { switchOrganization } = useSwitchOrganization();

  const [isLoading, setIsLoading] = useRecoilState(
    hostAtoms.isLoadingActiveHost,
  );

  const [host, setHost] = useRecoilState(hostAtoms.activeHost);

  const { hostList, removeFromHostList } = useHostList();

  const loadHost = async (id?: string | string[]) => {
    const foundHost = hostList.find((h) => h.id === id)!;
    if (foundHost) {
      setIsLoading('finished');
      if (!isSuperUser) {
        setHost(hostList.find((h) => h.id === id)!);
      } else {
        setHost(foundHost);
        const host = await hostClient.getHost(id as string);
        setHost(host);
        if (foundHost.orgId !== defaultOrganization?.id)
          switchOrganization(foundHost.orgId, foundHost.orgName);
      }
      return;
    }

    setIsLoading('initializing');

    try {
      const host = await hostClient.getHost(id as string);
      setHost(host);
      if (host.orgId !== defaultOrganization?.id)
        switchOrganization(host.orgId, host.orgName);
    } catch (err) {
      setHost(null);
    } finally {
      setIsLoading('finished');
    }
  };

  const deleteHost = async (id: string, callback: VoidFunction) => {
    try {
      await hostClient.deleteHost(id);
      removeFromHostList(id);
      callback();
    } catch (err) {
      toast.error('Error Deleting');
    }
  };

  const unloadHost = () => {
    setHost(null);
    setIsLoading('loading');
  };

  return {
    host,
    isLoading,
    loadHost,
    setHost,
    deleteHost,
    unloadHost,
  };
};
