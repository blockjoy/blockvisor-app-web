import { authAtoms } from '@modules/auth';
import { apiClient } from '@modules/client';
import { env } from '@shared/constants/env';
import { useEffect, useRef, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue } from 'recoil';
import { nodeAtoms } from '../store/nodeAtoms';
import { useNodeUIContext } from '../ui/NodeUIContext';
import { useFilters } from './useFilters';

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
  const nodeUIContext = useNodeUIContext();
  const nodeUIProps = useMemo(() => {
    return {
      setQueryParams: nodeUIContext.setQueryParams,
      queryParams: nodeUIContext.queryParams,
    };
  }, [nodeUIContext]);
  const { filters } = useFilters(nodeUIProps);

  const getNodeIndexInNodeList = (node: any) =>
    nodeList.findIndex((n) => n.id === node.id);

  const deleteFromNodeList = (node: any) => {};

  const addToNodeList = (node: any) => {};

  const updateNodeList = (node: any) => {
    const nodeListCopy = [...nodeList];

    const nodeIndex = getNodeIndexInNodeList(node);
    nodeListCopy[nodeIndex] = node;
    setNodeList(nodeListCopy);
    console.log('MQTT: New nodeList ', nodeListCopy);
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

  const getUpdateType = (node: any) => {
    const { created_by } = node;

    const hasFilters = filters.some((f) =>
      f.filterList.some((fl) => fl.isChecked),
    );

    const isInNodeList = getNodeIndexInNodeList(node) > -1;

    const isActiveNode = node?.id === activeNode?.id;

    // if someone else did something
    if (created_by !== user?.id) {
      if (!isInNodeList && hasFilters) {
        // TOAST: node created (view node / refresh list)
      } else if (!hasFilters) {
        if (isActiveNode) {
          // update activeNode
        }

        if (!isInNodeList) {
          // push new node to nodeList
        }
        // TOAST: node created (view node)
      }
    }

    // node created (not me)
    // node updated (not me)
  };

  const handleNodeUpdate = (node: any) => {
    const type = getUpdateType(node);

    console.log('MQTT: Node Update From Server ', node);
    switch (type) {
      case 'node-updated': {
        updateNodeList(node);
        updateActiveNode(node);
      }
      case 'node-created': {
        if (getNodeIndexInNodeList(node) > -1) {
          updateNodeList(node);
        } else {
          // check if filters are hiding new node
          if (filters.some((f) => f.filterList.some((fl) => fl.isChecked))) {
            // prompt user to reset filters to see it
          } else {
          }
          addToNodeList(node);
          // add node to nodeList if doesn't already exist
        }
      }
      case 'node-deleted': {
        // remove node from node list if it exists
        if (getNodeIndexInNodeList(node) > -1) {
          deleteFromNodeList(node);
        }
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
