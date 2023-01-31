import { apiClient } from '@modules/client';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { nodeAtoms } from '../store/nodeAtoms';

export const useNodeUpdates = () => {
  const [nodeList, setNodeList] = useRecoilState(nodeAtoms.nodeList);
  const [activeNode, setActiveNode] = useRecoilState(nodeAtoms.activeNode);

  const refreshNodeList = (node: any) => {
    if (nodeList && nodeList.some((n) => n.id === node.id)) {
      const nodeListCopy = [...nodeList];
      let foundNode = { ...nodeListCopy.find((n) => n.id === node.id) };
      if (!foundNode) return;
      foundNode.status = node.status;
      setNodeList(nodeListCopy);
      console.log('updateNode: New nodeList ', nodeListCopy);
    } else {
      console.log("updateNode: Couldn't find node in nodeList");
    }
  };

  const refreshActiveNode = (node: any) => {
    if (node.id === activeNode?.id) {
      let nodeCopy = Object.assign({}, activeNode);
      let detailsCopy = [...nodeCopy.details];
      nodeCopy.status = 4;
      // nodeCopy.status = node?.status!;

      const blockHeight = {
        ...detailsCopy?.find((d) => d.label === 'BLOCK HEIGHT'),
      };

      if (blockHeight) {
        // blockHeight.data = '1';
        blockHeight.data = node.blockHeight;
        detailsCopy.splice(
          detailsCopy.findIndex((d) => d.label === 'BLOCK HEIGHT'),
          1,
          {
            label: blockHeight.label!,
            data: blockHeight.data!,
          },
        );
        nodeCopy.details = detailsCopy;
      } else {
        console.log("updateNode: Couldn't find blockHeight");
      }

      setActiveNode(nodeCopy);
      console.log('updateNode: New activeNode ', nodeCopy);
    } else {
      console.log("updateNode: Couldn't find an activeNode");
    }
  };

  const updateNode = (node: any) => {
    console.log('updateNode: Node from server ', node);
    refreshNodeList(node);
    refreshActiveNode(node);
  };

  useEffect(() => {
    console.log('Subscribing to upstream');
    apiClient.getUpdates((node: any) => {
      updateNode(node);
    });
  }, []);
};
