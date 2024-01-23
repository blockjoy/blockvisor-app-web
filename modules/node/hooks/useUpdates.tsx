import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { css } from '@emotion/react';
import {
  NodeCreated,
  NodeDeleted,
  NodeMessage,
  NodeUpdated,
} from '@modules/grpc/library/blockjoy/v1/mqtt';
import { useNodeList, useNodeView } from '@modules/node';
import { showNotification } from '@modules/mqtt';
import { authAtoms, usePermissions } from '@modules/auth';

const styles = {
  linkToHost: css`
    display: inline !important;

    &::after {
      content: none;
    }
  `,
};

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

        const message = node?.createdBy?.name ? (
          `${node?.createdBy?.name} launched a node `
        ) : (
          <>
            Node launched from CLI for Host{' '}
            {hasPermission('host-get') ? (
              <a
                css={styles.linkToHost}
                onClick={() => router.push(`/hosts/${node?.hostId}`)}
              >
                {node?.hostName}
              </a>
            ) : (
              ''
            )}
          </>
        );

        const content = hasPermission('node-get') ? (
          <a onClick={() => router.push(`/nodes/${node?.id}`)}>View Node</a>
        ) : (
          ''
        );

        showNotification(type, message, content);

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

        const message = deletedBy?.name
          ? `${deletedBy?.name} just deleted a node`
          : 'Node deleted from CLI';

        showNotification(type, message);

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
