import { Command } from '@modules/grpc/library/blockjoy/v1/command';
import { styles } from './CommandsView.styles';
import { CommandView } from './CommandView/CommandView';
import { Alert } from '@shared/components';
import { usePermissions } from '@modules/auth';

type CommandsViewProps = {
  commands?: Command[];
};

export const CommandsView = ({ commands }: CommandsViewProps) => {
  const { hasPermission, isSuperUser } = usePermissions();

  const canViewCommands = hasPermission('command-get');
  const canViewCommandsAsSuperUser = hasPermission('command-admin-list');

  if (!(canViewCommands || (isSuperUser && canViewCommandsAsSuperUser)))
    return <Alert>You don't have permission to view the commands.</Alert>;

  if (!commands?.length) return <Alert>No Commands history</Alert>;

  return (
    <div css={styles.wrapper}>
      {canViewCommands || (isSuperUser && canViewCommandsAsSuperUser) ? (
        <>
          {commands?.map((command: Command) => (
            <CommandView key={command.id} command={command} />
          ))}
        </>
      ) : (
        <Alert>You don't have permission to view the node commands.</Alert>
      )}
    </div>
  );
};
