import { useRecoilState } from 'recoil';
import { appState } from '@modules/app/store';
import { Uuid } from 'blockjoy-mock-grpc/dist/out/common_pb';
import { Host } from '@modules/app/components/host/Host';
import { TableBlockNodes } from '@modules/app/components/shared/table/TableBlockNodes';
import { NodeStatus } from '@modules/app/components/shared/node-status/NodeStatus';
import { apiClient } from '@modules/client';
import { Button } from '@shared/components';
import { styles as detailsHeaderStyles } from '@modules/app/components/shared/details-header/DetailsHeader.styles';
import { toast } from 'react-toastify';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

type Hook = {
  loadHost: (args1: string) => void;
  stopHost: (args1: string) => void;
  restartHost: (args1: string) => void;
  deleteHost: (args1: string) => void;
  stopNode: (args1: string, args2?: InputEvent) => void;
  restartNode: (args1: string, args2?: InputEvent) => void;
};

export const useHost = (): Hook => {
  const [app, setApp] = useRecoilState(appState);

  const deleteHost = async (id: string) => {
    const uuid = new Uuid();
    uuid.setValue(id?.toString()!);
    await apiClient.execDeleteNode(uuid);
    toast.success(`Host Deleted`);
  };

  const stopHost = async (id: string) => {
    const uuid = new Uuid();
    uuid.setValue(id?.toString()!);
    await apiClient.execStopHost(uuid);
    toast.success(`Host Stopped`);
  };

  const restartHost = async (id: string) => {
    const uuid = new Uuid();
    uuid.setValue(id?.toString()!);
    await apiClient.execRestartHost(uuid);
    toast.success(`Host Restarted`);
  };

  const stopNode = async (id: string, e: any) => {
    if (e) {
      e.stopPropagation();
    }
    const uuid = new Uuid();
    uuid.setValue(id!);
    await apiClient.execStopNode(uuid);
    toast.success(`Node Stopped`);
  };

  const restartNode = async (id: string, e: any) => {
    if (e) {
      e.stopPropagation();
    }
    const uuid = new Uuid();
    uuid.setValue(id!);
    await apiClient.execRestartNode(uuid);
    toast.success(`Node Restarted`);
  };

  const loadHost = async (id: string) => {
    setApp({
      ...app,
      hostLoading: true,
    });

    const uuid = new Uuid();
    uuid.setValue(id!);

    const hosts: any = await apiClient.getHosts(uuid);
    const host = hosts[0];

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
          component: <NodeStatus status={node.status} />,
        },
        {
          key: '3',
          component: (
            <span className="show-on-hover" css={detailsHeaderStyles.actions}>
              <Button
                onClick={(e) => stopNode(id, e)}
                type="button"
                size="small"
                style="secondary"
              >
                Stop
              </Button>
              <Button
                onClick={(e) => restartNode(id, e)}
                type="button"
                size="small"
                style="secondary"
              >
                Restart
              </Button>
            </span>
          ),
        },
      ],
    }));

    const details = [
      {
        label: 'CREATED',
        data: formatDistanceToNow(new Date(host.created_at_datetime), {
          addSuffix: true,
        }),
      },
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
    stopHost,
    restartHost,
    stopNode,
    restartNode,
    deleteHost,
  };
};
