import { formatDistanceToNow } from 'date-fns';
import { nodeTypeList } from '@shared/constants/lookups';
import { toast } from 'react-toastify';
import { apiClient } from '@modules/client';
import { useState } from 'react';
import { delay } from '@shared/utils/delay';
import { env } from '@shared/constants/env';
import { LockedSwitch } from '@modules/node/components/LockedSwitch/LockedSwitch';
import { useRecoilState } from 'recoil';
import { nodeAtoms } from '../store/nodeAtoms';
import { NodeTypeConfigLabel } from '@shared/components';

type Args = string | string[] | undefined;

type Hook = {
  loadNode: (args1: Args) => void;
  deleteNode: (args1: Args) => void;
  stopNode: (args1: Args) => void;
  restartNode: (args1: Args) => void;
  isLoading: boolean;
  node: BlockjoyNode | null;
};

const createUuid = (id: Args) => {
  const uuid = id?.toString() || '';
  return uuid;
};

export const useNodeView = (): Hook => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [node, setNode] = useRecoilState(nodeAtoms.activeNode);

  const deleteNode = async (id: Args) => {
    await apiClient.deleteNode(createUuid(id));
    toast.success(`Node Deleted`);
  };

  const stopNode = async (id: Args) => {
    await apiClient.execStopNode(createUuid(node?.hostId), createUuid(id));
    toast.success(`Node Stopped`);
  };

  const restartNode = async (id: Args) => {
    await apiClient.execStartNode(createUuid(node?.hostId), createUuid(id));
    toast.success(`Node Started`);
  };

  const loadNode = async (id: Args) => {
    setIsLoading(true);

    const nodeId = createUuid(id);
    const node: any = await apiClient.getNode(nodeId);

    console.log('loadNode', node);
    const nodeType = JSON.parse(node.type);

    const details = [
      {
        label: 'TYPE',
        data: nodeTypeList.find((n) => n.id === nodeType?.id)?.name,
      },
      { label: 'NODE ADDRESS', data: node.walletAddress },
      { label: 'VERSION', data: node.version || 'Latest' },
      { label: 'BLOCK HEIGHT', data: node.blockHeight },
      { label: 'AUTO UPDATES', data: <LockedSwitch /> },
    ];

    const nodeTypeConfigDetails = nodeType.properties
      ?.filter(
        (property: any) =>
          property.ui_type !== 'key-upload' &&
          !property.ui_type.includes('pwd'),
      )
      .map((property: any) => ({
        label: <NodeTypeConfigLabel>{property.name}</NodeTypeConfigLabel>,
        data:
          property.value === 'null' ? (
            '-'
          ) : property.ui_type === 'switch' ? (
            <LockedSwitch
              tooltip="You will be able to edit this setting after BETA."
              isChecked={property.value === 'true' ? true : false}
            />
          ) : (
            property.value
          ),
      }));

    const activeNode: BlockjoyNode = {
      id: node.id,
      hostId: node.hostId.value,
      status: node.status,
      name: node.name,
      ip: node.ip,
      blockchainId: node.blockchainId,
      created: formatDistanceToNow(new Date(node.created_at_datetime), {
        addSuffix: true,
      }),
      details,
      nodeTypeConfig: nodeType.properties,
      nodeTypeConfigDetails,
    };

    setNode(activeNode);

    await delay(env.loadingDuration);

    setIsLoading(false);
  };

  return {
    loadNode,
    deleteNode,
    stopNode,
    restartNode,
    node,
    isLoading,
  };
};
