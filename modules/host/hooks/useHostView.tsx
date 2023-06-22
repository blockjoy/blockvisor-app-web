import { useRecoilState } from 'recoil';
import { hostAtoms } from '../store/hostAtoms';
import { hostClient } from '@modules/grpc/clients/hostClient';
import { useHostList } from './useHostList';

export const useHostView = () => {
  const [isLoading, setIsLoading] = useRecoilState(
    hostAtoms.isLoadingActiveHost,
  );
  const [host, setHost] = useRecoilState(hostAtoms.activeHost);

  const { hostList } = useHostList();

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

  const unloadHost = () => {
    setHost(null);
    setIsLoading('loading');
  };

  return {
    host,
    isLoading,

    loadHost,
    unloadHost,
  };
};
