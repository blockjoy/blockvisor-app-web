import { useRecoilState } from 'recoil';
import { appState } from '@modules/app/store';
import { Uuid } from 'blockjoy-mock-grpc/dist/out/common_pb';
import { Host } from '@modules/app/components/host/Host';

type Hook = {
  loadHost: (args1: string) => void;
};

export const useHost = (): Hook => {
  const [app, setApp] = useRecoilState(appState);
  const { grpcClient } = app;

  const loadHost = async (id: string) => {
    setApp({
      ...app,
      hostLoading: true,
    });
    const uuid = new Uuid();
    uuid.setValue(id!);
    const hosts: any = await grpcClient.getHosts(uuid);

    const host = hosts[0];

    const details = [
      { label: 'CREATED', data: host.created_at_datetime.toLocaleDateString() },
      { label: 'VERSION', data: host.version },
      { label: 'DISK SIZE', data: host.diskSize.toString() },
      { label: 'MEMORY SIZE', data: host.memSize.toString() },
    ];

    const activeHost: Host = {
      name: host.name,
      status: host.status,
      ip: host.ip,
      location: host.location,
      details,
    };

    setApp({
      ...app,
      host: activeHost,
      hostLoading: false,
    });
  };

  return {
    loadHost,
  };
};
