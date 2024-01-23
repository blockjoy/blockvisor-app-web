import {
  HostCommand,
  HostPending,
  HostRestart,
  HostStart,
  HostStop,
  NodeCommand,
  NodeCreate,
  NodeDelete,
  NodeRestart,
  NodeStart,
  NodeStop,
  NodeUpdate,
  NodeUpgrade,
} from '@modules/grpc/library/blockjoy/v1/command';

type NodeActionType =
  | NodeCreate
  | NodeStart
  | NodeStop
  | NodeRestart
  | NodeUpgrade
  | NodeUpdate
  | NodeDelete;

type HostActionType = HostStart | HostStop | HostRestart | HostPending;

const getActionFromNodeCommand = (
  command: NodeCommand | HostCommand,
): { action: string; details: NodeActionType | HostActionType } | null => {
  let actionKeys: (keyof NodeCommand | keyof HostCommand)[];

  if ('nodeId' in command) {
    actionKeys = [
      'create',
      'start',
      'stop',
      'restart',
      'upgrade',
      'update',
      'delete',
    ];
  } else if ('hostId' in command) {
    actionKeys = ['start', 'stop', 'restart', 'pending'];
  } else {
    return null;
  }

  for (const key of actionKeys) {
    if (command[key] !== undefined) {
      return {
        action: key,
        details: command[key] as NodeActionType | HostActionType,
      };
    }
  }

  return null;
};

export const getCommandType = (command?: NodeCommand | HostCommand) => {
  if (!command) return 'Unknown';

  const commandType = getActionFromNodeCommand(command);
  if (!commandType) return 'Unknown';

  return `${'nodeId' in command ? 'Node' : 'Host'}${
    commandType.action[0].toUpperCase() + commandType.action.slice(1)
  }`;
};
