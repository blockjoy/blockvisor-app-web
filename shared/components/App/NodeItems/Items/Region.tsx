import { Node } from '@modules/grpc/library/blockjoy/v1/node';

type Props = Partial<Pick<Node, 'placement'>>;

export const Region = ({ placement }: Props) => (
  <span>{placement?.scheduler?.region}</span>
);
