import { Button } from '@shared/components';
import { CopyNode } from '@shared/components/CopyNode/CopyNode';
import { FC } from 'react';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './NodeViewDetailsHeader.styles';
import { BlockchainIcon, NodeStatus } from '@shared/components';

interface Props {
  title: string;
  ip: string;
  id?: string;
  date?: string;
  location?: string;
  status: number;
  blockchainId: string;
  handleStop?: VoidFunction;
  handleRestart?: VoidFunction;
}

export const NodeViewDetailsHeader: FC<Props> = ({
  title,
  ip,
  id,
  date,
  status,
  location,
  blockchainId,
  handleStop,
  handleRestart,
}) => {
  return (
    <header css={styles.header}>
      <div css={styles.blockchainIcon}>
        <BlockchainIcon blockchainId={blockchainId} />
      </div>
      <div>
        <div css={styles.detailsHeader}>
          <h2>{title}</h2>
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
          {date && <small css={[typo.small, colors.text2]}>{date}</small>}
        </div>
      </div>
      <form css={styles.actions}>
        <Button onClick={handleStop} style="secondary" size="small">
          Stop
        </Button>
        <Button onClick={handleRestart} style="secondary" size="small">
          Restart
        </Button>
      </form>
    </header>
  );
};
