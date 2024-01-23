import { Command } from '@modules/grpc/library/blockjoy/v1/command';
import { DateTime } from '@shared/components';
import { NodeCommandIcon } from './NodeCommandIcon/NodeCommandIcon';
import { styles } from './NodeCommandLog.styles';

type NodeCommandLogProps = {
  command: Command;
};

export const NodeCommandLog = ({ command }: NodeCommandLogProps) => {
  const { exitCode, ackedAt, exitMessage } = command;

  return (
    <div css={styles.wrapper}>
      <span css={styles.time}>
        {ackedAt ? <DateTime date={ackedAt} /> : '-'}
      </span>
      <NodeCommandIcon exitCode={exitCode} />
      <span css={styles.message(exitCode)}>{exitMessage}</span>
    </div>
  );
};
