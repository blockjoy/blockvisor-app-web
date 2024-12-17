import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { display } from 'styles/utils.display.styles';

type Props = Partial<Pick<Node, 'semanticVersion'>>;

export const Version = ({ semanticVersion }: Props) => (
  <span css={display.ellipsis}>{semanticVersion!}</span>
);
