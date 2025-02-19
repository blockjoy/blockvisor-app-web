import {
  ProtocolVersionKey,
  VersionMetadata,
} from '@modules/grpc/library/blockjoy/common/v1/protocol';

export const getNodeMetadataString = (
  versionMetadata: VersionMetadata[],
  versionKey: ProtocolVersionKey,
) => {
  const nodeType = versionMetadata?.find(
    (vm) => vm.metadataKey === 'node-type',
  )?.value;
  const network = versionMetadata?.find(
    (vm) => vm.metadataKey === 'network',
  )?.value;

  if (!nodeType || !network) {
    return versionKey?.variantKey.includes('-')
      ? versionKey?.variantKey.split('-').reverse().join('-')
      : versionKey?.variantKey;
  } else {
    return `${nodeType} | ${network}`;
  }
};
