import { selector, selectorFamily } from 'recoil';
import { NodeProperty } from '@modules/grpc/library/blockjoy/v1/node';
import { UiType } from '@modules/grpc/library/blockjoy/common/v1/node';
import { NetworkConfig } from '@modules/grpc/library/blockjoy/common/v1/blockchain';
import {
  Blockchain,
  BlockchainNodeType,
  BlockchainVersion,
} from '@modules/grpc/library/blockjoy/v1/blockchain';
import {
  blockchainAtoms,
  nodeLauncherAtoms,
  sortNetworks,
  getNodeTypes,
  sortVersions,
} from '@modules/node';
import { authSelectors } from '@modules/auth';
import { nodeTypeList } from '@shared/index';
import { billingAtoms } from '@modules/billing';

const networks = selector<NetworkConfig[]>({
  key: 'nodeLauncher.networks',
  get: ({ get }) => {
    const selectedVersion = get(nodeLauncherAtoms.selectedVersion);

    return sortNetworks(selectedVersion?.networks);
  },
});

const versions = selector<BlockchainVersion[]>({
  key: 'nodeLauncher.versions',
  get: ({ get }) => {
    const selectedNodeType = get(nodeLauncherAtoms.selectedNodeType);

    return sortVersions(selectedNodeType?.versions);
  },
});

const hasNetworkList = selector<boolean>({
  key: 'nodeLauncher.hasNetworkList',
  get: ({ get }) => {
    const selectedVersion = get(nodeLauncherAtoms.selectedVersion);

    return Boolean(selectedVersion?.networks?.length);
  },
});

const hasProtocol = selector<boolean>({
  key: 'nodeLauncher.protocol',
  get: ({ get }) => {
    const { blockchainId, nodeType } = get(nodeLauncherAtoms.nodeLauncher);

    return Boolean(blockchainId || nodeType);
  },
});

const hasConfig = selector<boolean>({
  key: 'nodeLauncher.config',
  get: ({ get }) => {
    const { blockchainId, nodeType } = get(nodeLauncherAtoms.nodeLauncher);

    return Boolean(blockchainId && nodeType);
  },
});

const hasSummary = selector<boolean>({
  key: 'nodeLauncher.summary',
  get: ({ get }) => {
    const nodeLauncher = get(nodeLauncherAtoms.nodeLauncher);

    return Boolean(nodeLauncher.blockchainId && nodeLauncher.nodeType);
  },
});

const isNodeValid = selector<boolean>({
  key: 'nodeLauncher.isNodeValid',
  get: ({ get }) => {
    const nodeLauncher = get(nodeLauncherAtoms.nodeLauncher);
    const selectedHosts = get(nodeLauncherAtoms.selectedHosts);
    const selectedRegion = get(nodeLauncherAtoms.selectedRegion);

    return Boolean(
      nodeLauncher.blockchainId &&
        nodeLauncher.nodeType &&
        (selectedHosts || selectedRegion),
    );
  },
});

const isConfigValid = selector({
  key: 'nodeLauncher.config.isValid',
  get: ({ get }) => {
    const nodeLauncher = get(nodeLauncherAtoms.nodeLauncher);
    const selectedNetwork = get(nodeLauncherAtoms.selectedNetwork);

    return (
      Boolean(selectedNetwork?.name) &&
      (!nodeLauncher?.properties?.length ||
        Boolean(
          nodeLauncher.properties
            ?.filter(
              (type: NodeProperty) =>
                type.required &&
                type.uiType !== UiType.UI_TYPE_FILE_UPLOAD &&
                type.uiType !== UiType.UI_TYPE_SWITCH,
            )
            .every((type) => type.value),
        ))
    );
  },
});

const isPropertiesValid = selector({
  key: 'nodeLauncher.properties.isValid',
  get: ({ get }) => {
    const nodeLauncher = get(nodeLauncherAtoms.nodeLauncher);
    const { properties } = nodeLauncher;

    return properties?.some((p) => p.required === true && !p.value) ?? false;
  },
});

const totalNodesToLaunch = selector<number>({
  key: 'nodeLauncher.totalNodesToLaunch',
  get: ({ get }) => {
    const selectedHosts = get(nodeLauncherAtoms.selectedHosts);

    return selectedHosts?.reduce(
      (partialSum, host) => partialSum + host.nodesToLaunch,
      0,
    )!;
  },
});

const selectedBlockchain = selector<Blockchain | null>({
  key: 'nodeLauncher.blockchain',
  get: ({ get }) => {
    const blockchainId = get(nodeLauncherAtoms.nodeLauncher).blockchainId;
    const allBlockchains = get(blockchainAtoms.blockchains);

    return (
      allBlockchains?.find((blockchain) => blockchain.id === blockchainId) ??
      null
    );
  },
});

const selectedBlockchainNodeTypes = selector<BlockchainNodeType[]>({
  key: 'nodeLauncher.nodeTypes',
  get: ({ get }) => {
    const selectedBlockchainVal = get(selectedBlockchain);
    if (!selectedBlockchainVal) return [];

    return getNodeTypes(selectedBlockchainVal);
  },
});

const nodeLauncherInfo = selector<NodeLauncherBasicInfo>({
  key: 'nodeLauncher.info',
  get: ({ get }) => {
    const selectedBlockchainVal = get(selectedBlockchain);
    const nodeType = get(nodeLauncherAtoms.selectedNodeType);
    const selectedNodeType = nodeTypeList.find(
      (nt) => nt.id === nodeType?.nodeType,
    );
    const selectedNetwork = get(nodeLauncherAtoms.selectedNetwork);
    const selectedVersion = get(nodeLauncherAtoms.selectedVersion);

    return {
      blockchainName: selectedBlockchainVal?.name ?? '',
      nodeTypeName: selectedNodeType?.name ?? '',
      networkName: selectedNetwork?.name ?? '',
      versionName: selectedVersion?.version ?? '',
    };
  },
});

const isNodeAllocationValid = selector({
  key: 'nodeLauncher.nodeAllocation.isValid',
  get: ({ get }) => {
    const selectedHosts = get(nodeLauncherAtoms.selectedHosts);
    const totalNodesToLaunchVal = get(totalNodesToLaunch);

    return (
      !selectedHosts ||
      (selectedHosts?.every((h) => h.isValid) && totalNodesToLaunchVal > 0)
    );
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
      const nodeLauncher = get(nodeLauncherAtoms.nodeLauncher);
      const selectedHosts = get(nodeLauncherAtoms.selectedHosts);
      const selectedRegion = get(nodeLauncherAtoms.selectedRegion);
      const hasNetworkListVal = get(hasNetworkList);
      const isConfigValidVal = get(isConfigValid);
      const error = get(nodeLauncherAtoms.error);
      const price = get(billingAtoms.price);
      const isNodeAllocationValidVal = get(isNodeAllocationValid);
      const billingExempt = get(authSelectors.hasPermission('billing-exempt'));

      const disablingConditions: Record<string, boolean> = {
        NoPermission: !hasPermissionsToCreate,
        NoNetworks: !hasNetworkListVal,
        NoBlockchain: !nodeLauncher.blockchainId,
        NoNodeType: !nodeLauncher.nodeType,
        NoRegion: !(selectedHosts?.length || selectedRegion),
        InvalidConfig: !isConfigValidVal,
        ErrorExists: Boolean(error),
        NoPrice: !price,
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
  networks,
  versions,

  hasNetworkList,
  hasProtocol,
  hasSummary,
  hasConfig,

  isNodeValid,
  isConfigValid,
  isPropertiesValid,

  totalNodesToLaunch,

  selectedBlockchain,
  selectedBlockchainNodeTypes,

  nodeLauncherInfo,

  isNodeAllocationValid,
  nodeLauncherStatus,
};
