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

export const useUpdates = () => {
  const router = useRouter();

  const user = useRecoilValue(authAtoms.user);

  const { addToNodeList, removeFromNodeList } = useNodeList();
  const { unloadNode, modifyNode, node: activeNode } = useNodeView();

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

        addToNodeList(node);

        if (node?.createdBy === user?.id) break;

        showNotification(
          type,
          `${node?.createdByName} launched a node `,
          <a onClick={() => router.push(`/nodes/${node?.id}`)}>View Node</a>,
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
          modifyNode(payloadDeserialized.updated?.node!);
        }

        break;
      }
      case !!payloadDeserialized.deleted: {
        console.log(
          'MQTT payload (node deleted): ',
          payloadDeserialized.deleted,
        );

        const { nodeId, deletedBy, deletedByName }: NodeDeleted =
          payloadDeserialized.deleted!;

        removeFromNodeList(nodeId);

        if (activeNode?.id === nodeId) {
          unloadNode();
        }

        if (deletedBy === user?.id) break;

        showNotification(type, `${deletedByName} just deleted a node`);
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
