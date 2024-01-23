import { useRecoilValue } from 'recoil';
import { CommandsView, commandAtoms } from '@modules/commands';

export const NodeCommands = () => {
  const commands = useRecoilValue(commandAtoms.commands);

  return <CommandsView commands={commands} />;
};
