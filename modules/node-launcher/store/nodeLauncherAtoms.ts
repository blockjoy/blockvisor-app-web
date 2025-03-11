import { atom, selector } from 'recoil';
import {
  Protocol,
  ProtocolVersion,
} from '@modules/grpc/library/blockjoy/v1/protocol';
import { Image } from '@modules/grpc/library/blockjoy/v1/image';
import { RegionInfo } from '@modules/grpc/library/blockjoy/v1/host';
import { FirewallRule } from '@modules/grpc/library/blockjoy/common/v1/config';
import { NodePropertyGroup } from '@modules/node/types/common';
import { generateProperties } from '../utils/image';
import { nodeAtoms } from '@modules/node/store/nodeAtoms';
import { NodeLauncherError } from '../types/NodeLauncher';
import { NODE_LAUNCHER_ERRORS } from '../constants/nodeLauncher';

const variants = atom<string[]>({
  key: 'nodeLauncherr.variants',
  default: [],
});

const variantsLoadingState = atom<LoadingState>({
  key: 'nodeLauncherr.variants.loadingState',
  default: 'finished',
});
const versions = atom<ProtocolVersion[]>({
  key: 'nodeLauncherr.versions',
  default: [],
});

const versionsLoadingState = atom<LoadingState>({
  key: 'nodeLauncherr.versions.loadingState',
  default: 'finished',
});

const selectedProtocol = atom<Protocol | null>({
  key: 'nodeLauncherr.protocol',
  default: null,
});

export const selectedVariant = atom<string | null>({
  key: 'nodeLauncherr.variants.selected',
  default: null,
});
export const selectedRegion = atom<RegionInfo | null>({
  key: 'nodeLauncherr.region.selected',
  default: selector({
    key: 'nodeLauncherr.region.selected.default',
    get: ({ get }) => {
      const regions = get(nodeAtoms.regions);

      return regions?.[0] ?? null;
    },
  }),
});

const currentStep = atom<NodeLauncherStep>({
  key: 'nodeLauncherr.steps,current',
  default: 'protocol',
});

const isLaunching = atom<boolean>({
  key: 'nodeLauncher2.isLaunching',
  default: false,
});

const error = atom<NodeLauncherError>({
  key: 'nodeLauncher2.error',
  default: NODE_LAUNCHER_ERRORS,
});

const image = atom<Image | null>({
  key: 'nodeLauncher.protocol.image',
  default: null,
});

const imageLoadingState = atom<LoadingState>({
  key: 'nodeLauncher.protocol.image.loadingState',
  default: 'finished',
});

const firewall = atom<FirewallRule[]>({
  key: 'nodeLauncher.config.firewall',
  default: selector({
    key: 'nodeLauncher.config.firewall.default',
    get: ({ get }) => {
      const imageVal = get(image);

      return imageVal?.firewall?.rules ?? [];
    },
  }),
});

const properties = atom<NodePropertyGroup[]>({
  key: 'nodeLauncher.config.properties',
  default: selector({
    key: 'nodeLauncher.config.properties.default',
    get: ({ get }) => {
      const imageVal = get(image);

      return generateProperties(imageVal?.properties);
    },
  }),
});

export const nodeLauncherAtoms = {
  selectedProtocol,
  selectedVariant,
  selectedRegion,

  variants,
  variantsLoadingState,
  versions,
  versionsLoadingState,
  image,
  imageLoadingState,

  properties,
  firewall,

  currentStep,

  error,

  isLaunching,
};
