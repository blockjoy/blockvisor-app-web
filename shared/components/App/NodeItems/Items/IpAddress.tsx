import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { display } from 'styles/utils.display.styles';

type Props = Partial<Pick<Node, 'ipAddress'>>;

export const IpAddress = ({ ipAddress }: Props) => (
  <span css={display.ellipsis}>{ipAddress}</span>
);
