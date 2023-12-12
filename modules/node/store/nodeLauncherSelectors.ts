import { selector } from 'recoil';
import { nodeLauncherAtoms } from './nodeLauncherAtoms';
import { NodeProperty } from '@modules/grpc/library/blockjoy/v1/node';
import { UiType } from '@modules/grpc/library/blockjoy/common/v1/node';
import { NetworkConfig } from '@modules/grpc/library/blockjoy/common/v1/blockchain';
import { BlockchainVersion } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { sortNetworks, sortVersions } from '../utils';

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
    const selectedVersion = get(nodeLauncherAtoms.selectedVersion);

    return Boolean(
      nodeLauncher.blockchainId && nodeLauncher.nodeType && selectedVersion?.id,
    );
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

    return (
      Boolean(nodeLauncher.network) &&
      (!nodeLauncher.properties?.length ||
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

export const nodeLauncherSelectors = {
  networks,
  versions,

  hasNetworkList,
  hasProtocol,
  hasSummary,
  hasConfig,

  isNodeValid,
  isConfigValid,
};
