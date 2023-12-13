import { useRecoilValue } from 'recoil';
import { isMobile } from 'react-device-detect';
import { styles } from './NodeLauncherSummary.styles';
import {
  FormHeader,
  FormLabel,
  HostSelect,
  OrganizationSelect,
  Tooltip,
} from '@shared/components';
import IconRocket from '@public/assets/icons/app/Rocket.svg';
import IconCog from '@public/assets/icons/common/Cog.svg';
import { Host, Region } from '@modules/grpc/library/blockjoy/v1/host';
import { usePermissions } from '@modules/auth';
import { hostAtoms, useHostList } from '@modules/host';
import {
  NodeRegionSelect,
  nodeLauncherAtoms,
  nodeLauncherSelectors,
} from '@modules/node';
import { NodeLauncherSummaryDetails } from './NodeLauncherSummaryDetails';

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

  const nodeLauncher = useRecoilValue(nodeLauncherAtoms.nodeLauncher);
  const error = useRecoilValue(nodeLauncherAtoms.error);
  const isLoading = useRecoilValue(nodeLauncherAtoms.isLoading);
  const hasNetworkList = useRecoilValue(nodeLauncherSelectors.hasNetworkList);
  const isNodeValid = useRecoilValue(nodeLauncherSelectors.isNodeValid);
  const isConfigValid = useRecoilValue(nodeLauncherSelectors.isConfigValid);
  const selectedHost = useRecoilValue(nodeLauncherAtoms.selectedHost);
  const allHosts = useRecoilValue(hostAtoms.allHosts);
  const isLoadingAllHosts = useRecoilValue(hostAtoms.isLoadingAllHosts);

  const { blockchainId, nodeType } = nodeLauncher;

  const { hasPermission } = usePermissions();
  const canAddNode = hasPermission('node-create');

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
            blockchainId={blockchainId}
            nodeType={nodeType}
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

      <div css={styles.buttons}>
        {!canAddNode && (
          <Tooltip
            noWrap
            top="-30px"
            left="50%"
            tooltip="Feature disabled during beta."
          />
        )}
        <button
          tabIndex={20}
          onClick={onCreateNodeClicked}
          disabled={
            !canAddNode ||
            !hasNetworkList ||
            !isNodeValid ||
            !isConfigValid ||
            Boolean(error) ||
            isLoading
          }
          css={[
            styles.createButton,
            isLoading && !Boolean(error) && styles.createButtonLoading,
          ]}
        >
          <span css={styles.createButtonInner}>
            {isLoading && !Boolean(error) ? (
              <span css={styles.cogIcon}>
                <IconCog />
              </span>
            ) : (
              <IconRocket />
            )}
            <span>
              {isLoading && !Boolean(error) ? 'Launching' : 'Launch Your Node'}
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};
