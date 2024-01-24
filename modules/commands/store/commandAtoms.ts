import { atom } from 'recoil';
import { Command } from '@modules/grpc/library/blockjoy/v1/command';

const commands = atom<Command[]>({
  key: 'commands.list',
  default: [],
});

const commandsLoadingState = atom<LoadingState>({
  key: 'commands.loadingState',
  default: 'initializing',
});

export const commandAtoms = {
  commands,
  commandsLoadingState,
};
