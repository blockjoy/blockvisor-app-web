import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isMobile } from 'react-device-detect';
import { Host, Region } from '@modules/grpc/library/blockjoy/v1/host';
import { styles } from './NodeLauncherSummary.styles';
import {
  FormHeader,
  FormLabel,
  HostSelect,
  OrganizationSelect,
  Pricing,
  Tooltip,
} from '@shared/components';
import IconRocket from '@public/assets/icons/app/Rocket.svg';
import IconCog from '@public/assets/icons/common/Cog.svg';
import { usePermissions } from '@modules/auth';
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

  const { hasPermission } = usePermissions();
  const canAddNode = hasPermission('node-create');

  const isDisabled =
    !canAddNode ||
    !hasNetworkList ||
    !isNodeValid ||
    !isConfigValid ||
    Boolean(error) ||
    isLaunching ||
    isLoadingAllRegions !== 'finished' ||
    !itemPrice;

  useEffect(() => {
    setIsLaunching(false);
  }, []);

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

      <FormLabel>Pricing</FormLabel>
      <Pricing itemPrice={itemPrice} />

      <div css={styles.buttons}>
        {!canAddNode && (
          <Tooltip
            noWrap
            top="-30px"
            left="50%"
            tooltip="Insufficient permission to launch node."
          />
        )}
        <button
          onClick={onCreateNodeClicked}
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
    </div>
  );
};
