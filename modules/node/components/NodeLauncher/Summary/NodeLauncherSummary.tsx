import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isMobile } from 'react-device-detect';
import { Host, Region } from '@modules/grpc/library/blockjoy/v1/host';
import { styles } from './NodeLauncherSummary.styles';
import {
  FormHeader,
  FormLabel,
  HostSelect,
  HostSelectMultiple,
  HubSpotForm,
  OrganizationSelect,
  Pricing,
} from '@shared/components';
import IconRocket from '@public/assets/icons/app/Rocket.svg';
import IconCog from '@public/assets/icons/common/Cog.svg';
import { hostAtoms } from '@modules/host';
import {
  NodeRegionSelect,
  nodeAtoms,
  nodeLauncherAtoms,
  nodeLauncherSelectors,
  NodeLauncherHost,
} from '@modules/node';
import { NodeLauncherSummaryDetails } from './NodeLauncherSummaryDetails';
import { billingSelectors } from '@modules/billing';
import { authSelectors } from '@modules/auth';

type NodeLauncherSummaryProps = {
  hasPermissionsToCreate: boolean;
  onCreateNodeClicked: VoidFunction;
  onHostsChanged: (
    hosts: NodeLauncherHost[] | null,
    nodesToLaunch?: number,
  ) => void;
  onRegionChanged: (region: Region | null) => void;
  onRegionsLoaded: (region: Region | null) => void;
};

export const NodeLauncherSummary = ({
  hasPermissionsToCreate,
  onCreateNodeClicked,
  onHostsChanged,
  onRegionChanged,
  onRegionsLoaded,
}: NodeLauncherSummaryProps) => {
  const hostList = useRecoilValue(hostAtoms.hostList);
  const nodeLauncher = useRecoilValue(nodeLauncherAtoms.nodeLauncher);
  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);
  const error = useRecoilValue(nodeLauncherAtoms.error);
  const hasNetworkList = useRecoilValue(nodeLauncherSelectors.hasNetworkList);
  const isNodeValid = useRecoilValue(nodeLauncherSelectors.isNodeValid);
  const isConfigValid = useRecoilValue(nodeLauncherSelectors.isConfigValid);
  const selectedHosts = useRecoilValue(nodeLauncherAtoms.selectedHosts);
  const allHosts = useRecoilValue(hostAtoms.allHosts);
  const isLoadingAllHosts = useRecoilValue(hostAtoms.isLoadingAllHosts);
  const itemPrice = useRecoilValue(billingSelectors.selectedItemPrice);
  const isLoadingAllRegions = useRecoilValue(nodeAtoms.allRegionsLoadingState);
  const [isLaunching, setIsLaunching] = useRecoilState(
    nodeLauncherAtoms.isLaunching,
  );
  const isEnabledBillingPreview = useRecoilValue(
    billingSelectors.isEnabledBillingPreview,
  );
  const bypassBillingForSuperUser = useRecoilValue(
    billingSelectors.bypassBillingForSuperUser,
  );

  const [isOpenHubSpot, setIsOpenHubSpot] = useState(false);

  useEffect(() => {
    setIsLaunching(false);
  }, []);

  const totalAvailableIps = selectedHosts?.reduce(
    (partialSum, host) =>
      partialSum + host.host.ipAddresses.filter((ip) => !ip.assigned).length,
    0,
  )!;

  const totalNodesToLaunch = selectedHosts?.reduce(
    (partialSum, host) => partialSum + host.nodesToLaunch,
    0,
  )!;

  const isNodeAllocationValid =
    !selectedHosts ||
    (selectedHosts?.every((h) => h.isValid) && totalNodesToLaunch > 0);

  const isDisabled =
    !hasNetworkList ||
    !isNodeValid ||
    !isConfigValid ||
    Boolean(error) ||
    isLaunching ||
    isLoadingAllRegions !== 'finished' ||
    (!(!isEnabledBillingPreview || bypassBillingForSuperUser) && !itemPrice) ||
    !isNodeAllocationValid;

  const handleCreateNodeClicked = () => {
    if (!hasPermissionsToCreate) handleOpenHubSpot();
    else onCreateNodeClicked();
  };

  const handleHostsChanged = (nodeLauncherHosts: NodeLauncherHost[] | null) => {
    onHostsChanged(nodeLauncherHosts);
  };

  const handleHostChanged = (host: Host | null) => {
    onHostsChanged([
      {
        nodesToLaunch: 1,
        host: host!,
      },
    ]);
  };

  const handleOpenHubSpot = () => setIsOpenHubSpot(true);
  const handleCloseHubSpot = () => setIsOpenHubSpot(false);

  return (
    <div css={styles.wrapper}>
      <FormHeader>Launch</FormHeader>

      {/* {isSuperUser && (
        <>
          <FormLabel hint="Number of nodes that will be launched">
            Quantity
          </FormLabel>
          <NodeQuantity
            isValid={isNodeQuantityMoreThanAvailableIps}
            quantity={nodeLauncher.quantity!}
            onChange={onQuantityChanged}
          />
        </>
      )} */}

      <FormLabel>
        <span>Host{isSuperUser ? 's' : ''}</span>
        {selectedHosts !== null ? (
          <a onClick={() => onHostsChanged(null)} css={styles.autoSelect}>
            Auto select
          </a>
        ) : null}
      </FormLabel>
      {isSuperUser ? (
        <HostSelectMultiple
          isValid={isNodeAllocationValid}
          onChange={handleHostsChanged}
        />
      ) : (
        Boolean(hostList?.length) && (
          <HostSelect
            hosts={allHosts}
            isLoading={isLoadingAllHosts !== 'finished'}
            selectedHost={selectedHosts?.[0]?.host!}
            onChange={handleHostChanged}
          />
        )
      )}

      {!selectedHosts && (
        <>
          <FormLabel>Region</FormLabel>
          <NodeRegionSelect
            onChange={onRegionChanged}
            onLoad={onRegionsLoaded}
          />
        </>
      )}

      {isMobile && (
        <>
          <FormLabel>Organization</FormLabel>
          <OrganizationSelect />
        </>
      )}

      <FormLabel>Summary</FormLabel>
      <NodeLauncherSummaryDetails totalNodesToLaunch={totalNodesToLaunch} />

      {isEnabledBillingPreview && (
        <>
          <FormLabel>Pricing</FormLabel>
          <Pricing itemPrice={itemPrice} />
        </>
      )}

      <div css={styles.buttons}>
        <button
          onClick={handleCreateNodeClicked}
          disabled={isDisabled}
          css={[
            styles.createButton,
            isLaunching && !Boolean(error) && styles.createButtonLoading,
          ]}
        >
          <span css={styles.createButtonInner}>
            {isLaunching && !Boolean(error) ? (
              <span css={styles.cogIcon}>
                <IconCog />
              </span>
            ) : (
              <IconRocket />
            )}
            <span>
              {isLaunching && !Boolean(error)
                ? 'Launching'
                : `Launch Your Node${totalNodesToLaunch > 1 ? 's' : ''}`}
            </span>
          </span>
        </button>
      </div>
      {isOpenHubSpot && (
        <HubSpotForm
          title="Request Node Launch"
          content="Interested in launching a node? Leave us your email to get started."
          isOpenHubSpot={isOpenHubSpot}
          handleClose={handleCloseHubSpot}
        />
      )}
    </div>
  );
};
