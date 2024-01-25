import { useRecoilValue } from 'recoil';
import { CommandsView, commandAtoms } from '@modules/commands';

export const HostCommands = () => {
  const commands = useRecoilValue(commandAtoms.commands);

  return <CommandsView commands={commands} />;
};
