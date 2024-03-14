import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isMobile } from 'react-device-detect';
import { Host, Region } from '@modules/grpc/library/blockjoy/v1/host';
import { styles } from './NodeLauncherSummary.styles';
import {
  FormHeader,
  FormLabel,
  HostSelect,
  HubSpotForm,
  OrganizationSelect,
  Pricing,
} from '@shared/components';
import IconRocket from '@public/assets/icons/app/Rocket.svg';
import IconCog from '@public/assets/icons/common/Cog.svg';
import { authSelectors } from '@modules/auth';
import { hostAtoms, useHostList } from '@modules/host';
import {
  NodeRegionSelect,
  nodeAtoms,
  nodeLauncherAtoms,
  nodeLauncherSelectors,
} from '@modules/node';
import { NodeLauncherSummaryDetails } from './NodeLauncherSummaryDetails';
import { billingSelectors } from '@modules/billing';

type NodeLauncherSummaryProps = {
  onCreateNodeClicked: VoidFunction;
  onHostChanged: (host: Host | null) => void;
  onRegionChanged: (region: Region | null) => void;
  onRegionsLoaded: (region: Region | null) => void;
};

export const NodeLauncherSummary = ({
  onCreateNodeClicked,
  onHostChanged,
  onRegionChanged,
  onRegionsLoaded,
}: NodeLauncherSummaryProps) => {
  const { hostList } = useHostList();
  const error = useRecoilValue(nodeLauncherAtoms.error);
  const hasNetworkList = useRecoilValue(nodeLauncherSelectors.hasNetworkList);
  const isNodeValid = useRecoilValue(nodeLauncherSelectors.isNodeValid);
  const isConfigValid = useRecoilValue(nodeLauncherSelectors.isConfigValid);
  const selectedHost = useRecoilValue(nodeLauncherAtoms.selectedHost);
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
  const canAddNode = useRecoilValue(authSelectors.hasPermission('node-create'));

  const [isOpenHubSpot, setIsOpenHubSpot] = useState(false);

  useEffect(() => {
    setIsLaunching(false);
  }, []);

  const isDisabled =
    !hasNetworkList ||
    !isNodeValid ||
    !isConfigValid ||
    Boolean(error) ||
    isLaunching ||
    isLoadingAllRegions !== 'finished' ||
    (!(!isEnabledBillingPreview || bypassBillingForSuperUser) && !itemPrice);

  const handleCreateNodeClicked = () => {
    if (!canAddNode) handleOpenHubSpot();
    else onCreateNodeClicked();
  };

  const handleOpenHubSpot = () => setIsOpenHubSpot(true);
  const handleCloseHubSpot = () => setIsOpenHubSpot(false);

  return (
    <div css={styles.wrapper}>
      <FormHeader>Launch</FormHeader>

      {Boolean(hostList?.length) && (
        <>
          <FormLabel>
            <span>Host</span>
            {selectedHost !== null ? (
              <a onClick={() => onHostChanged(null)} css={styles.autoSelect}>
                Auto select
              </a>
            ) : null}
          </FormLabel>
          <HostSelect
            hosts={allHosts}
            isLoading={isLoadingAllHosts !== 'finished'}
            selectedHost={selectedHost}
            onChange={onHostChanged}
          />
        </>
      )}

      {!selectedHost && (
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
      <NodeLauncherSummaryDetails />

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
                : 'Launch Your Node'}
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
