import { selector } from 'recoil';
import { authAtoms } from '@modules/auth';

const settings = selector<AdminSettings>({
  key: 'admin.settings',
  get: ({ get }) => {
    const userSettings = get(authAtoms.userSettings);
    if (!userSettings?.hasOwnProperty('admin')) return {};

    return JSON.parse(userSettings?.admin ?? '{}');
  },
});

export const adminSelectors = { settings };
