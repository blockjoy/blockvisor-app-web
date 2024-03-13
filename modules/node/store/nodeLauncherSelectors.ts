import { selector, selectorFamily } from 'recoil';
import { NodeProperty } from '@modules/grpc/library/blockjoy/v1/node';
import { UiType } from '@modules/grpc/library/blockjoy/common/v1/node';
import { NetworkConfig } from '@modules/grpc/library/blockjoy/common/v1/blockchain';
import {
  Blockchain,
  BlockchainVersion,
} from '@modules/grpc/library/blockjoy/v1/blockchain';
import { Region } from '@modules/grpc/library/blockjoy/v1/host';
import { sortNetworks, sortVersions } from '../utils';
import {
  nodeAtoms,
  blockchainAtoms,
  nodeLauncherAtoms,
  BlockchainSimpleWRegion,
} from '@modules/node';

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
    const nodeLauncher = get(nodeLauncherAtoms.nodeLauncher);

    return Boolean(nodeLauncher.blockchainId || nodeLauncher.nodeType);
  },
});

const hasConfig = selector<boolean>({
  key: 'nodeLauncher.config',
  get: ({ get }) => {
    const nodeLauncher = get(nodeLauncherAtoms.nodeLauncher);

    return Boolean(nodeLauncher.blockchainId && nodeLauncher.nodeType);
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
    const selectedHost = get(nodeLauncherAtoms.selectedHost);
    const selectedRegion = get(nodeLauncherAtoms.selectedRegion);

    return Boolean(
      nodeLauncher.blockchainId &&
        nodeLauncher.nodeType &&
        (selectedHost || selectedRegion),
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

const selectedBlockchain = selectorFamily<Blockchain | null, string>({
  key: 'nodeLauncher.blockchain',
  get:
    (blockchainId: string) =>
    ({ get }) => {
      const allBlockchains = get(blockchainAtoms.blockchains);

      return (
        allBlockchains?.find(
          (blockchain: Blockchain) => blockchain.id === blockchainId,
        ) ?? null
      );
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

export const nodeLauncherSelectors = {
  networks,
  versions,

  hasNetworkList,
  hasProtocol,
  hasSummary,
  hasConfig,

  isNodeValid,
  isConfigValid,

  selectedBlockchain,
  selectedRegionByHost,
};
