import { Node } from '@modules/grpc/library/blockjoy/v1/node';

type Props = Partial<Pick<Node, 'network'>>;

export const Network = ({ network }: Props) => <span>{network!}</span>;
