import { useRecoilState } from 'recoil';
import { appState } from '@modules/app/store';
import { Uuid } from 'blockjoy-mock-grpc/dist/out/common_pb';

type Hook = {
  loadHost: (args1: string) => void;
};

export const useHost = (): Hook => {
  const [app, setApp] = useRecoilState(appState);
  const { grpcClient } = app;

  const loadHost = async (id: string) => {
    setApp({
      ...app,
      hostsLoading: true,
    });
    const uuid = new Uuid();
    uuid.setValue(id!);
    const hosts: any = await grpcClient.getHosts(uuid);
    setApp({
      ...app,
      activeHost: hosts[0],
      hostsLoading: false,
    });
  };

  return {
    loadHost,
  };
};
