import { CommandExitCode } from '@modules/grpc/library/blockjoy/v1/command';
import { ITheme } from 'types/theme';

export const getCommandColor = (theme: ITheme, exitCode?: CommandExitCode) => {
  switch (exitCode) {
    case CommandExitCode.COMMAND_EXIT_CODE_UNSPECIFIED:
    case CommandExitCode.COMMAND_EXIT_CODE_INTERNAL_ERROR:
    case CommandExitCode.COMMAND_EXIT_CODE_NODE_NOT_FOUND:
    case CommandExitCode.COMMAND_EXIT_CODE_SERVICE_BROKEN:
    case CommandExitCode.COMMAND_EXIT_CODE_NOT_SUPPORTED:
    case CommandExitCode.UNRECOGNIZED:
      return theme.colorDanger;

    case CommandExitCode.COMMAND_EXIT_CODE_BLOCKING_JOB_RUNNING:
    case CommandExitCode.COMMAND_EXIT_CODE_SERVICE_NOT_READY:
      return theme.colorNote;

    case CommandExitCode.COMMAND_EXIT_CODE_OK:
      return theme.colorText;

    default:
      return theme.colorText;
  }
};
