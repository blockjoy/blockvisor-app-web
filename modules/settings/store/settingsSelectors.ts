import { selector, selectorFamily } from 'recoil';
import { ResourceType } from '@modules/grpc/library/blockjoy/common/v1/resource';
import { organizationAtoms } from '@modules/organization';
import { authAtoms } from '@modules/auth';
import { API_KEYS_DEFAULT_SORT } from '@modules/settings';
import { nodeAtoms } from '@modules/node';
import { hostAtoms } from '@modules/host';

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

      const allNodes = get(nodeAtoms.nodeList);
      const allOrgs = get(organizationAtoms.allOrganizations);
      const allHosts = get(hostAtoms.allHosts);

      switch (resourceType) {
        case ResourceType.RESOURCE_TYPE_ORG:
          return allOrgs.map((org) => ({
            id: org.orgId,
            name: org.name,
          }));
        case ResourceType.RESOURCE_TYPE_NODE:
          return allNodes.map((node) => ({
            id: node.nodeId,
            name: node.nodeName,
          }));
        case ResourceType.RESOURCE_TYPE_HOST:
          return allHosts.map((host) => ({
            id: host.hostId,
            name: host.displayName ?? host.networkName,
          }));
        default:
          return [];
      }
    },
});

export const settingsSelectors = { apiKeysSort, resources };
