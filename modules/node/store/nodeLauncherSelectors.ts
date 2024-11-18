import { selector, selectorFamily } from 'recoil';
import { ProtocolVersion } from '@modules/grpc/library/blockjoy/v1/protocol';
import { nodeLauncherAtoms, sortNetworks, sortVersions } from '@modules/node';
import { authSelectors } from '@modules/auth';
import { billingAtoms } from '@modules/billing';
import { ImageProperty } from '@modules/grpc/library/blockjoy/v1/image';
import { UiType } from '@modules/grpc/library/blockjoy/common/v1/protocol';

const networks = selector<any[]>({
  key: 'nodeLauncher.networks',
  get: ({ get }) => {
    const selectedVersion = get(nodeLauncherAtoms.selectedVersion);

    return sortNetworks([]);
  },
});

const versions = selector<ProtocolVersion[]>({
  key: 'nodeLauncher.versions',
  get: ({ get }) => {
    const selectedProtocol = get(nodeLauncherAtoms.selectedProtocol);

    return sortVersions(selectedProtocol?.versions);
  },
});

const hasNetworkList = selector<boolean>({
  key: 'nodeLauncher.hasNetworkList',
  get: ({ get }) => {
    const selectedVersion = get(nodeLauncherAtoms.selectedVersion);

    return Boolean([]);
  },
});

const hasProtocol = selector<boolean>({
  key: 'nodeLauncher.hasProtocol',
  get: ({ get }) => {
    const selectedProtocol = get(nodeLauncherAtoms.selectedProtocol);
    return Boolean(selectedProtocol);
  },
});

const hasConfig = selector<boolean>({
  key: 'nodeLauncher.config',
  get: ({ get }) => {
    const selectedProtocol = get(nodeLauncherAtoms.selectedProtocol);
    return Boolean(selectedProtocol);
  },
});

const hasSummary = selector<boolean>({
  key: 'nodeLauncher.summary',
  get: ({ get }) => {
    const selectedProtocol = get(nodeLauncherAtoms.selectedProtocol);
    return Boolean(selectedProtocol);
  },
});

const isNodeValid = selector<boolean>({
  key: 'nodeLauncher.isNodeValid',
  get: ({ get }) => {
    const selectedHosts = get(nodeLauncherAtoms.selectedHosts);
    const selectedRegion = get(nodeLauncherAtoms.selectedRegion);
    const selectedProtocol = get(nodeLauncherAtoms.selectedProtocol);

    return Boolean(selectedProtocol && (selectedHosts || selectedRegion));
  },
});

const isConfigValid = selector({
  key: 'nodeLauncher.config.isValid',
  get: ({ get }) => {
    const nodeLauncher = get(nodeLauncherAtoms.nodeLauncher);
    const { properties } = nodeLauncher;

    return true;

    // TODO: image property required missing
    // return (
    //   !nodeLauncher?.properties?.length ||
    //   Boolean(
    //     nodeLauncher.properties
    //       ?.filter(
    //         (property: ImageProperty) =>
    //           // type.required &&
    //           property.uiType !== UiType.UI_TYPE_SWITCH,
    //       )
    //       .every((type) => type.defaultValue),
    //   )
    // );
  },
});

const isPropertiesValid = selector({
  key: 'nodeLauncher.properties.isValid',
  get: ({ get }) => {
    const nodeLauncher = get(nodeLauncherAtoms.nodeLauncher);
    const { properties } = nodeLauncher;
    return true;
    // TODO: image properties missing required field
    // return properties?.some((p: ImageProperty) => p.required === true && !p.value) ?? false;
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

const nodeLauncherInfo = selector<NodeLauncherBasicInfo>({
  key: 'nodeLauncher.info',
  get: ({ get }) => {
    const selectedProtocol = get(nodeLauncherAtoms.selectedProtocol);
    const selectedVersion = get(nodeLauncherAtoms.selectedVersion);

    return {
      protocolName: selectedProtocol?.name ?? '',
      versionName: selectedVersion?.semanticVersion ?? '',
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
      const selectedHosts = get(nodeLauncherAtoms.selectedHosts);
      const selectedRegion = get(nodeLauncherAtoms.selectedRegion);
      const selectedProtocol = get(nodeLauncherAtoms.selectedProtocol);
      const hasNetworkListVal = get(hasNetworkList);
      const isConfigValidVal = get(isConfigValid);
      const error = get(nodeLauncherAtoms.error);
      const price = get(billingAtoms.price);
      const isNodeAllocationValidVal = get(isNodeAllocationValid);
      const billingExempt = get(authSelectors.hasPermission('billing-exempt'));
      const isManagedHost = get(hostSelectors.isManagedHost);

      const disablingConditions: Record<string, boolean> = {
        NoPermission: !hasPermissionsToCreate,
        NoNetworks: !hasNetworkListVal,
        NoProtocol: !selectedProtocol,
        NoRegion: !(selectedHosts?.length || selectedRegion),
        InvalidConfig: !isConfigValidVal,
        ErrorExists: Boolean(error),
        NoPrice: !price && !billingExempt && !isManagedHost,
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

  nodeLauncherInfo,

  isNodeAllocationValid,
  nodeLauncherStatus,
};
