import { useRecoilValue } from 'recoil';
import { Command } from '@modules/grpc/library/blockjoy/v1/command';
import { commandAtoms } from '@modules/commands';
import { styles } from './NodeCommandLogs.styles';
import { NodeCommandLog } from './NodeCommandLog/NodeCommandLog';

export const NodeCommandLogs = () => {
  const commands = useRecoilValue(commandAtoms.commands);

  return (
    <div css={styles.wrapper}>
      {commands.map((command: Command) => (
        <NodeCommandLog key={command.id} command={command} />
      ))}
    </div>
  );
};
