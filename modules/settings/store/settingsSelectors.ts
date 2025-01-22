import { selector, selectorFamily } from 'recoil';
import { ResourceType } from '@modules/grpc/library/blockjoy/common/v1/resource';
import { organizationAtoms } from '@modules/organization';
import { authAtoms } from '@modules/auth';
import { API_KEYS_DEFAULT_SORT } from '@modules/settings';

const apiKeysSettings = selector<ApiKeysSettings>({
  key: 'settings.apiKeys.settings',
  get: ({ get }) => {
    const userSettings = get(authAtoms.userSettings);
    if (!userSettings?.hasOwnProperty('apiKeys')) return {};

    return JSON.parse(userSettings?.apiKeys ?? '{}');
  },
});

const apiKeysSort = selector<ApiKeysSort>({
  key: 'settings.apiKeys.settings.list.sort',
  get: ({ get }) => {
    const allSettings = get(apiKeysSettings);

    return allSettings.sort ?? API_KEYS_DEFAULT_SORT;
  },
});

const resources = selectorFamily<Item[], ResourceType>({
  key: 'settings.resources',
  get:
    (resourceType?: ResourceType) =>
    async ({ get }) => {
      if (!resourceType) return [];

      const allOrgs = get(organizationAtoms.allOrganizations);

      switch (resourceType) {
        case ResourceType.RESOURCE_TYPE_ORG:
          return allOrgs.map((org) => ({
            id: org.orgId,
            name: org.name,
          }));

        default:
          return [];
      }
    },
});

export const settingsSelectors = { apiKeysSort, resources };
