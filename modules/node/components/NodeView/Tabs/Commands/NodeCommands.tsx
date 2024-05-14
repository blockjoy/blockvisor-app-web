import { useRecoilValue } from 'recoil';
import { CommandsView, commandAtoms } from '@modules/commands';
import { EmptyColumn } from '@shared/components';

export const NodeCommands = () => {
  const commands = useRecoilValue(commandAtoms.commands);

  return commands.length ? (
    <CommandsView commands={commands} />
  ) : (
    <EmptyColumn
      title="No Commands"
      description="When your node has commands, they will be shown here."
    />
  );
};
