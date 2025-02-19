import { css } from '@emotion/react';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { getNodeMetadataString } from '@modules/node';
import { ProtocolIcon } from '@shared/components';
import { typo } from 'styles/utils.typography.styles';

type Props = Partial<Pick<Node, 'versionKey' | 'versionMetadata'>> & {
  showName?: boolean;
};

export const ProtocolName = ({
  versionKey,
  versionMetadata,
  showName = true,
}: Props) => (
  <span css={styles.wrapper} className="has-hover-color">
    <ProtocolIcon size="36px" protocolName={versionKey?.protocolKey} />
    {showName && (
      <span css={typo.ellipsis}>
        {versionKey?.protocolKey} |{' '}
        {getNodeMetadataString(versionMetadata!, versionKey!)}
      </span>
    )}
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
