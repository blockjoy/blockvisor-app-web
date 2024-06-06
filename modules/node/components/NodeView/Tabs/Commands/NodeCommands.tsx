import { useRecoilValue } from 'recoil';
import { CommandsView, commandAtoms } from '@modules/commands';
import { EmptyColumn } from '@shared/components';

export const NodeCommands = () => {
  const commands = useRecoilValue(commandAtoms.commands);

  return commands && commands?.length! > 0 ? (
    <CommandsView commands={commands} />
  ) : commands === null ? null : (
    <EmptyColumn
      title="No Commands"
      description="When your node has commands, they will be shown here."
    />
  );
};
