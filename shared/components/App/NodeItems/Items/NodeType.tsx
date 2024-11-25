import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { convertNodeTypeToName } from '@modules/node';
import { capitalized } from '@modules/admin';

type Props = Partial<Pick<Node, 'nodeType'>>;

export const NodeType = ({ nodeType }: Props) => (
  <span>{capitalized(convertNodeTypeToName(nodeType!))}</span>
);
