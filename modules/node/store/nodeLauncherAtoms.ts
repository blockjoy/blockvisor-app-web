import { atom } from 'recoil';
import { NodeType } from '@modules/grpc/library/blockjoy/common/v1/node';
import {
  BlockchainNodeType,
  BlockchainVersion,
} from '@modules/grpc/library/blockjoy/v1/blockchain';
import { Host, Region } from '@modules/grpc/library/blockjoy/v1/host';
import { NodeLauncherState } from '@modules/node';

const nodeLauncher = atom<NodeLauncherState>({
  key: 'nodeLauncher',
  default: {
    blockchainId: '',
    nodeType: NodeType.NODE_TYPE_UNSPECIFIED,
    nodeTypeVersion: '',
    allowIps: [],
    denyIps: [],
    placement: {},
  },
});

const selectedNodeType = atom<BlockchainNodeType | null>({
  key: 'nodeLauncher.nodeType',
  default: null,
});

const selectedVersion = atom<BlockchainVersion | null>({
  key: 'nodeLauncher.version',
  default: null,
});

const selectedRegion = atom<Region | null>({
  key: 'nodeLauncher.region',
  default: null,
});

const selectedHost = atom<Host | null>({
  key: 'nodeLauncher.host',
  default: null,
});

const selectedNetwork = atom<string | null>({
  key: 'nodeLauncher.network',
  default: null,
});

const error = atom<string | null>({
  key: 'nodeLauncher.error',
  default: null,
});

const isLaunching = atom<boolean>({
  key: 'nodeLauncher.isLaunching',
  default: false,
});

export const nodeLauncherAtoms = {
  nodeLauncher,

  selectedNodeType,
  selectedRegion,
  selectedVersion,
  selectedHost,
  selectedNetwork,

  error,
  isLaunching,
};
