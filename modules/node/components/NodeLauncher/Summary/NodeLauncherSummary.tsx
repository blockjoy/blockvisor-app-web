import {
  NodeLauncherState,
  NodeRegionSelect,
  NodeTypeConfigLabel,
} from '@modules/node';
import { styles } from './NodeLauncherSummary.styles';
import { useGetBlockchains } from '@modules/node/hooks/useGetBlockchains';
import { nodeTypeList } from '@shared/constants/lookups';
import { colors } from 'styles/utils.colors.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { UiType } from '@modules/grpc/library/blockjoy/v1/node';
import { FormHeader, FormLabel, HostSelect } from '@shared/components';
import IconCheckCircle from '@public/assets/icons/common/CheckCircle.svg';
import IconUncheckCircle from '@public/assets/icons/common/UncheckCircle.svg';
import IconRocket from '@public/assets/icons/app/Rocket.svg';
import IconCog from '@public/assets/icons/common/Cog.svg';
import {
  ERROR_MESSAGES,
  PermissionsCreateResource,
} from '@modules/auth/hooks/useHasPermissions';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';

type NodeLauncherSummaryProps = {
  serverError: string;
  hasAddedFiles: boolean;
  hasNetworkList: boolean;
  isNodeValid: boolean;
  isConfigValid: boolean | null;
  canAddNode: PermissionsCreateResource;
  isCreating: boolean;
  selectedHost: Host | null;
  nodeLauncherState: NodeLauncherState;
  onCreateNodeClicked: VoidFunction;
  onHostChanged: (host: Host | null) => void;
  onNodePropertyChanged: (name: string, value: any) => void;
  onRegionsLoaded: (region: string) => void;
};

export const NodeLauncherSummary = ({
  serverError,
  hasAddedFiles,
  hasNetworkList,
  isNodeValid,
  isConfigValid,
  canAddNode,
  isCreating,
  selectedHost,
  nodeLauncherState,
  onCreateNodeClicked,
  onHostChanged,
  onNodePropertyChanged,
  onRegionsLoaded,
}: NodeLauncherSummaryProps) => {
  const { blockchains } = useGetBlockchains();

  if (isConfigValid === null) return null;

  const { blockchainId, nodeType, nodeTypeVersion, region, properties } =
    nodeLauncherState;

  return (
    <div css={styles.wrapper}>
      <FormHeader>Launch</FormHeader>

      <FormLabel>Host</FormLabel>
      <HostSelect selectedHost={selectedHost} onChange={onHostChanged} />

      <FormLabel>Region</FormLabel>
      <NodeRegionSelect
        onChange={onNodePropertyChanged}
        onLoad={onRegionsLoaded}
        blockchainId={blockchainId}
        nodeType={nodeType}
        nodeTypeVersion={nodeTypeVersion}
        region={region}
      />

      <FormLabel>Summary</FormLabel>
      <div css={styles.summary}>
        {!hasNetworkList || canAddNode !== PermissionsCreateResource.GRANTED ? (
          <div css={[colors.warning, spacing.bottom.medium]}>
            {canAddNode !== PermissionsCreateResource.GRANTED
              ? ERROR_MESSAGES['NODE'][canAddNode]
              : 'Cannot launch node, missing network configuration'}
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
                      (property) =>
                        (property.uiType !== UiType.UI_TYPE_FILE_UPLOAD &&
                          property.required &&
                          !property.disabled &&
                          !property.value) ||
                        (property.uiType === UiType.UI_TYPE_FILE_UPLOAD &&
                          !hasAddedFiles),
                    )
                    .map((property) => (
                      <div key={property.name}>
                        <NodeTypeConfigLabel>
                          {property.name}
                        </NodeTypeConfigLabel>
                      </div>
                    ))}
                </div>
              </>
            )}

            {serverError && <div css={styles.serverError}>{serverError}</div>}
          </>
        )}
      </div>
      <div css={styles.buttons}>
        <button
          tabIndex={20}
          onClick={onCreateNodeClicked}
          disabled={
            !hasNetworkList ||
            !isNodeValid ||
            !isConfigValid ||
            canAddNode !== PermissionsCreateResource.GRANTED ||
            Boolean(serverError) ||
            isCreating
          }
          css={[
            styles.createButton,
            isCreating && !Boolean(serverError) && styles.createButtonLoading,
          ]}
        >
          <span css={styles.createButtonInner}>
            {isCreating && !Boolean(serverError) ? (
              <span css={styles.cogIcon}>
                <IconCog />
              </span>
            ) : (
              <IconRocket />
            )}
            <span>
              {isCreating && !Boolean(serverError)
                ? 'Launching'
                : 'Launch Your Node'}
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};
