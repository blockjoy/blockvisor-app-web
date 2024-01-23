import { Command } from '@modules/grpc/library/blockjoy/v1/command';
import { styles } from './CommandsView.styles';
import { CommandView } from './CommandView/CommandView';
import { Alert, Scrollbar } from '@shared/components';
import { usePermissions } from '@modules/auth';

type CommandsViewProps = {
  commands?: Command[];
};

export const CommandsView = ({ commands }: CommandsViewProps) => {
  const { hasPermission, isSuperUser } = usePermissions();

  const canViewCommands = hasPermission('command-get');
  const canViewCommandsAsSuperUser = hasPermission('command-admin-list');

  return (
    <div css={styles.wrapper}>
      {canViewCommands || (isSuperUser && canViewCommandsAsSuperUser) ? (
        <Scrollbar additionalStyles={[styles.scrollbar]}>
          {commands?.map((command: Command) => (
            <CommandView key={command.id} command={command} />
          ))}
        </Scrollbar>
      ) : (
        <Alert>You don't have permission to view the node commands.</Alert>
      )}
    </div>
  );
};
