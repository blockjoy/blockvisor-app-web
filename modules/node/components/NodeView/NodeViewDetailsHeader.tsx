import { Button } from '@shared/components';
import { CopyNode } from '@shared/components/CopyNode/CopyNode';
import { FC } from 'react';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './NodeViewDetailsHeader.styles';
import { BlockchainIcon, NodeStatus } from '@shared/components';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

interface Props {
  title: string;
  ip: string;
  id?: string;
  date?: Date;
  status: number;
  blockchainName: string;
  handleStop?: VoidFunction;
  handleRestart?: VoidFunction;
}

export const NodeViewDetailsHeader: FC<Props> = ({
  title,
  ip,
  id,
  date,
  status,
  blockchainName,
  handleStop,
  handleRestart,
}) => {
  return (
    <header css={styles.header}>
      <div css={styles.blockchainIcon}>
        <BlockchainIcon size="40px" blockchainName={blockchainName} />
      </div>
      <div>
        <div css={styles.detailsHeader}>
          <h2 data-cy={'node-details-title'}>{title}</h2>
          <div>
            <NodeStatus status={status} />
          </div>
        </div>
        <div css={styles.detailsFooter}>
          <CopyNode value={id!}>
            <small
              css={[styles.nodeId, typo.small, colors.text3, typo.ellipsis]}
            >
              {id}
            </small>
          </CopyNode>
          {ip && <small css={[typo.small, colors.text2]}>{ip}</small>}
          {date && (
            <small css={[typo.small, colors.text2]}>
              {formatDistanceToNow(date!, {
                addSuffix: true,
              })}
            </small>
          )}
        </div>
      </div>
      <form css={styles.actions}>
        <Button onClick={handleStop} style="secondary" size="small">
          Stop
        </Button>
        <Button onClick={handleRestart} style="secondary" size="small">
          Start
        </Button>
      </form>
    </header>
  );
};
