import { useRouter } from 'next/router';
import {
  NodeCreated,
  NodeDeleted,
  NodeMessage,
  NodeUpdated,
} from '@modules/grpc/library/blockjoy/v1/mqtt';
import { useNodeList, useNodeView } from '@modules/node';
import { showNotification } from '@modules/mqtt';
import { useRecoilValue } from 'recoil';
import { authAtoms } from '@modules/auth';
import { usePermissions } from '@modules/auth/hooks/usePermissions';

export const useUpdates = () => {
  const router = useRouter();
  const user = useRecoilValue(authAtoms.user);
  const { addToNodeList, removeFromNodeList, modifyNodeInNodeList } =
    useNodeList();
  const { unloadNode, modifyNode, node: activeNode } = useNodeView();
  const { hasPermission } = usePermissions();

  const handleNodeUpdate = (message: Message) => {
    const { type, payload }: Message = message;

    let payloadDeserialized = NodeMessage.decode(new Uint8Array(payload));

    switch (true) {
      case !!payloadDeserialized.created: {
        console.log(
          'MQTT payload (node created): ',
          payloadDeserialized.created,
        );

        const { node }: NodeCreated = payloadDeserialized.created!;

        addToNodeList(node!);

        if (node?.createdBy?.resourceId === user?.id) break;

        showNotification(
          type,
          `${node?.createdBy?.name} launched a node `,
          hasPermission('node-admin-get') ? (
            <a onClick={() => router.push(`/nodes/${node?.id}`)}>View Node</a>
          ) : (
            ''
          ),
        );
        break;
      }
      case !!payloadDeserialized.updated: {
        console.log(
          'MQTT payload (node updated): ',
          payloadDeserialized.updated,
        );

        const { node: mqttNode }: NodeUpdated = payloadDeserialized.updated!;

        if (mqttNode?.id === activeNode?.id) {
          modifyNode(mqttNode!);
        }

        modifyNodeInNodeList(mqttNode!);

        break;
      }
      case !!payloadDeserialized.deleted: {
        console.log(
          'MQTT payload (node deleted): ',
          payloadDeserialized.deleted,
        );

        const { nodeId, deletedBy }: NodeDeleted = payloadDeserialized.deleted!;

        removeFromNodeList(nodeId);

        if (activeNode?.id === nodeId) {
          unloadNode();
        }

        if (deletedBy?.resourceId === user?.id) break;

        showNotification(type, `${deletedBy?.name} just deleted a node`);
        break;
      }
      default:
        break;
    }
  };

  return {
    handleNodeUpdate,
  };
};
