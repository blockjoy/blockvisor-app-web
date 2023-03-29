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
  const { removeFromNodeList } = useNodeList();

  const deleteNode = async (id: Args) => {
    const uuid = createUuid(id);
    await apiClient.deleteNode(uuid);
    removeFromNodeList(uuid);
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

    if (!node.id) {
      setIsLoading(false);
      onError();
      return;
    }

    checkForTokenError(node);

    const details = [
      {
        label: 'TYPE',
        data: nodeTypeList.find((n) => n.id === node.type)?.name,
      },
      { label: 'HOST', data: node.hostName || 'Unknown' },
      { label: 'NODE ADDRESS', data: node?.address || '-' },
      { label: 'VERSION', data: node.version || 'Latest' },
      { label: 'BLOCK HEIGHT', data: node.blockHeight },
    ];

    const nodeTypeConfigDetails = node.propertiesList
      ?.filter(
        (property: any) =>
          property.uiType !== 'key-upload' && !property.uiType.includes('pwd'),
      )
      .map((property: any) => ({
        id: property.name,
        label: <NodeTypeConfigLabel>{property.name}</NodeTypeConfigLabel>,
        data:
          property.value === 'null' ? (
            '-'
          ) : property.uiType === 'switch' ? (
            <LockedSwitch
              tooltip="You will be able to enable Self Hosting after BETA."
              isChecked={property.value === 'true' ? true : false}
            />
          ) : (
            escapeHtml(property.value)
          ),
      }));

    nodeTypeConfigDetails.unshift({
      id: 'auto-updates',
      label: 'AUTO UPDATES',
      data: <LockedSwitch />,
    });

    nodeTypeConfigDetails.unshift({
      id: 'network',
      label: 'NETWORK',
      data: node.network || '-',
    });

    const activeNode: BlockjoyNode = {
      ...node,
      created: formatDistanceToNow(new Date(node.created_at_datetime), {
        addSuffix: true,
      }),
      details,
      nodeTypeConfig: node.propertiesList,
      nodeTypeConfigDetails,
    };

    setNode(activeNode);

    // this is causing some weird duplicate bug
    // updateNodeList(node);

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
