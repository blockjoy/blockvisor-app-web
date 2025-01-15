import { Node } from '@modules/grpc/library/blockjoy/v1/node';

type Props = Partial<Pick<Node, 'regionName'>>;

export const Region = ({ regionName }: Props) => (
  <span>{regionName || '-'}</span>
);
