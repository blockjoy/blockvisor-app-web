import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { escapeHtml } from '@shared/utils/escapeHtml';
import { display } from 'styles/utils.display.styles';

type Props = Partial<Pick<Node, 'displayName' | 'nodeName'>>;

export const DisplayName = ({ displayName, nodeName }: Props) => (
  <span css={display.ellipsis}>
    {escapeHtml(displayName || nodeName || '')}
  </span>
);
