import { appState } from '@modules/app/store';
import { apiClient } from '@modules/client';
import { layoutState } from '@modules/layout/store/layoutAtoms';
import { nodeTypeList } from '@shared/constants/lookups';
import { Uuid, Node } from 'blockjoy-mock-grpc/dist/out/common_pb';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState, useSetRecoilState } from 'recoil';

type Args = string | string[] | undefined;

export type CreateNodeParams = {
  nodeType: string;
  host: string;
};

const createNodeId = (id: Args) => {
  const nodeId = new Uuid();
  nodeId.setValue(id?.toString() || '');
  return nodeId;
};

export const useNode = () => {
  const setLayout = useSetRecoilState(layoutState);
  const [app, setApp] = useRecoilState(appState);
  const [node, setNode] = useState<Node>();
  const [nodes, setNodes] = useState<MappedHost[]>();

  const deleteNode = async (id: Args) => {
    await apiClient.execDeleteNode(createNodeId(id));
    toast.success(`Node Deleted`);
  };

  const stopNode = async (id: Args) => {
    await apiClient.execDeleteNode(createNodeId(id));
    toast.success(`Node Stopped`);
  };

  const restartNode = async (id: Args) => {
    await apiClient.execStopNode(createNodeId(id));
    toast.success(`Node Restarted`);
  };

  const loadNode = async (id: Args) => {
    const nodeId = createNodeId(id);

    const node: any = await apiClient.getNode(nodeId);

    const details = [
      {
        label: 'TYPE',
        data: nodeTypeList.find((n) => n.id === node.type)?.name,
      },
      { label: 'WALLET ADDRESS', data: node.walletAddress },
      { label: 'VERSION', data: node.version },
      { label: 'BLOCK HEIGHT', data: node.blockHeight },
    ];

    const activeNode: any = {
      id: node.id.value,
      status: node.status,
      name: node.name,
      ip: node.ip,
      created: formatDistanceToNow(new Date(node.created_at_datetime), {
        addSuffix: true,
      }),
      details,
    };

    setNode(activeNode);
    setApp({ ...app, nodeLoading: false, node: activeNode });
  };

  const loadHosts = async () => {
    const hosts: any = await apiClient.getHosts();

    const mappedHosts = hosts.map((host: Host) => ({
      value: host.id.value,
      label: host.name,
    }));

    setNodes(mappedHosts);
  };

  const createNode = async (params: CreateNodeParams) => {
    const nodeType = Node.NodeType[params.nodeType];

    const hostId = new Uuid();
    hostId.setValue(params.host);

    const node = new Node();
    node.setType(nodeType);
    node.setHostId();

    await apiClient.createNode(node);

    toast.success('Node Created');
    setLayout(undefined);
  };

  return {
    loadNode,
    deleteNode,
    stopNode,
    restartNode,
    loadHosts,
    createNode,
    nodes,
  };
};
