import { atom } from 'recoil';

const appLoadingState = atom<LoadingState>({
  key: 'settings.app.loadingState',
  default: 'finished',
});

export const settingsAtoms = {
  appLoadingState,
};
