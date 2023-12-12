import { useRecoilValue } from 'recoil';
import { isMobile } from 'react-device-detect';
import { styles } from './NodeLauncherSummary.styles';
import { useGetBlockchains } from '@modules/node/hooks/useGetBlockchains';
import { nodeTypeList } from '@shared/constants/lookups';
import { colors } from 'styles/utils.colors.styles';
import { spacing } from 'styles/utils.spacing.styles';
import {
  FormHeader,
  FormLabel,
  HostSelect,
  OrganizationSelect,
  Tooltip,
} from '@shared/components';
import IconCheckCircle from '@public/assets/icons/common/CheckCircle.svg';
import IconUncheckCircle from '@public/assets/icons/common/UncheckCircle.svg';
import IconRocket from '@public/assets/icons/app/Rocket.svg';
import IconCog from '@public/assets/icons/common/Cog.svg';
import { Host, Region } from '@modules/grpc/library/blockjoy/v1/host';
import { usePermissions } from '@modules/auth';
import { useHostList } from '@modules/host';
import {
  NodeRegionSelect,
  nodeLauncherAtoms,
  nodeLauncherSelectors,
} from '@modules/node';

type NodeLauncherSummaryProps = {
  hosts: Host[];
  isLoadingHosts: boolean;
  onCreateNodeClicked: VoidFunction;
  onHostChanged: (host: Host | null) => void;
  onRegionChanged: (region: Region | null) => void;
  onRegionsLoaded: (region: Region | null) => void;
};

export const NodeLauncherSummary = ({
  hosts,
  isLoadingHosts,
  onCreateNodeClicked,
  onHostChanged,
  onRegionChanged,
  onRegionsLoaded,
}: NodeLauncherSummaryProps) => {
  const { blockchains } = useGetBlockchains();
  const { hostList } = useHostList();

  const nodeLauncher = useRecoilValue(nodeLauncherAtoms.nodeLauncher);
  const error = useRecoilValue(nodeLauncherAtoms.error);
  const isLoading = useRecoilValue(nodeLauncherAtoms.isLoading);
  const hasNetworkList = useRecoilValue(nodeLauncherSelectors.hasNetworkList);
  const isNodeValid = useRecoilValue(nodeLauncherSelectors.isNodeValid);
  const isConfigValid = useRecoilValue(nodeLauncherSelectors.isConfigValid);
  const selectedHost = useRecoilValue(nodeLauncherAtoms.selectedHost);

  const { blockchainId, nodeType, properties } = nodeLauncher;

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
            hosts={hosts}
            isLoading={isLoadingHosts}
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
      <div css={styles.summary}>
        {!hasNetworkList ? (
          <div css={[colors.warning, spacing.bottom.medium]}>
            Cannot launch node, missing network configuration.
          </div>
        ) : (
          <>
            <ul css={styles.summaryList}>
              <li>
                <span css={styles.summaryIcon}>
                  <IconCheckCircle />
                </span>
                <div>
                  <label>Blockchain</label>
                  <span>
                    {blockchains?.find((b) => b.id === blockchainId)?.name ||
                      'Not Selected'}
                  </span>
                </div>
              </li>
              <li>
                <span css={styles.summaryIcon}>
                  <IconCheckCircle />
                </span>
                <div>
                  <label>Type</label>
                  <span>
                    {nodeTypeList?.find((n) => n.id === +nodeType)?.name ||
                      'Not Selected'}
                  </span>
                </div>
              </li>
              <li>
                {isConfigValid ? (
                  <span css={styles.summaryIcon}>
                    <IconCheckCircle />
                  </span>
                ) : (
                  <span css={styles.summaryIcon}>
                    <IconUncheckCircle />
                  </span>
                )}

                <div>
                  <label>Configuration</label>
                  <span>
                    {isConfigValid ? 'Ready For Liftoff' : 'Needs Work'}
                  </span>
                </div>
              </li>
            </ul>
            {!isConfigValid && (
              <>
                <h2 css={styles.missingFieldsTitle}>
                  The following information needs to be added:
                </h2>
                <div css={styles.missingFields}>
                  {properties
                    ?.filter(
                      (property: any) =>
                        property.required &&
                        !property.disabled &&
                        !property.value,
                    )
                    .map((property: any) => (
                      <div key={property.name}>{property.displayName}</div>
                    ))}
                </div>
              </>
            )}

            {error && <div css={styles.serverError}>{error}</div>}
          </>
        )}
      </div>
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
