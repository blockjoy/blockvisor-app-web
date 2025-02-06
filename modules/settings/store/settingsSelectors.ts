import { selector } from 'recoil';
import { settingsAtoms } from './settingsAtoms';

const apiKeysSorted = selector({
  key: 'settings.apiKeys.sorted',
  get: ({ get }) => {
    const apiKeys = get(settingsAtoms.apiKeys);
    return [...apiKeys].sort((a, b) => {
      const timeA = new Date(a.createdAt ?? '').getTime();
      const timeB = new Date(b.createdAt ?? '').getTime();
      return timeA - timeB;
    });
  },
});

export const settingsSelectors = { apiKeysSorted };
