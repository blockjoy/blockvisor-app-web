import { useRouter } from 'next/router';
import {
  NodeCreated,
  NodeDeleted,
  NodeMessage,
  NodeUpdated,
} from '@blockjoy/blockjoy-grpc/dist/out/mqtt_pb';
import { useNodeList, useNodeView } from '@modules/node';
import { showNotification } from '@modules/mqtt';
import { useRecoilValue } from 'recoil';
import { authAtoms } from '@modules/auth';

export const useUpdates = () => {
  const router = useRouter();

  const user = useRecoilValue(authAtoms.user);

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

        if (node?.createdBy === user?.id) break;

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

        const { updatedBy, updatedByName }: NodeUpdated.AsObject =
          payloadDeserialized.updated!;

        if (updatedBy === user?.id) break;

        showNotification(type, `${updatedByName} just updated a node`);
        break;
      }
      case !!payloadDeserialized.deleted: {
        console.log(
          'MQTT payload (node deleted): ',
          payloadDeserialized.deleted,
        );

        const { nodeId, deletedBy, deletedByName }: NodeDeleted.AsObject =
          payloadDeserialized.deleted!;

        if (deletedBy === user?.id) break;

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
