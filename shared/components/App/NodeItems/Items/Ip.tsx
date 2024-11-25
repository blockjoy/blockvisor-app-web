import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { display } from 'styles/utils.display.styles';

type Props = Partial<Pick<Node, 'ip'>>;

export const Ip = ({ ip }: Props) => <span css={display.ellipsis}>{ip}</span>;
