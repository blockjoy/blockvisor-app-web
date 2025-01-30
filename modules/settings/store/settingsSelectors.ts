import { selector, selectorFamily } from 'recoil';
import {
  Resource,
  ResourceType,
} from '@modules/grpc/library/blockjoy/common/v1/resource';
import { organizationAtoms } from '@modules/organization';
import { authAtoms } from '@modules/auth';
import { API_KEYS_DEFAULT_SORT } from '@modules/settings';
import { nodeAtoms } from '@modules/node';
import { hostAtoms } from '@modules/host';
import { getResourceName } from '@shared/index';

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
    ({ get }) => {
      if (!resourceType) return [];

      const nodeList = get(nodeAtoms.nodeList);
      const orgList = get(organizationAtoms.allOrganizations);
      const hostList = get(hostAtoms.hostList);

      switch (resourceType) {
        case ResourceType.RESOURCE_TYPE_ORG:
          return orgList.map((org) => ({
            id: org.orgId,
            name: org.name,
          }));
        case ResourceType.RESOURCE_TYPE_NODE:
          return nodeList.map((node) => ({
            id: node.nodeId,
            name: node.nodeName,
          }));
        case ResourceType.RESOURCE_TYPE_HOST:
          return hostList.map((host) => ({
            id: host.hostId,
            name: host.displayName ?? host.networkName,
          }));
        default:
          return [];
      }
    },
});

const resourceName = selectorFamily<string | null, Readonly<string>>({
  key: 'settings.resource.name',
  get:
    (resourceSerializedParam) =>
    ({ get }) => {
      const user = get(authAtoms.user);
      const allOrganizations = get(organizationAtoms.allOrganizations);
      const allHosts = get(hostAtoms.allHosts);
      const nodeListGlobal = get(nodeAtoms.nodeListGlobal);

      const resource = JSON.parse(resourceSerializedParam) as Resource;

      const name = getResourceName({
        resource,
        user,
        orgs: allOrganizations,
        hosts: allHosts,
        nodes: nodeListGlobal,
      });

      return name ?? null;
    },
});

export const settingsSelectors = { apiKeysSort, resources, resourceName };
