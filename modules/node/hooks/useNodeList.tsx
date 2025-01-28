import { useRecoilState, useRecoilValue } from 'recoil';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { nodeClient } from '@modules/grpc';
import { nodeAtoms, nodeSelectors } from '@modules/node';
import {
  organizationAtoms,
  organizationSelectors,
} from '@modules/organization';
import { authSelectors } from '@modules/auth';

export const useNodeList = () => {
  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );
  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);
  const queryParams = useRecoilValue(nodeSelectors.queryParams);
  const allOrganizations = useRecoilValue(organizationAtoms.allOrganizations);
  const [nodeListLoadingState, setNodeListLoadingState] = useRecoilState(
    nodeAtoms.nodeListLoadingState,
  );
  const [nodeList, setNodeList] = useRecoilState(nodeAtoms.nodeList);
  const [nodeCount, setNodeCount] = useRecoilState(nodeAtoms.nodeCount);
  const [nodeListByHost, setNodeListByHost] = useRecoilState(
    nodeAtoms.nodeListByHost,
  );
  const [nodeListByHostCount, setNodeListByHostCount] = useRecoilState(
    nodeAtoms.nodeListByHostCount,
  );
  const [nodeListByHostLoadingState, setNodeListByHostLoadingState] =
    useRecoilState(nodeAtoms.isLoadingNodeListByHost);
  const [nodeListGlobal, setNodeListGlobal] = useRecoilState(
    nodeAtoms.nodeListGlobal,
  );
  const [nodeListGlobalLoadingState, setNodeListGlobalLoadingState] =
    useRecoilState(nodeAtoms.nodeListGlobalLoadingState);

  const loadNodes = async () => {
    if (nodeListLoadingState !== 'initializing')
      setNodeListLoadingState('loading');

    try {
      const response = await nodeClient.listNodes(
        defaultOrganization?.orgId!,
        queryParams.filter,
        queryParams.pagination,
        queryParams.sort,
      );

      // const { nodeCount } = response;
      const nodeCount = response.nodes.length;

      let nodes = response.nodes;

      setNodeCount(nodeCount);

      if (queryParams.pagination.currentPage !== 0) {
        nodes = [...nodeList!, ...nodes];
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'instant' as ScrollBehavior,
        });
      }

      setNodeList(nodes);
    } catch (err) {
      setNodeList([]);
      setNodeCount(0);
    } finally {
      setNodeListLoadingState('finished');
    }
  };

  // TODO: improve/remove - maybe merge into loadNodes, but then we're in problem that if a user goes to the nodes in general
  // and in the nodes screen a user will see only the nodes belonging to the specific host
  // but we still don't have a default host, nor filter by hosts
  const listNodesByHost = async (hostId: string, pagination: Pagination) => {
    setNodeListByHostLoadingState('initializing');

    const response = await nodeClient.listNodesByHost(
      hostId,
      pagination,
      isSuperUser ? undefined : defaultOrganization?.orgId!,
    );

    // const { nodeCount } = response;
    const nodeCount = response.nodes.length;

    setNodeListByHostCount(nodeCount);

    let nodes = response.nodes;

    if (pagination.currentPage !== 0) {
      nodes = [...nodeListByHost!, ...nodes];
    }

    setNodeListByHost(nodes);

    setNodeListByHostLoadingState('finished');
  };

  const loadGlobalNodes = async () => {
    try {
      setNodeListGlobalLoadingState('initializing');

      const orgIds = allOrganizations.map((org) => org.orgId);

      const response = await nodeClient.listNodes(
        undefined,
        {
          orgIds,
        },
        {
          currentPage: 0,
          itemsPerPage: 1000,
        },
      );

      setNodeListGlobal(response.nodes);
    } catch (error: any) {
      console.log('Error caught while fetching all nodes: ', error);
      setNodeListGlobal([]);
    } finally {
      setNodeListGlobalLoadingState('finished');
    }
  };

  const modifyNodeInNodeList = (node: Node) => {
    const nodeListCopy = [...nodeList];

    const foundNodeIndex = nodeListCopy?.findIndex(
      (n) => n.nodeId === node.nodeId,
    );

    if (foundNodeIndex < 0) return;

    nodeListCopy[foundNodeIndex] = node;

    setNodeList(nodeListCopy);
  };

  const addToNodeList = (node: Node) => {
    const foundNode =
      nodeList?.findIndex((n) => n.nodeId === node.nodeId)! > -1;
    if (foundNode) return;

    const newNodeList = [node, ...nodeList!];

    setNodeCount(nodeCount + 1);
    setNodeList(newNodeList);
  };

  const removeFromNodeList = (nodeId: string) => {
    const newNodeList = nodeList?.filter((nl) => nl.nodeId !== nodeId);

    if (newNodeList?.length !== nodeList?.length) {
      setNodeList(newNodeList);
      setNodeCount(nodeCount - 1);
    }
  };

  return {
    nodeList,
    nodeCount,
    loadNodes,
    nodeListLoadingState,
    addToNodeList,
    removeFromNodeList,
    modifyNodeInNodeList,
    listNodesByHost,
    nodeListByHost,
    nodeListByHostCount,
    nodeListByHostLoadingState,

    nodeListGlobal,
    nodeListGlobalLoadingState,
    loadGlobalNodes,
  };
};
