import { atom } from 'recoil';
import {
  Protocol,
  ProtocolVersion,
} from '@modules/grpc/library/blockjoy/v1/protocol';
import {
  NodeLauncherHost,
  NodeLauncherRegion,
  NodeLauncherState,
} from '@modules/node';
import { Image } from '@modules/grpc/library/blockjoy/v1/image';

const nodeLauncher = atom<NodeLauncherState>({
  key: 'nodeLauncher',
  default: {
    defaultFirewall: [],
    firewall: [],
    properties: [],
  },
});

const selectedProtocol = atom<Protocol | null>({
  key: 'nodeLauncher.protocol',
  default: null,
});

const selectedVersion = atom<ProtocolVersion | null>({
  key: 'nodeLauncher.version',
  default: null,
});

const selectedRegions = atom<NodeLauncherRegion[] | null>({
  key: 'nodeLauncher.region',
  default: null,
});

const selectedHosts = atom<NodeLauncherHost[] | null>({
  key: 'nodeLauncher.hosts',
  default: null,
});

const selectedImage = atom<Image | null>({
  key: 'nodeLauncher.image',
  default: null,
});

const variants = atom<string[]>({
  key: 'nodeLauncher.variants',
  default: [],
});

const versions = atom<ProtocolVersion[]>({
  key: 'nodeLauncher.versions',
  default: [],
});

const selectedVariant = atom<string | null>({
  key: 'nodeLauncher.variant',
  default: null,
});

const error = atom<string | null>({
  key: 'nodeLauncher.error',
  default: null,
});

const isLaunchError = atom<boolean>({
  key: 'nodeLauncher.isLaunching.error',
  default: false,
});

const isLaunching = atom<boolean>({
  key: 'nodeLauncher.isLaunching',
  default: false,
});

export const nodeLauncherAtoms = {
  nodeLauncher,
  variants,
  versions,

  selectedProtocol,
  selectedRegions,
  selectedVersion,
  selectedHosts,
  selectedImage,
  selectedVariant,

  error,
  isLaunchError,
  isLaunching,
};
