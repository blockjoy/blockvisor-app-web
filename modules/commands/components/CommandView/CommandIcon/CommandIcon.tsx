import { CommandExitCode } from '@modules/grpc/library/blockjoy/v1/command';
import { SvgIcon } from '@shared/components';
import { getCommandIcon } from '@modules/commands';
import { styles } from './CommandIcon.styles';

type CommandIconProps = {
  exitCode?: CommandExitCode;
};

export const CommandIcon = ({ exitCode }: CommandIconProps) => {
  return (
    <SvgIcon additionalStyles={[styles.icon(exitCode)]} size="16px">
      {getCommandIcon(exitCode)}
    </SvgIcon>
  );
};
