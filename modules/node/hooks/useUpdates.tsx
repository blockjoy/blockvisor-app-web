import { useRouter } from 'next/router';
import {
  NodeCreated,
  NodeDeleted,
  NodeMessage,
  NodeUpdated,
} from '@blockjoy/blockjoy-grpc/dist/out/mqtt_pb';
import { useNodeList, useNodeView } from '@modules/node';
import { showNotification } from '@modules/mqtt';

export const useUpdates = () => {
  const router = useRouter();

  const { addToNodeList, removeFromNodeList } = useNodeList();
  const { unloadNode } = useNodeView();

  const handleNodeUpdate = (message: Message) => {
    const { type, payload }: Message = message;

    let payloadDeserialized = NodeMessage.deserializeBinary(
      new Uint8Array(payload),
    ).toObject();

    switch (true) {
      case !!payloadDeserialized.created: {
        console.log(
          'MQTT payload (node created): ',
          payloadDeserialized.created,
        );

        const { node }: NodeCreated.AsObject = payloadDeserialized.created!;
        addToNodeList(node);

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

        const { updatedByName }: NodeUpdated.AsObject =
          payloadDeserialized.updated!;

        showNotification(type, `${updatedByName} just updated a node`);
        break;
      }
      case !!payloadDeserialized.deleted: {
        console.log(
          'MQTT payload (node deleted): ',
          payloadDeserialized.deleted,
        );

        const { nodeId, deletedByName }: NodeDeleted.AsObject =
          payloadDeserialized.deleted!;
        removeFromNodeList(nodeId);
        unloadNode();

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
