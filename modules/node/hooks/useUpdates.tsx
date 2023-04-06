import { useRouter } from 'next/router';
import { useNodeList } from './useNodeList';
import { useNodeView } from './useNodeView';
import { NodeMessage } from '@blockjoy/blockjoy-grpc/dist/out/mqtt_pb';
import { toast } from 'react-toastify';

export const useUpdates = () => {
  const router = useRouter();

  const { addToNodeList, removeFromNodeList } = useNodeList();
  const { unloadNode } = useNodeView();

  const handleNodeUpdate = (message: Message) => {
    const { payload } = message;

    let payloadDeserialized = NodeMessage.deserializeBinary(
      new Uint8Array(payload),
    ).toObject();

    if (payloadDeserialized.created) {
      console.log('MQTT payload (node created): ', payloadDeserialized.created);

      const { node } = payloadDeserialized.created;

      addToNodeList(node);

      toast.success(
        <div>
          {node?.createdByName} launched a node{' '}
          <a onClick={() => router.push(`/nodes/${node?.id}`)}>
            Click here to view it
          </a>
        </div>,
        {
          autoClose: 5000,
          hideProgressBar: false,
        },
      );
    } else if (payloadDeserialized.deleted) {
      console.log('MQTT payload (node deleted): ', payloadDeserialized.deleted);

      const { nodeId, deletedByName } = payloadDeserialized.deleted;

      removeFromNodeList(nodeId);
      unloadNode();

      toast.success(`${deletedByName} just deleted a node`, {
        autoClose: 5000,
        hideProgressBar: false,
      });
    } else if (payloadDeserialized.updated) {
      console.log('MQTT payload (node updated): ', payloadDeserialized.updated);

      const { node, updatedByName } = payloadDeserialized.updated;

      toast.success(`${updatedByName} just updated a node`, {
        autoClose: 5000,
        hideProgressBar: false,
      });
    }
  };

  return {
    handleNodeUpdate,
  };
};
