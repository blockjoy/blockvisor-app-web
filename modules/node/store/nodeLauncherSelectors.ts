import { selector, selectorFamily } from 'recoil';
import { nodeLauncherAtoms, NodeLauncherVariantSegment } from '@modules/node';
import { authSelectors } from '@modules/auth';
import { billingAtoms } from '@modules/billing';
import { sort } from '@shared/components';

const hasProtocol = selector<boolean>({
  key: 'nodeLauncher.hasProtocol',
  get: ({ get }) => {
    const selectedProtocol = get(nodeLauncherAtoms.selectedProtocol);
    return Boolean(selectedProtocol);
  },
});

const hasConfig = selector<boolean>({
  key: 'nodeLauncher.config',
  get: ({ get }) => {
    const selectedProtocol = get(nodeLauncherAtoms.selectedProtocol);
    return Boolean(selectedProtocol);
  },
});

const hasSummary = selector<boolean>({
  key: 'nodeLauncher.summary',
  get: ({ get }) => {
    const selectedProtocol = get(nodeLauncherAtoms.selectedProtocol);
    return Boolean(selectedProtocol);
  },
});

const isNodeAllocationValid = selector({
  key: 'nodeLauncher.nodeAllocation.isValid',
  get: ({ get }) => {
    const isSuperUser = get(authSelectors.isSuperUser);

    if (!isSuperUser) return true;

    const totalNodesToLaunchVal = get(totalNodesToLaunch);
    const selectedHosts = get(nodeLauncherAtoms.selectedHosts);
    const selectedRegions = get(nodeLauncherAtoms.selectedRegions);

    let isValid = false;

    if (!selectedHosts && !selectedRegions) return false;

    if (selectedHosts?.length) {
      isValid =
        selectedHosts.length > 0 &&
        selectedHosts?.every((h) => h.isValid)! &&
        totalNodesToLaunchVal > 0;
    } else {
      isValid =
        selectedRegions?.length! > 0 &&
        selectedRegions?.every((r) => r.isValid)! &&
        totalNodesToLaunchVal > 0;
    }

    return isValid;
  },
});

const isNodeValid = selector<boolean>({
  key: 'nodeLauncher.isNodeValid',
  get: ({ get }) => {
    const selectedProtocol = get(nodeLauncherAtoms.selectedProtocol);

    return Boolean(selectedProtocol);
  },
});

const isConfigValid = selector({
  key: 'nodeLauncher.config.isValid',
  get: ({ get }) => {
    const nodeLauncher = get(nodeLauncherAtoms.nodeLauncher);
    const { properties } = nodeLauncher;

    return properties?.every((propertyGroup) => propertyGroup.value);
  },
});

const isPropertiesValid = selector({
  key: 'nodeLauncher.properties.isValid',
  get: ({ get }) => {
    const nodeLauncher = get(nodeLauncherAtoms.nodeLauncher);
    const { properties } = nodeLauncher;
    return properties?.every((propertyGroup) => propertyGroup.value);
  },
});

const allNodeTypes = selector<string[] | null>({
  key: 'nodeLauncher.allNodeTypes',
  get: ({ get }) => {
    const versionMetadata = get(nodeLauncherAtoms.versionMetadata);

    if (!versionMetadata) return null;

    const nodeTypes = [
      ...new Set(versionMetadata?.map((item) => item['node-type']).flat()),
    ];

    return sort(nodeTypes);
  },
});

const allNetworks = selector<string[] | null>({
  key: 'nodeLauncher.allNetworks',
  get: ({ get }) => {
    const versionMetadata = get(nodeLauncherAtoms.versionMetadata);

    if (!versionMetadata) return null;

    const networks = [
      ...new Set(versionMetadata?.map((item) => item['network']).flat()),
    ];

    return sort(networks);
  },
});

const allClients = selector<string[] | null>({
  key: 'nodeLauncher.allClients',
  get: ({ get }) => {
    const versionMetadata = get(nodeLauncherAtoms.versionMetadata);

    if (!versionMetadata) return null;

    const clients = [
      ...new Set(versionMetadata?.map((item) => item['client']).flat()),
    ];

    return sort(clients);
  },
});

const availableNetworks = selector<string[]>({
  key: 'nodeLauncher.filteredNetworks',
  get: ({ get }) => {
    const selectedVariantSegments = get(
      nodeLauncherAtoms.selectedVariantSegments,
    );
    const versionMetadata = get(nodeLauncherAtoms.versionMetadata);

    const networks = [
      ...new Set(
        versionMetadata
          ?.filter(
            (metadata) =>
              !selectedVariantSegments.nodeType.selectedItem ||
              metadata['node-type'] ===
                selectedVariantSegments.nodeType.selectedItem?.id,
          )
          ?.map((item) => item['network'])
          .flat(),
      ),
    ];

    return networks;
  },
});

const availableClients = selector<string[]>({
  key: 'nodeLauncher.filteredClients',
  get: ({ get }) => {
    const selectedVariantSegments = get(
      nodeLauncherAtoms.selectedVariantSegments,
    );
    const versionMetadata = get(nodeLauncherAtoms.versionMetadata);

    const clients = [
      ...new Set(
        versionMetadata
          ?.filter(
            (metadata) =>
              (!selectedVariantSegments.nodeType.selectedItem ||
                metadata['node-type'] ===
                  selectedVariantSegments.nodeType.selectedItem?.id) &&
              (!selectedVariantSegments.network.selectedItem ||
                metadata['network'] ===
                  selectedVariantSegments.network.selectedItem.id),
          )
          ?.map((item) => item['client'])
          .flat(),
      ),
    ];

    console.log('clients', clients);

    return clients;
  },
});

const isVariantValid = selector<boolean>({
  key: 'nodeLauncher.isVariantValid',
  get: ({ get }) => {
    const selectedVariantSegments = get(
      nodeLauncherAtoms.selectedVariantSegments,
    );
    return Boolean(
      selectedVariantSegments.nodeType.selectedItem &&
        selectedVariantSegments.network.selectedItem &&
        selectedVariantSegments.client.selectedItem,
    );
  },
});

const isVariantSegmentsLoaded = selector<boolean>({
  key: 'nodeLauncher.isVariantSegmentsLoaded',
  get: ({ get }) => {
    const nodeTypes = get(allNodeTypes);
    const networks = get(allNetworks);
    const clients = get(allClients);

    if (!nodeTypes && !networks && !clients) return true;

    return Boolean(nodeTypes?.length && networks?.length && clients?.length);
  },
});

const totalNodesToLaunch = selector<number>({
  key: 'nodeLauncher.totalNodesToLaunch',
  get: ({ get }) => {
    const selectedHosts = get(nodeLauncherAtoms.selectedHosts);
    const selectedRegions = get(nodeLauncherAtoms.selectedRegions);
    const selectedList = selectedHosts || selectedRegions;

    return selectedList
      ?.map((n) => n.nodesToLaunch)
      ?.reduce((partialSum, nodesToLaunch) => partialSum + nodesToLaunch, 0)!;
  },
});

const nodeLauncherInfo = selector<NodeLauncherBasicInfo>({
  key: 'nodeLauncher.info',
  get: ({ get }) => {
    const selectedProtocol = get(nodeLauncherAtoms.selectedProtocol);
    const selectedVersion = get(nodeLauncherAtoms.selectedVersion);

    return {
      protocolName: selectedProtocol?.name ?? '',
      versionName: selectedVersion?.semanticVersion ?? '',
    };
  },
});

const nodeLauncherStatus = selectorFamily<
  { isDisabled: boolean; reasons: string[] },
  boolean
>({
  key: 'nodeLauncher.status',
  get:
    (hasPermissionsToCreate) =>
    ({ get }) => {
      const selectedHosts = get(nodeLauncherAtoms.selectedHosts);
      const selectedRegions = get(nodeLauncherAtoms.selectedRegions);
      const selectedProtocol = get(nodeLauncherAtoms.selectedProtocol);
      const selectedVersion = get(nodeLauncherAtoms.selectedVersion);
      const selectedVariant = get(nodeLauncherAtoms.selectedVariant);
      const isConfigValidVal = get(isConfigValid);
      const isVariantValidVal = get(isVariantValid);
      const error = get(nodeLauncherAtoms.error);
      const price = get(billingAtoms.price);
      const isNodeAllocationValidVal = get(isNodeAllocationValid);
      const billingExempt = get(authSelectors.hasPermission('billing-exempt'));

      const disablingConditions: Record<string, boolean> = {
        NoPermission: !hasPermissionsToCreate,
        NoProtocol: !selectedProtocol,
        NoRegion: !(selectedHosts?.length || selectedRegions?.length),
        NoVariant: !isVariantValidVal && !selectedVariant,
        NoVersion: !selectedVersion,
        InvalidConfig: !isConfigValidVal,
        ErrorExists: Boolean(error),
        NoPrice: !price && !billingExempt,
        InvalidNodeAllocation: !isNodeAllocationValidVal,
      };

      const reasons = Object.entries(disablingConditions)
        .filter(([_, value]) => value)
        .map(([key]) => key);

      const isDisabled = reasons.length > 0;

      return { isDisabled, reasons };
    },
});

export const nodeLauncherSelectors = {
  hasProtocol,
  hasSummary,
  hasConfig,

  isNodeValid,
  isConfigValid,
  isPropertiesValid,
  isVariantValid,
  isVariantSegmentsLoaded,

  allClients,
  allNetworks,
  allNodeTypes,

  availableClients,
  availableNetworks,

  totalNodesToLaunch,

  nodeLauncherInfo,

  isNodeAllocationValid,
  nodeLauncherStatus,
};
