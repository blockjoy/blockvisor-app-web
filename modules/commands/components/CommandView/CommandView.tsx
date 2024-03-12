import { usePathname } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { Command } from '@modules/grpc/library/blockjoy/v1/command';
import { DateTime } from '@shared/components';
import { CommandIcon } from './CommandIcon/CommandIcon';
import { styles } from './CommandView.styles';
import { getCommandInfo, getCommandType } from '@modules/commands';
import { hostSelectors } from '@modules/host';

type CommandViewProps = {
  command: Command;
};

export const CommandView = ({ command }: CommandViewProps) => {
  const pathname = usePathname();

  const { exitCode, ackedAt, createdAt, exitMessage, node, host } = command;

  const commandType = node ? getCommandType(node) : getCommandType(host);
  const commandInfo = getCommandInfo(exitCode);

  const hostById = useRecoilValue(hostSelectors.hostById(node?.hostId));

  return (
    <div css={styles.wrapper}>
      <span css={styles.time}>
        <DateTime date={ackedAt || createdAt!} />
      </span>
      <CommandIcon exitCode={exitCode} />
      <span css={styles.message(exitCode)}>
        {hostById?.name && !pathname?.startsWith('/hosts')
          ? `${hostById?.name}: `
          : ''}
        [{commandType}] {commandInfo}
        {exitMessage ? ': ' : ''}
        {exitMessage}
      </span>
    </div>
  );
};
