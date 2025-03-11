import { selector } from 'recoil';
import { Visibility } from '@modules/grpc/library/blockjoy/common/v1/protocol';
import {
  createVariantKey,
  parseVariant,
  parseVariantMetadata,
} from '../utils/variant';
import { nodeLauncherAtoms } from './nodeLauncherAtoms';
import { sortVersions } from '../utils/version';
import { ProtocolVersion } from '@modules/grpc/library/blockjoy/v1/protocol';

export const variants = selector<string[]>({
  key: 'nodeLauncherr.protocol.variants',
  get: ({ get }) => {
    const protocol = get(nodeLauncherAtoms.selectedProtocol);

    const publicVersions =
      protocol?.versions.filter(
        (version) => version.visibility === Visibility.VISIBILITY_PUBLIC,
      ) ?? [];

    const variantKeys = publicVersions
      .map((version) => {
        if (!version?.metadata) return '';

        const variantMetadata = parseVariantMetadata(version?.metadata);

        return (
          createVariantKey(
            variantMetadata.client,
            variantMetadata.network,
            variantMetadata.nodeType,
          ) ?? ''
        );
      })
      .filter(Boolean);

    return Array.from(new Set(variantKeys));
  },
});

export const clients = selector({
  key: 'nodeLauncherr.client',
  get: ({ get }) => {
    const variantsVal = get(variants);

    const clients = variantsVal?.map((variant) => parseVariant(variant).client);
    return Array.from(new Set(clients)).sort();
  },
});

export const networks = selector({
  key: 'nodeLauncherr.networks',
  get: ({ get }) => {
    const variantsVal = get(variants);

    const networks = variantsVal?.map(
      (variant) => parseVariant(variant).network,
    );
    return Array.from(new Set(networks)).sort();
  },
});

export const nodeTypes = selector({
  key: 'nodeLauncher2.nodeTypes',
  get: ({ get }) => {
    const variantsVal = get(variants);

    const nodeTypes = variantsVal?.map(
      (variant) => parseVariant(variant).nodeType,
    );
    return Array.from(new Set(nodeTypes)).sort();
  },
});

const selectedVersion = selector<ProtocolVersion | null>({
  key: 'nodeLauncher2.version',
  get: ({ get }) => {
    const versionsVal = get(nodeLauncherAtoms.versions);
    if (!versionsVal.length) return null;

    console.log('VERSION', versionsVal);
    const sortedVersions = sortVersions(versionsVal);

    return sortedVersions[sortedVersions.length - 1];
  },
});

const isUpdating = selector({
  key: 'nodeLauncher2.isUpdating',
  get: ({ get }) => {
    const variantsLoadingState = get(nodeLauncherAtoms.variantsLoadingState);
    const versionsLoadingState = get(nodeLauncherAtoms.versionsLoadingState);
    const imageLoadingState = get(nodeLauncherAtoms.imageLoadingState);

    return (
      variantsLoadingState !== 'finished' ||
      versionsLoadingState !== 'finished' ||
      imageLoadingState !== 'finished'
    );
  },
});

export const nodeLauncherSelectors = {
  variants,

  clients,
  networks,
  nodeTypes,

  selectedVersion,

  isUpdating,
};
