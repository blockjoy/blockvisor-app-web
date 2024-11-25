import { css } from '@emotion/react';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { NodeItems } from '@shared/components';
import { typo } from 'styles/utils.typography.styles';

type Props = Partial<
  Pick<Node, 'displayName' | 'blockchainName' | 'createdAt'>
>;

export const Info = ({ displayName, blockchainName, createdAt }: Props) => (
  <span css={styles.wrapper}>
    <NodeItems.BlockchainName
      blockchainName={blockchainName}
      showName={false}
    />
    <span css={[styles.rightColumn, typo.ellipsis]}>
      <NodeItems.DisplayName displayName={displayName} />
      <NodeItems.CreatedAt createdAt={createdAt} />
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
