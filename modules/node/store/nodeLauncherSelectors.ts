import { selector, selectorFamily } from 'recoil';
import { NodeProperty } from '@modules/grpc/library/blockjoy/v1/node';
import { UiType } from '@modules/grpc/library/blockjoy/common/v1/node';
import { NetworkConfig } from '@modules/grpc/library/blockjoy/common/v1/blockchain';
import {
  Blockchain,
  BlockchainVersion,
} from '@modules/grpc/library/blockjoy/v1/blockchain';
import { Region } from '@modules/grpc/library/blockjoy/v1/host';
import {
  nodeAtoms,
  blockchainAtoms,
  nodeLauncherAtoms,
  BlockchainSimpleWRegion,
  sortNetworks,
  sortVersions,
} from '@modules/node';
import { authSelectors } from '@modules/auth';
import { nodeTypeList } from '@shared/index';

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

const isConfigValid = selector<boolean>({
  key: 'nodeLauncher.isConfigValid',
  get: ({ get }) => {
    const nodeLauncher = get(nodeLauncherAtoms.nodeLauncher);
    const selectedNetwork = get(nodeLauncherAtoms.selectedNetwork);

    return (
      Boolean(selectedNetwork) &&
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

const selectedBlockchain = selectorFamily<Blockchain | null, string>({
  key: 'nodeLauncher.blockchain',
  get:
    (blockchainId: string) =>
    ({ get }) => {
      const allBlockchains = get(blockchainAtoms.blockchains);
      const isSuperUser = get(authSelectors.isSuperUser);

      return allBlockchains?.find(
        (blockchain: Blockchain) => blockchain.id === blockchainId,
      ) ?? isSuperUser
        ? allBlockchains[0]
        : null;
    },
});

const selectedRegionByHost = selectorFamily<Region | null, string | undefined>({
  key: 'nodeLauncher.region.byHost',
  get:
    (regionName?: string) =>
    ({ get }) => {
      const allRegions = get(nodeAtoms.allRegions);
      const nodeLauncherState = get(nodeLauncherAtoms.nodeLauncher);
      const activeBlockchainId = nodeLauncherState.blockchainId;

      return (
        allRegions
          ?.find(
            (blockchain: BlockchainSimpleWRegion) =>
              blockchain.blockchainId === activeBlockchainId,
          )
          ?.regions.find((region: Region) => region.name === regionName) ?? null
      );
    },
});

const nodeLauncherInfo = selector<NodeLauncherBasicInfo>({
  key: 'nodeLauncher.info',
  get: ({ get }) => {
    const nodeLauncher = get(nodeLauncherAtoms.nodeLauncher);
    const allBlockchains = get(blockchainAtoms.blockchains);
    const selectedBlockchain = allBlockchains.find(
      (blockchain) => blockchain.id === nodeLauncher.blockchainId,
    );

    const nodeType = get(nodeLauncherAtoms.selectedNodeType);
    const selectedNodeType = nodeTypeList.find(
      (nt) => nt.id === nodeType?.nodeType,
    );

    const selectedNetwork = get(nodeLauncherAtoms.selectedNetwork);

    const selectedVersion = get(nodeLauncherAtoms.selectedVersion);

    return {
      blockchainName: selectedBlockchain?.name ?? '',
      nodeTypeName: selectedNodeType?.name ?? '',
      networkName: selectedNetwork ?? '',
      versionName: selectedVersion?.version ?? '',
    };
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

  totalNodesToLaunch,

  selectedBlockchain,
  selectedRegionByHost,

  nodeLauncherInfo,
};
