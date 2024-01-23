import { CommandExitCode } from '@modules/grpc/library/blockjoy/v1/command';
import { SvgIcon } from '@shared/components';
import { getCommandIcon } from '@modules/commands';
import { styles } from './NodeCommandIcon.styles';

type NodeCommandIconProps = {
  exitCode?: CommandExitCode;
};

export const NodeCommandIcon = ({ exitCode }: NodeCommandIconProps) => {
  return (
    <SvgIcon additionalStyles={[styles.icon(exitCode)]} size="16px">
      {getCommandIcon(exitCode)}
    </SvgIcon>
  );
};
