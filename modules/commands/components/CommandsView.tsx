import { useRecoilValue } from 'recoil';
import { Command } from '@modules/grpc/library/blockjoy/v1/command';
import { styles } from './CommandsView.styles';
import { CommandView } from './CommandView/CommandView';
import { Alert, LogsWrapper } from '@shared/components';
import { authSelectors } from '@modules/auth';

type CommandsViewProps = {
  commands?: Command[];
};

export const CommandsView = ({ commands }: CommandsViewProps) => {
  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);

  const canViewCommands = useRecoilValue(
    authSelectors.hasPermission('command-get'),
  );

  const canViewCommandsAsSuperUser = useRecoilValue(
    authSelectors.hasPermission('command-admin-list'),
  );

  if (!(canViewCommands || (isSuperUser && canViewCommandsAsSuperUser)))
    return <Alert>You don't have permission to view the commands.</Alert>;

  if (!commands?.length) return <Alert>No Commands history</Alert>;

  return (
    <div css={styles.wrapper}>
      {canViewCommands || (isSuperUser && canViewCommandsAsSuperUser) ? (
        <LogsWrapper>
          {commands?.map((command: Command) => (
            <CommandView key={command.commandId} command={command} />
          ))}
        </LogsWrapper>
      ) : (
        <Alert>You don't have permission to view the node commands.</Alert>
      )}
    </div>
  );
};
