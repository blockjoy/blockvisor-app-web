import { usePathname } from 'next/navigation';
import { Command } from '@modules/grpc/library/blockjoy/v1/command';
import { Log } from '@shared/components';
import { CommandIcon } from './CommandIcon/CommandIcon';
import { styles } from './CommandView.styles';
import { getCommandInfo, getCommandType } from '@modules/commands';

type CommandViewProps = {
  command: Command;
};

export const CommandView = ({ command }: CommandViewProps) => {
  const pathname = usePathname();

  const { exitCode, ackedAt, createdAt, exitMessage, node, host } = command;

  const commandType = node ? getCommandType(node) : getCommandType(host);
  const commandInfo = getCommandInfo(exitCode);

  return (
    <Log date={ackedAt || createdAt!}>
      <CommandIcon exitCode={exitCode} />
      <span css={styles.message(exitCode)}>
        {node?.hostName &&
          !pathname?.startsWith('/hosts') &&
          `${node.hostName}: `}
        [{commandType}] {commandInfo}
        {exitMessage ? `: ${exitMessage}` : ''}
      </span>
    </Log>
  );
};
