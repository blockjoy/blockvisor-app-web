import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isMobile } from 'react-device-detect';
import { Host, Region } from '@modules/grpc/library/blockjoy/v1/host';
import { styles } from './NodeLauncherSummary.styles';
import {
  FormHeader,
  FormLabel,
  HostSelect,
  HostSelectMultiple,
  OrganizationSelect,
  Pricing,
  Tooltip,
} from '@shared/components';
import { hostAtoms } from '@modules/host';
import {
  NodeRegionSelect,
  nodeAtoms,
  nodeLauncherAtoms,
  nodeLauncherSelectors,
  NodeLauncherHost,
} from '@modules/node';
import { NodeLauncherSummaryDetails } from './NodeLauncherSummaryDetails';
import { authSelectors } from '@modules/auth';
import { billingAtoms } from '@modules/billing';
import IconRocket from '@public/assets/icons/app/Rocket.svg';
import IconCog from '@public/assets/icons/common/Cog.svg';

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
  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);
  const error = useRecoilValue(nodeLauncherAtoms.error);
  const hasNetworkList = useRecoilValue(nodeLauncherSelectors.hasNetworkList);
  const isNodeValid = useRecoilValue(nodeLauncherSelectors.isNodeValid);
  const isConfigValid = useRecoilValue(nodeLauncherSelectors.isConfigValid);
  const selectedHosts = useRecoilValue(nodeLauncherAtoms.selectedHosts);
  const totalNodesToLaunch = useRecoilValue(
    nodeLauncherSelectors.totalNodesToLaunch,
  );
  const allHosts = useRecoilValue(hostAtoms.allHosts);
  const isLoadingAllHosts = useRecoilValue(hostAtoms.isLoadingAllHosts);
  const isLoadingAllRegions = useRecoilValue(nodeAtoms.allRegionsLoadingState);
  const price = useRecoilValue(billingAtoms.price);
  const billingExempt = useRecoilValue(
    authSelectors.hasPermission('billing-exempt'),
  );
  const [isLaunching, setIsLaunching] = useRecoilState(
    nodeLauncherAtoms.isLaunching,
  );

  useEffect(() => {
    setIsLaunching(false);
  }, []);

  const isNodeAllocationValid =
    !selectedHosts ||
    (selectedHosts?.every((h) => h.isValid) && totalNodesToLaunch! > 0);

  const isDisabled =
    !hasPermissionsToCreate ||
    !hasNetworkList ||
    !isNodeValid ||
    !isConfigValid ||
    Boolean(error) ||
    isLaunching ||
    isLoadingAllRegions !== 'finished' ||
    !price ||
    !isNodeAllocationValid;

  const handleHostsChanged = (nodeLauncherHosts: NodeLauncherHost[] | null) => {
    onHostsChanged(nodeLauncherHosts);
  };

  const handleHostChanged = (host: Host | null) => {
    onHostsChanged([
      {
        nodesToLaunch: 1,
        host: host!,
        isValid: true,
      },
    ]);
  };

  return (
    <div css={styles.wrapper}>
      <FormHeader>Launch</FormHeader>
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

      {price && (
        <>
          <FormLabel>Pricing</FormLabel>
          <Pricing />
        </>
      )}

      <div css={styles.buttons}>
        {!hasPermissionsToCreate && (
          <Tooltip
            noWrap
            top="-30px"
            left="50%"
            tooltip="Insufficient permissions to launch a node."
          />
        )}
        <button
          onClick={onCreateNodeClicked}
          disabled={isDisabled && !billingExempt}
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
    </div>
  );
};
