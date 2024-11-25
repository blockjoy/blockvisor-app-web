import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { display } from 'styles/utils.display.styles';

type Props = Partial<Pick<Node, 'createdBy'>>;

export const CreatedBy = ({ createdBy }: Props) => (
  <span css={display.ellipsis}>{createdBy?.name}</span>
);
