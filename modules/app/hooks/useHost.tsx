import { useRecoilState } from 'recoil';
import { appState } from '@modules/app/store';
import { Uuid } from 'blockjoy-mock-grpc/dist/out/common_pb';
import { Host } from '@modules/app/components/host/Host';
import { TableBlockNodes } from '@modules/app/components/shared/table/TableBlockNodes';
import { HostStatus } from '@modules/app/components/host/HostStatus';

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

    console.log('host', host);

    const nodes = host.nodesList.map((node: any) => ({
      key: node.id.value,
      cells: [
        {
          key: '1',
          component: (
            <>
              <TableBlockNodes
                id={node.id.value}
                name={node.name}
                address={node.address}
              />
            </>
          ),
        },
        {
          key: '2',
          component: <HostStatus status={node.status} />,
        },
      ],
    }));

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
      nodes,
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
