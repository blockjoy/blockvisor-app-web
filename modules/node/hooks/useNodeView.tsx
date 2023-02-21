import { formatDistanceToNow } from 'date-fns';
import { nodeTypeList } from '@shared/constants/lookups';
import { toast } from 'react-toastify';
import { apiClient } from '@modules/client';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { nodeAtoms } from '../store/nodeAtoms';
import { NodeTypeConfigLabel, LockedSwitch } from '@shared/components';
import { useNodeList } from './useNodeList';
import { checkForTokenError } from 'utils/checkForTokenError';
import { escapeHtml } from '@shared/utils/escapeHtml';

type Args = string | string[] | undefined;

type Hook = {
  loadNode: (id: Args, onError: VoidFunction) => Promise<void>;
  deleteNode: (args1: Args) => void;
  stopNode: (nodeId: Args) => void;
  restartNode: (nodeId: Args) => void;
  isLoading: boolean;
  unloadNode: any;
  node: BlockjoyNode | null;
};

const createUuid = (id: Args) => {
  const uuid = id?.toString() || '';
  return uuid;
};

export const useNodeView = (): Hook => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [node, setNode] = useRecoilState(nodeAtoms.activeNode);
  const { updateNodeList, removeNodeFromTheList } = useNodeList();

  const deleteNode = async (id: Args) => {
    const uuid = createUuid(id);
    await apiClient.deleteNode(uuid);
    removeNodeFromTheList(uuid);
    toast.success(`Node Deleted`);
  };

  const stopNode = async (nodeId: Args) => {
    await apiClient.execStopNode(createUuid(node?.hostId), createUuid(nodeId));
    toast.success(`Node Stopped`);
  };

  const restartNode = async (nodeId: Args) => {
    await apiClient.execStartNode(createUuid(node?.hostId), createUuid(nodeId));
    toast.success(`Node Started`);
  };

  const loadNode = async (id: Args, onError: VoidFunction) => {
    setIsLoading(true);

    const nodeId = createUuid(id);
    const node: any = await apiClient.getNode(nodeId);

    checkForTokenError(node);

    let nodeType: any;

    try {
      nodeType = JSON.parse(node.type);
    } catch (error) {
      setIsLoading(false);
      onError();
      return;
    }

    const details = [
      {
        label: 'TYPE',
        data: nodeTypeList.find((n) => n.id === nodeType?.id)?.name,
      },
      { label: 'HOST', data: node.hostName || 'Unknown' },
      { label: 'NODE ADDRESS', data: node?.address || '-' },
      { label: 'VERSION', data: node.version || 'Latest' },
      { label: 'BLOCK HEIGHT', data: node.blockHeight },
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
              tooltip="You will be able to enable Self Hosting after BETA."
              isChecked={property.value === 'true' ? true : false}
            />
          ) : (
            escapeHtml(property.value)
          ),
      }));

    nodeTypeConfigDetails.unshift({
      label: 'AUTO UPDATES',
      data: <LockedSwitch />,
    });

    nodeTypeConfigDetails.unshift({
      label: 'NETWORK',
      data: node.network || '-',
    });

    const activeNode: BlockjoyNode = {
      id: node.id,
      hostId: node.hostId,
      status: node.status,
      name: node.name,
      ip: node.ip,
      blockchainId: node.blockchainId,
      blockchainName: node.blockchainName,
      created: formatDistanceToNow(new Date(node.created_at_datetime), {
        addSuffix: true,
      }),
      details,
      nodeTypeConfig: nodeType.properties,
      nodeTypeConfigDetails,
    };

    setNode(activeNode);

    updateNodeList(node);

    setIsLoading(false);
  };

  const unloadNode = () => {
    setNode(null);
  };

  return {
    loadNode,
    deleteNode,
    stopNode,
    restartNode,
    unloadNode,
    node,
    isLoading,
  };
};
