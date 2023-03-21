import { authAtoms } from '@modules/auth';
import { apiClient } from '@modules/client';
import { env } from '@shared/constants/env';
import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { nodeAtoms } from '../store/nodeAtoms';

type MqttNodeUpdate = {
  topic: string | 'node-updated' | 'node-deleted' | 'node-created';
  payload: Buffer;
};

export const useNodeUpdates = (defaultOrganization: {
  name: string;
  id: string;
}) => {
  const [nodeList, setNodeList] = useRecoilState(nodeAtoms.nodeList);
  const [activeNode, setActiveNode] = useRecoilState(nodeAtoms.activeNode);
  const user = useRecoilValue(authAtoms.user);
  const mqttOrgId = useRef('');
  const accessToken = useRef('');

  const deleteFromNodeList = (node: any) => {
    console.log('deleteFromNodeList', node);
    const newNodeList = nodeList.filter((n) => n.id !== node.nodeId);
    setNodeList(newNodeList);
  };

  const addToNodeList = (node: any) => {
    console.log('addToNodeList', node);

    const nodeListCopy = [...nodeList];

    nodeListCopy.push(node);

    setNodeList(nodeList);
  };

  const updateNodeList = (node: any) => {
    console.log('updateNodeList', node);

    const nodeListCopy = [...nodeList];

    const nodeIndex = nodeListCopy.findIndex(node.id);
    nodeListCopy[nodeIndex] = node;
    setNodeList(nodeListCopy);
  };

  const updateActiveNode = (node: any) => {
    if (node.id === activeNode?.id) {
      let nodeCopy = { ...activeNode };

      // nodeCopy.status = 4;

      setActiveNode({
        ...activeNode,
        ...node,
      });

      console.log('MQTT: New activeNode ', nodeCopy);
    } else {
      console.log(activeNode, node?.id);
      console.log("MQTT: Couldn't find an activeNode");
    }
  };

  const handleNodeUpdate = (payload: any) => {
    const { node, type } = payload;

    console.log('MQTT: Node Update From Server ', node, type);

    switch (type) {
      case 'update': {
        updateNodeList(node);
        updateActiveNode(node);
        break;
      }
      case 'create': {
        addToNodeList(node);
        break;
      }
      case 'delete': {
        deleteFromNodeList(node);
        break;
      }
    }
  };

  // reconnect MQTT if organization changed
  useEffect(() => {
    if (defaultOrganization?.id !== mqttOrgId.current) {
      console.log('MQTT: Organization Changed');
      accessToken.current = user?.accessToken!;
      mqttOrgId.current = defaultOrganization?.id;
      apiClient.getUpdates(env.eqmx_url!, handleNodeUpdate);
    }
  }, [defaultOrganization?.id, nodeList?.length]);

  // reconnect MQTT if access token changed
  useEffect(() => {
    if (user?.accessToken !== accessToken.current) {
      console.log('MQTT: Access Token Changed');
      accessToken.current = user?.accessToken!;
      apiClient.getUpdates(env.eqmx_url!, handleNodeUpdate);
    }
  }, [user?.accessToken]);

  // manually test nodeList updates
  // useEffect(() => {
  //   if (nodeList?.length) {
  //     setTimeout(() => {
  //       const newNode = {
  //         ...nodeList[0],
  //         status: 10,
  //       };
  //       console.log('manually updating nodeList', newNode);
  //       updateNode(newNode);
  //     }, 2000);
  //   }
  // }, [nodeList?.length]);

  // manually test activeNode updates
  // useEffect(() => {
  //   if (activeNode?.id) {
  //     setTimeout(() => {
  //       console.log('manually updating activeNode');
  //       updateNode({
  //         ...activeNode,
  //         status: 10,
  //         address: 'TEst',
  //         blockHeight: 'e354324234234',
  //       });
  //     }, 2000);
  //   }
  // }, [activeNode?.id]);
};
