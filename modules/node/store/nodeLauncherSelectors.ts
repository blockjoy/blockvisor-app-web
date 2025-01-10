import { selector, selectorFamily } from 'recoil';
import { nodeLauncherAtoms } from '@modules/node';
import { authSelectors } from '@modules/auth';
import { billingAtoms } from '@modules/billing';
import { ImageProperty } from '@modules/grpc/library/blockjoy/v1/image';
import { UiType } from '@modules/grpc/library/blockjoy/common/v1/protocol';

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
    const selectedRegions = get(nodeLauncherAtoms.selectedRegions);
    const selectedProtocol = get(nodeLauncherAtoms.selectedProtocol);

    return Boolean(selectedProtocol && (selectedHosts || selectedRegions));
  },
});

const isConfigValid = selector({
  key: 'nodeLauncher.config.isValid',
  get: ({ get }) => {
    const nodeLauncher = get(nodeLauncherAtoms.nodeLauncher);
    const { properties } = nodeLauncher;

    return properties?.every((propertyGroup) => propertyGroup.value);
  },
});

const isPropertiesValid = selector({
  key: 'nodeLauncher.properties.isValid',
  get: ({ get }) => {
    const nodeLauncher = get(nodeLauncherAtoms.nodeLauncher);
    const { properties } = nodeLauncher;
    return properties?.every((propertyGroup) => propertyGroup.value);
  },
});

const totalNodesToLaunch = selector<number>({
  key: 'nodeLauncher.totalNodesToLaunch',
  get: ({ get }) => {
    const selectedHosts = get(nodeLauncherAtoms.selectedHosts);
    const selectedRegions = get(nodeLauncherAtoms.selectedRegions);
    const selectedList = selectedHosts || selectedRegions;

    return selectedList
      ?.map((n) => n.nodesToLaunch)
      ?.reduce((partialSum, nodesToLaunch) => partialSum + nodesToLaunch, 0)!;
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
      const selectedRegions = get(nodeLauncherAtoms.selectedRegions);
      const selectedProtocol = get(nodeLauncherAtoms.selectedProtocol);
      const isConfigValidVal = get(isConfigValid);
      const error = get(nodeLauncherAtoms.error);
      const price = get(billingAtoms.price);
      const isNodeAllocationValidVal = get(isNodeAllocationValid);
      const billingExempt = get(authSelectors.hasPermission('billing-exempt'));
      const isManagedHost = get(hostSelectors.isManagedHost);

      const disablingConditions: Record<string, boolean> = {
        NoPermission: !hasPermissionsToCreate,
        NoProtocol: !selectedProtocol,
        NoRegion: !(selectedHosts?.length || selectedRegions?.length),
        InvalidConfig: !isConfigValidVal,
        ErrorExists: Boolean(error),
        NoPrice: !price && !billingExempt,
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
