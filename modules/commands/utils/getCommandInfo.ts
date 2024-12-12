import { CommandExitCode } from '@modules/grpc/library/blockjoy/v1/command';

const commandExitCodeDescriptions: Record<CommandExitCode, string> = {
  [CommandExitCode.COMMAND_EXIT_CODE_UNSPECIFIED]: 'Unspecified',
  [CommandExitCode.COMMAND_EXIT_CODE_INTERNAL_ERROR]: 'InternalError',
  [CommandExitCode.COMMAND_EXIT_CODE_NODE_NOT_FOUND]: 'NodeNotFound',
  [CommandExitCode.COMMAND_EXIT_CODE_SERVICE_BROKEN]: 'ServiceBroken',
  [CommandExitCode.COMMAND_EXIT_CODE_NOT_SUPPORTED]: 'NotSupported',
  [CommandExitCode.COMMAND_EXIT_CODE_NODE_UPGRADE_ROLLBACK]:
    'NodeUpgradeRollback',
  [CommandExitCode.COMMAND_EXIT_CODE_NODE_UPGRADE_FAILURE]:
    'NodeUpgradeFailure',
  [CommandExitCode.UNRECOGNIZED]: ' ',
  [CommandExitCode.COMMAND_EXIT_CODE_BLOCKING_JOB_RUNNING]:
    'BlockingJobRunning',
  [CommandExitCode.COMMAND_EXIT_CODE_SERVICE_NOT_READY]: 'ServiceNotReady',
  [CommandExitCode.COMMAND_EXIT_CODE_OK]: 'Ok',
};

export const getCommandInfo = (
  exitCode: CommandExitCode = CommandExitCode.UNRECOGNIZED,
) => {
  return commandExitCodeDescriptions[exitCode] || 'Unknown';
};
