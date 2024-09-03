import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isMobile } from 'react-device-detect';
import { toast } from 'react-toastify';
import { Host, Region } from '@modules/grpc/library/blockjoy/v1/host';
import {
  FormHeader,
  FormLabel,
  HostSelect,
  HostSelectMultiple,
  OrganizationSelect,
  Pricing,
  Tooltip,
  SvgIcon,
  FormError,
} from '@shared/components';
import { HUBSPOT_FORMS, useHubSpotForm } from '@shared/index';
import { hostAtoms } from '@modules/host';
import {
  NodeRegionSelect,
  nodeLauncherAtoms,
  nodeLauncherSelectors,
  NodeLauncherHost,
  NodeLauncherPanel,
  NodeLauncherSummaryDetails,
} from '@modules/node';
import { authAtoms, authSelectors } from '@modules/auth';
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
  const [isLaunchError, setIsLaunchError] = useRecoilState(
    nodeLauncherAtoms.isLaunchError,
  );
  const user = useRecoilValue(authAtoms.user);
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

  const { submitForm } = useHubSpotForm();

  useEffect(() => {
    setIsLaunching(false);
    setIsLaunchError(false);
  }, []);

  const handleIssueReport = async () => {
    setIsLaunching(true);

    await submitForm({
      formId: HUBSPOT_FORMS.requestNodeLaunch,
      formData: {
        email: user?.email,
        node_info: Object.values(nodeLauncherInfo)
          .filter((value) => value)
          .join(' | '),
        node_issues: nodeLauncherStatus.reasons.join(' | '),
      },
      callback: (message) => {
        toast(
          <div>
            <h5>
              <SvgIcon size="20px">
                <IconRocket />
              </SvgIcon>
              <span>Issue reported</span>
            </h5>
            <p>{message}</p>
          </div>,
          {
            autoClose: false,
            hideProgressBar: true,
            className: 'Toastify__notification',
          },
        );
      },
    });

    setIsLaunching(false);
    setIsLaunchError(true);
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
          {!hasPermissionsToCreate && (
            <Tooltip
              noWrap
              top="-30px"
              left="50%"
              tooltip="Insufficient permissions to launch a node."
            />
          )}
          <button
            onClick={handleNodeClicked}
            disabled={
              isLaunching ||
              (isSuperUser && nodeLauncherStatus.isDisabled) ||
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
        {isLaunchError && (
          <FormError isVisible={true}>An internal error occured.</FormError>
        )}
      </div>
    </NodeLauncherPanel>
  );
};
