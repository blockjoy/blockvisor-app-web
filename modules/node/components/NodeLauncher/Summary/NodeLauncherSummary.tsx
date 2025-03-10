import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isMobile } from 'react-device-detect';
import { Host, RegionInfo } from '@modules/grpc/library/blockjoy/v1/host';
import {
  FormHeader,
  FormLabel,
  HostSelect,
  HostSelectMultiple,
  OrganizationSelect,
  Pricing,
} from '@shared/components';
import { usePipedriveForm } from '@shared/index';
import { hostAtoms } from '@modules/host';
import {
  NodeRegionSelect,
  nodeLauncherAtoms,
  nodeLauncherSelectors,
  NodeLauncherHost,
  NodeLauncherPanel,
  NodeLauncherSummaryDetails,
  NodeLauncherNotification,
  NodeRegionSelectMultiple,
  NodeLauncherRegion,
} from '@modules/node';
import { authSelectors } from '@modules/auth';
import { billingAtoms } from '@modules/billing';
import { styles } from './NodeLauncherSummary.styles';
import IconRocket from '@public/assets/icons/app/Rocket.svg';
import IconCog from '@public/assets/icons/common/Cog.svg';

type NodeLauncherSummaryProps = {
  hasPermissionsToCreate: boolean;
  onCreateNodeClicked: VoidFunction;
  onHostsChanged: (
    hosts: NodeLauncherHost[] | null,
    nodesToLaunch?: number,
  ) => void;
  onRegionsChanged: (
    regions: NodeLauncherRegion[] | null,
    nodesToLaunch?: number,
  ) => void;
  onRegionsLoaded: (regionInfo: RegionInfo | null) => void;
};

export const NodeLauncherSummary = ({
  hasPermissionsToCreate,
  onCreateNodeClicked,
  onHostsChanged,
  onRegionsChanged,
  onRegionsLoaded,
}: NodeLauncherSummaryProps) => {
  const [isLaunching, setIsLaunching] = useRecoilState(
    nodeLauncherAtoms.isLaunching,
  );
  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);
  const billingExempt = useRecoilValue(
    authSelectors.hasPermission('billing-exempt'),
  );
  const error = useRecoilValue(nodeLauncherAtoms.error);
  const selectedHosts = useRecoilValue(nodeLauncherAtoms.selectedHosts);
  const selectedRegions = useRecoilValue(nodeLauncherAtoms.selectedRegions);
  const selectedVariant = useRecoilValue(nodeLauncherAtoms.selectedVariant);
  const totalNodesToLaunch = useRecoilValue(
    nodeLauncherSelectors.totalNodesToLaunch,
  );
  const allHosts = useRecoilValue(hostAtoms.allHosts);
  const isLoadingAllHosts = useRecoilValue(hostAtoms.isLoadingAllHosts);
  const price = useRecoilValue(billingAtoms.price);
  const nodeLauncherStatus = useRecoilValue(
    nodeLauncherSelectors.nodeLauncherStatus(hasPermissionsToCreate),
  );
  const nodeLauncherInfo = useRecoilValue(
    nodeLauncherSelectors.nodeLauncherInfo,
  );
  const isPropertiesValid = useRecoilValue(
    nodeLauncherSelectors.isPropertiesValid,
  );
  const isVariantValid = useRecoilValue(nodeLauncherSelectors.isVariantValid);

  const [isLaunched, setIsLaunched] = useState(false);

  const { nodeLauncherForm } = usePipedriveForm();

  useEffect(() => {
    setIsLaunching(false);
  }, []);

  const handleIssueReport = async (isValid?: boolean) => {
    if (!isValid) setIsLaunching(true);

    const leadData: PipedriveAddLeadParams = {
      nodeInfo: Object.values(nodeLauncherInfo)
        .filter((value) => value)
        .join(' | '),
    };

    if (!isValid) leadData.nodeIssues = nodeLauncherStatus.reasons.join(' | ');

    await nodeLauncherForm({
      leadData,
      callback: () => {
        if (!isValid) setIsLaunched(true);
      },
    });

    if (!isValid) setIsLaunching(false);
  };

  const handleNodeClicked = () => {
    const isValid = !nodeLauncherStatus.isDisabled;

    if (!billingExempt) handleIssueReport(isValid);
    if (isValid) onCreateNodeClicked();
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

  const handleRegionChanged = (regionInfo: RegionInfo | null) => {
    onRegionsChanged([
      {
        nodesToLaunch: 1,
        regionInfo: regionInfo!,
      },
    ]);
  };

  return (
    <>
      <NodeLauncherPanel additionalStyles={styles.nodeLauncherPanel}>
        <div css={styles.wrapper}>
          <FormHeader>Launch</FormHeader>
          {(isSuperUser || Boolean(allHosts?.length)) && (
            <FormLabel>
              <span>Host{isSuperUser ? 's' : ''}</span>
              {selectedHosts !== null ? (
                <a onClick={() => onHostsChanged(null)} css={styles.autoSelect}>
                  Reset
                </a>
              ) : null}
            </FormLabel>
          )}
          {isSuperUser ? (
            <HostSelectMultiple onChange={onHostsChanged} />
          ) : (
            Boolean(allHosts?.length) && (
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
              <FormLabel>
                <span>Region{isSuperUser ? 's' : ''}</span>
                {isSuperUser && selectedRegions !== null ? (
                  <a
                    onClick={() => onRegionsChanged(null)}
                    css={styles.autoSelect}
                  >
                    Reset
                  </a>
                ) : null}
              </FormLabel>
              {isSuperUser ? (
                <NodeRegionSelectMultiple onChange={onRegionsChanged} />
              ) : (
                <NodeRegionSelect
                  onChange={handleRegionChanged}
                  onLoad={onRegionsLoaded}
                />
              )}
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
            <button
              onClick={handleNodeClicked}
              disabled={
                isLaunching ||
                (isSuperUser && nodeLauncherStatus.isDisabled) ||
                (!isVariantValid && !selectedVariant) ||
                !isPropertiesValid
              }
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
      </NodeLauncherPanel>
      {isLaunched && (
        <NodeLauncherNotification handleClose={() => setIsLaunched(false)} />
      )}
    </>
  );
};
