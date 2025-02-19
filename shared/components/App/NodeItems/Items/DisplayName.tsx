import { css } from '@emotion/react';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { escapeHtml } from '@shared/utils/escapeHtml';
import { display } from 'styles/utils.display.styles';

type Props = Partial<Pick<Node, 'displayName' | 'nodeName'>>;

export const DisplayName = ({ displayName, nodeName }: Props) => (
  <span css={[display.ellipsis, styles.wrapper]}>
    {escapeHtml(displayName || nodeName || '')}
  </span>
);

const styles = {
  wrapper: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    line-height: 1.6;
  `,
};
