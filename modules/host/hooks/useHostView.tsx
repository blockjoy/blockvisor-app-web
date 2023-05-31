import { useRecoilState } from 'recoil';
import { hostAtoms } from '../store/hostAtoms';
import { hostClient } from '@modules/grpc/clients/hostClient';

export const useHostView = () => {
  const [isLoading, setIsLoading] = useRecoilState(
    hostAtoms.isLoadingActiveHost,
  );
  const [host, setHost] = useRecoilState(hostAtoms.activeHost);

  const loadHost = async (id?: string | string[]) => {
    setIsLoading('initializing');

    const host: any = await hostClient.getHost(id as string);

    setHost(host);
    setIsLoading('finished');
  };

  const unloadHost = () => {
    setHost(null);
    setIsLoading('finished');
  };

  return {
    host,
    isLoading,

    loadHost,
    unloadHost,
  };
};
