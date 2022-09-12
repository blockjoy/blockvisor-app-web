import { useRecoilState } from 'recoil';
import { appState } from '@modules/app/store';
import { Uuid } from 'blockjoy-mock-grpc/dist/out/common_pb';
import { Node } from '@modules/app/components/node/Node';
import { formatDistanceToNow } from 'date-fns';

type Hook = {
  loadNode: (args1: string) => void;
};

export const useNode = (): Hook => {
  const [app, setApp] = useRecoilState(appState);
  const { grpcClient } = app;

  const loadNode = async (id: string) => {
    setApp({
      ...app,
      nodeLoading: true,
    });

    const uuid = new Uuid();
    uuid.setValue(id!);

    const node: any = await grpcClient.getNode(uuid);

    console.log('node', node);

    const details = [
      { label: 'TYPE', data: node.type },
      { label: 'WALLET ADDRESS', data: node.walletAddress },
      { label: 'VERSION', data: node.version },
      { label: 'BLOCK HEIGHT', data: node.blockHeight },
    ];

    const activeNode: Node = {
      id: node.id.value,
      status: node.status,
      name: node.name,
      ip: node.ip,
      created: formatDistanceToNow(new Date(node.created_at_datetime), {
        addSuffix: true,
      }),
      details,
    };

    setApp({
      ...app,
      node: activeNode,
      nodeLoading: false,
    });
  };

  return {
    loadNode,
  };
};
