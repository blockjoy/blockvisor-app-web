import { CommandExitCode } from '@modules/grpc/library/blockjoy/v1/command';
import IconInfo from '@public/assets/icons/common/Info.svg';
import IconWarning from '@public/assets/icons/common/Warning.svg';
import IconError from '@public/assets/icons/common/Error.svg';

export const getCommandIcon = (exitCode?: CommandExitCode) => {
  switch (exitCode) {
    case CommandExitCode.COMMAND_EXIT_CODE_UNSPECIFIED:
    case CommandExitCode.COMMAND_EXIT_CODE_INTERNAL_ERROR:
    case CommandExitCode.COMMAND_EXIT_CODE_NODE_NOT_FOUND:
    case CommandExitCode.COMMAND_EXIT_CODE_SERVICE_BROKEN:
    case CommandExitCode.COMMAND_EXIT_CODE_NOT_SUPPORTED:
    case CommandExitCode.UNRECOGNIZED:
      return <IconError />;

    case CommandExitCode.COMMAND_EXIT_CODE_BLOCKING_JOB_RUNNING:
    case CommandExitCode.COMMAND_EXIT_CODE_SERVICE_NOT_READY:
      return <IconWarning />;

    case CommandExitCode.COMMAND_EXIT_CODE_OK:
      return <IconInfo />;

    default:
      return <IconInfo />;
  }
};
