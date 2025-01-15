import { css } from '@emotion/react';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { NodeItems } from '@shared/components';
import { typo } from 'styles/utils.typography.styles';

type Props = Partial<
  Pick<Node, 'displayName' | 'nodeName' | 'versionKey' | 'createdAt'>
>;

export const Info = ({
  displayName,
  nodeName,
  versionKey,
  createdAt,
}: Props) => (
  <span css={styles.wrapper}>
    <NodeItems.ProtocolName versionKey={versionKey} showName={false} />
    <span css={[styles.rightColumn, typo.ellipsis]}>
      <NodeItems.DisplayName displayName={displayName} nodeName={nodeName} />
      <NodeItems.CreatedAt createdAt={createdAt} inGroup />
    </span>
  </span>
);

const styles = {
  wrapper: css`
    display: flex;
    flex-flow: row nowrap;
    gap: 10px;
  `,
  rightColumn: css`
    display: flex;
    flex-direction: column;
    gap: 4px;
  `,
};
