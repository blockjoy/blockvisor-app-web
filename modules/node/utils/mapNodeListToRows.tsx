import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { NodeListItem } from '../types/common';

export const mapNodeListToRows = (
  nodeList: Node[],
  headers: NodeListItem[],
): Row[] =>
  nodeList?.map((node) => ({
    key: node.nodeId!,
    cells: headers.map(({ key, component }) => ({
      key,
      component: component(node),
    })),
  }));
