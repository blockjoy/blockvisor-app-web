import { Node } from '@modules/grpc/library/blockjoy/v1/node';

type Props = Partial<Pick<Node, 'regionKey'>>;

export const Region = ({ regionKey }: Props) => <span>{regionKey || '-'}</span>;
