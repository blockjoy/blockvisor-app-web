import { Command } from '@modules/grpc/library/blockjoy/v1/command';
import { DateTime } from '@shared/components';
import { CommandIcon } from './CommandIcon/CommandIcon';
import { styles } from './CommandView.styles';
import { getCommandInfo, getCommandType } from '@modules/commands';

type CommandViewProps = {
  command: Command;
};

export const CommandView = ({ command }: CommandViewProps) => {
  const { exitCode, ackedAt, exitMessage, node, host } = command;

  const commandType = node ? getCommandType(node) : getCommandType(host);
  const commandInfo = getCommandInfo(exitCode);

  return (
    <div css={styles.wrapper}>
      <span css={styles.time}>
        {ackedAt ? <DateTime date={ackedAt} /> : '-'}
      </span>
      <CommandIcon exitCode={exitCode} />
      <span css={styles.message(exitCode)}>
        [{commandType}] {commandInfo}
        {exitMessage ? ': ' : ''}
        {exitMessage}
      </span>
    </div>
  );
};
