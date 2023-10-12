import { useRecoilState, useRecoilValue } from 'recoil';
import { NodeLauncherState, NodeRegionSelect } from '@modules/node';
import { FC } from 'react';
import { styles } from './NodeLauncherSummary.styles';
import { useGetBlockchains } from '@modules/node/hooks/useGetBlockchains';
import { nodeTypeList } from '@shared/constants/lookups';
import { colors } from 'styles/utils.colors.styles';
import { spacing } from 'styles/utils.spacing.styles';
import {
  Checkbox,
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
import { BlockchainVersion } from '@modules/grpc/library/blockjoy/v1/blockchain';
<<<<<<< HEAD
import { isMobile } from 'react-device-detect';

const ERROR_MESSAGES = {
  [PermissionsCreateNode.NoPermissions]:
    'Cannot launch node due to insufficient permissions',
  [PermissionsCreateNode.NoSubscription]:
    'Cannot launch node. Contact organization owner to upgrade subscription',
  [PermissionsCreateNode.NoPaymentMethod]:
    'Cannot launch node. Contact organization owner to add payment method',
};
=======
import { billingAtoms, billingSelectors } from '@modules/billing';
import { usePermissions } from '@modules/auth';
>>>>>>> aabaf5c2 (feat: [sc-2861] bypassing billing for super admins)

type NodeLauncherSummaryProps = {
  serverError: string;
  hasNetworkList: boolean;
  isNodeValid: boolean;
  isConfigValid: boolean | null;
  canAddNode: PermissionsCreateResource;
  isCreating: boolean;
  selectedHost: Host | null;
  selectedVersion: BlockchainVersion;
  selectedRegion: Region | null;
  nodeLauncherState: NodeLauncherState;
  canAddNode: boolean;
  onCreateNodeClicked: VoidFunction;
  onHostChanged: (host: Host | null) => void;
  onRegionChanged: (region: Region | null) => void;
  onRegionsLoaded: (region: Region | null) => void;
};

export const NodeLauncherSummary = ({
  serverError,
  hasNetworkList,
  isNodeValid,
  isConfigValid,
  canAddNode,
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
}: NodeLauncherSummaryProps) => {
  const { blockchains } = useGetBlockchains();
  const { isSuperUser } = usePermissions();
  const [isSuperUserBilling, setIsSuperUserBilling] = useRecoilState(
    billingAtoms.isSuperUserBilling,
  );

  const { blockchainId, nodeType, properties } = nodeLauncherState;

  const handleSuperUserBilling = () => {
    setIsSuperUserBilling(!isSuperUserBilling);
  };

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
<<<<<<< HEAD
        {!hasNetworkList || canAddNode !== PermissionsCreateResource.GRANTED ? (
          <div css={[colors.warning, spacing.bottom.medium]}>
            Cannot launch node, missing network configuration.
=======
        {!hasNetworkList ? (
          <div css={[colors.warning, spacing.bottom.medium]}>
            Cannot launch node, missing network configuration.{' '}
>>>>>>> e4e84717 (fix: [sc-2346] removed additional step in HostLauncher, rebased off develop)
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
<<<<<<< HEAD
=======

      <FormLabel>Pricing</FormLabel>
      <Pricing itemPrice={itemPrice} />

      {isSuperUser && (
        <div css={[spacing.top.medium, spacing.bottom.medium]}>
          <FormLabel>Super User</FormLabel>
          <Checkbox
            id="admin-launch-node"
            name="admin-launch-node"
            checked={isSuperUserBilling}
            onChange={handleSuperUserBilling}
          >
            Bypass Billing
          </Checkbox>
        </div>
      )}

>>>>>>> aabaf5c2 (feat: [sc-2861] bypassing billing for super admins)
      <div css={styles.buttons}>
        {!canAddNode && (
          <Tooltip
            noWrap
            top="-30px"
            left="50%"
<<<<<<< HEAD
            tooltip="Feature disabled during beta."
=======
            tooltip="Insufficient permissions to launch node."
>>>>>>> e4e84717 (fix: [sc-2346] removed additional step in HostLauncher, rebased off develop)
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
