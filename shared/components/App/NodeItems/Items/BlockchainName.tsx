import { css } from '@emotion/react';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { BlockchainIcon } from '@shared/components';
import { typo } from 'styles/utils.typography.styles';

type Props = Partial<Pick<Node, 'blockchainName'>> & { showName?: boolean };

export const BlockchainName = ({ blockchainName, showName = true }: Props) => (
  <span css={styles.wrapper} className="has-hover-color">
    <BlockchainIcon size="38px" blockchainName={blockchainName} />
    <ProtocolIcon size="36px" protocolName={node.versionKey?.protocolKey} />
    <p css={middleRowStyles}>
      {node.versionKey?.protocolKey} | {node.versionKey?.variantKey}
    </p>
    {showName && <span css={typo.ellipsis}>{blockchainName}</span>}
  </span>
);

const styles = {
  wrapper: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  `,
};
