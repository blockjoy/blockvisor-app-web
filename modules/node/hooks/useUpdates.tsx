import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { css } from '@emotion/react';
import {
  NodeCreated,
  NodeDeleted,
  NodeMessage,
  NodeUpdated,
} from '@modules/grpc/library/blockjoy/v1/event';
import {
  getCreatedByName,
  nodeAtoms,
  useNodeList,
  useNodeView,
} from '@modules/node';
import { showNotification } from '@modules/mqtt';
import { authAtoms, authSelectors } from '@modules/auth';
import {
  organizationAtoms,
  organizationSelectors,
} from '@modules/organization';

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

  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );
  const allOrganizations = useRecoilValue(organizationAtoms.allOrganizations);
  const allNodes = useRecoilValue(nodeAtoms.nodeList);

  const { addToNodeList, removeFromNodeList, modifyNodeInNodeList } =
    useNodeList();
  const { unloadNode, modifyNode, node: activeNode } = useNodeView();
  const canGetHost = useRecoilValue(authSelectors.hasPermission('host-get'));
  const canGetNode = useRecoilValue(authSelectors.hasPermission('node-get'));

  const handleNodeUpdate = (message: Message) => {
    const { type, payload }: Message = message;

    let payloadDeserialized = NodeMessage.decode(new Uint8Array(payload));

    switch (true) {
      case !!payloadDeserialized.created: {
        console.log(
          'MQTT payload (node created): ',
          payloadDeserialized.created,
        );

        const { node, createdBy }: NodeCreated = payloadDeserialized.created!;

        addToNodeList(node!);

        if (createdBy?.resourceId === user?.userId) break;

        const createdByName = getCreatedByName({
          createdBy,
          hostId: node?.hostId,
          hostDisplayName: node?.hostDisplayName,
          hostNetworkName: node?.hostNetworkName,
          defaultOrganization,
          allOrganizations,
          allNodes,
        });

        const message = createdBy?.resourceId ? (
          `${createdByName} launched a node `
        ) : (
          <>
            Node launched from CLI for Host{' '}
            {canGetHost ? (
              <a
                css={styles.linkToHost}
                onClick={() => router.push(`/hosts/${node?.hostId}`)}
              >
                {node?.hostDisplayName || node?.hostNetworkName}
              </a>
            ) : (
              ''
            )}
          </>
        );

        const content = canGetNode ? (
          <a onClick={() => router.push(`/nodes/${node?.nodeId}`)}>View Node</a>
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

        if (mqttNode?.nodeId === activeNode?.nodeId) {
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

        const deletedNode = allNodes?.find((node) => node.nodeId === nodeId);

        removeFromNodeList(nodeId);

        if (activeNode?.nodeId === nodeId) {
          unloadNode();
        }

        if (deletedBy?.resourceId === user?.userId) break;

        const deletedByName = getCreatedByName({
          createdBy: deletedBy,
          hostId: deletedNode?.hostId,
          hostDisplayName: deletedNode?.hostDisplayName,
          hostNetworkName: deletedNode?.hostNetworkName,
          defaultOrganization,
          allOrganizations,
          allNodes,
        });

        const message = deletedBy?.resourceId
          ? `${deletedByName} just deleted a node`
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
