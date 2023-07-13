import { useRecoilState } from 'recoil';
import { hostAtoms } from '../store/hostAtoms';
import { hostClient } from '@modules/grpc/clients/hostClient';
import { useHostList } from './useHostList';
import { toast } from 'react-toastify';

export const useHostView = () => {
  const [isLoading, setIsLoading] = useRecoilState(
    hostAtoms.isLoadingActiveHost,
  );
  const [host, setHost] = useRecoilState(hostAtoms.activeHost);

  const { hostList, removeFromHostList } = useHostList();

  const loadHost = async (id?: string | string[]) => {
    if (hostList.findIndex((h) => h.id === id) > -1) {
      setIsLoading('finished');
      setHost(hostList.find((h) => h.id === id)!);
      return;
    }

    setIsLoading('initializing');

    const host: any = await hostClient.getHost(id as string);

    setHost(host);
    setIsLoading('finished');
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
    deleteHost,
    unloadHost,
  };
};
