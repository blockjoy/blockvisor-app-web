import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { escapeHtml } from '@shared/utils/escapeHtml';
import { display } from 'styles/utils.display.styles';

type Props = Partial<Pick<Node, 'displayName'>>;

export const DisplayName = ({ displayName }: Props) => (
  <span css={display.ellipsis}>{escapeHtml(displayName!)}</span>
);
