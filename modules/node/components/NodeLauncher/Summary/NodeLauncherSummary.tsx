import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isMobile } from 'react-device-detect';
import { Host, Region } from '@modules/grpc/library/blockjoy/v1/host';
import {
  FormHeader,
  FormLabel,
  HostSelect,
  HostSelectMultiple,
  OrganizationSelect,
  Pricing,
  Tooltip,
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
  const [isLaunching, setIsLaunching] = useRecoilState(
    nodeLauncherAtoms.isLaunching,
  );
  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);
  const error = useRecoilValue(nodeLauncherAtoms.error);
  const selectedHosts = useRecoilValue(nodeLauncherAtoms.selectedHosts);
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

  const [isLaunched, setIsLaunched] = useState(false);

  const { nodeLauncherForm } = usePipedriveForm();

  useEffect(() => {
    setIsLaunching(false);
  }, []);

  const handleIssueReport = async () => {
    setIsLaunching(true);

    await nodeLauncherForm({
      leadData: {
        nodeInfo: Object.values(nodeLauncherInfo)
          .filter((value) => value)
          .join(' | '),
        nodeIssues: nodeLauncherStatus.reasons.join(' | '),
      },
      callback: () => {
        setIsLaunched(true);
      },
    });

    setIsLaunching(false);
  };

  const handleNodeClicked = () => {
    if (nodeLauncherStatus.isDisabled) handleIssueReport();
    else onCreateNodeClicked();
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
    <>
      <NodeLauncherPanel additionalStyles={styles.nodeLauncherPanel}>
        <div css={styles.wrapper}>
          <FormHeader>Launch</FormHeader>
          {(isSuperUser || Boolean(allHosts?.length)) && (
            <FormLabel>
              <span>Host{isSuperUser ? 's' : ''}</span>
              {selectedHosts !== null ? (
                <a onClick={() => onHostsChanged(null)} css={styles.autoSelect}>
                  Auto select
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
            <button
              onClick={handleNodeClicked}
              disabled={
                isLaunching ||
                nodeLauncherStatus.isDisabled ||
                isPropertiesValid
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
