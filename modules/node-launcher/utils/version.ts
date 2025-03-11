import { ProtocolVersion } from '@modules/grpc/library/blockjoy/v1/protocol';

const compareVersions = (
  versionsA: ProtocolVersion,
  versionB: ProtocolVersion,
) => {
  const [aMajor, aMinor, aPatch] = versionsA.semanticVersion
    ?.split('.')
    .map(Number);
  const [bMajor, bMinor, bPatch] = versionB.semanticVersion
    ?.split('.')
    .map(Number);

  if (aMajor !== bMajor) return aMajor - bMajor;
  if (aMinor !== bMinor) return aMinor - bMinor;

  return aPatch - bPatch;
};

export const sortVersions = (versions?: ProtocolVersion[]) =>
  [...(versions ?? [])]?.sort(compareVersions);
