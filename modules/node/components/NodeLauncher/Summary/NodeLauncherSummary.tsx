import { NodeLauncherState, NodeRegionSelect } from '@modules/node';
import { FC } from 'react';
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
import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { BlockchainVersion } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { isMobile } from 'react-device-detect';

type Props = {
  serverError: string;
  hasNetworkList: boolean;
  isNodeValid: boolean;
  isConfigValid: boolean | null;
  isCreating: boolean;
  selectedHost: Host | null;
  selectedVersion: BlockchainVersion;
  selectedRegion: string;
  nodeLauncherState: NodeLauncherState;
  canAddNode: boolean;
  onCreateNodeClicked: VoidFunction;
  onHostChanged: (host: Host | null) => void;
  onRegionChanged: (region: string) => void;
  onRegionsLoaded: (region: string) => void;
};

export const NodeLauncherSummary: FC<Props> = ({
  serverError,
  hasNetworkList,
  isNodeValid,
  isConfigValid,
  isCreating,
  selectedHost,
  selectedVersion,
  selectedRegion,
  nodeLauncherState,
  canAddNode,
  onCreateNodeClicked,
  onHostChanged,
  onRegionChanged,
  onRegionsLoaded,
}) => {
  const { blockchains } = useGetBlockchains();

  const { blockchainId, nodeType, properties } = nodeLauncherState;

  return (
    <div css={styles.wrapper}>
      <FormHeader>Launch</FormHeader>

      <FormLabel>Host</FormLabel>
      <HostSelect selectedHost={selectedHost} onChange={onHostChanged} />

      {!selectedHost && (
        <>
          <FormLabel>Region</FormLabel>
          <NodeRegionSelect
            onChange={onRegionChanged}
            onLoad={onRegionsLoaded}
            blockchainId={blockchainId}
            nodeType={nodeType}
            version={selectedVersion}
            region={selectedRegion}
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
                      (property) =>
                        property.required &&
                        !property.disabled &&
                        !property.value,
                    )
                    .map((property) => (
                      <div key={property.name}>{property.displayName}</div>
                    ))}
                </div>
              </>
            )}

            {serverError && <div css={styles.serverError}>{serverError}</div>}
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
