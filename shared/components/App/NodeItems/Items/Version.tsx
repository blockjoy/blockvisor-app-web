import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { display } from 'styles/utils.display.styles';

type Props = Partial<Pick<Node, 'version'>>;

export const Version = ({ version }: Props) => (
  <span css={display.ellipsis}>{version!}</span>
);
