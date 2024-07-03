import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isMobile } from 'react-device-detect';
import { toast } from 'react-toastify';
import { Host, Region } from '@modules/grpc/library/blockjoy/v1/host';
import { styles } from './NodeLauncherSummary.styles';
import {
  FormHeader,
  FormLabel,
  HostSelect,
  HostSelectMultiple,
  OrganizationSelect,
  Pricing,
  SvgIcon,
} from '@shared/components';
import { HUBSPOT_FORMS, useHubSpotForm } from '@shared/index';
import { hostAtoms } from '@modules/host';
import {
  NodeRegionSelect,
  nodeAtoms,
  nodeLauncherAtoms,
  nodeLauncherSelectors,
  NodeLauncherHost,
} from '@modules/node';
import { NodeLauncherSummaryDetails } from './NodeLauncherSummaryDetails';
import { authAtoms, authSelectors } from '@modules/auth';
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
  const [isLaunching, setIsLaunching] = useRecoilState(
    nodeLauncherAtoms.isLaunching,
  );
  const user = useRecoilValue(authAtoms.user);
  const nodeLauncherInfo = useRecoilValue(
    nodeLauncherSelectors.nodeLauncherInfo,
  );

  const { submitForm } = useHubSpotForm();

  useEffect(() => {
    setIsLaunching(false);
  }, []);

  const isNodeAllocationValid =
    !selectedHosts ||
    (selectedHosts?.every((h) => h.isValid) && totalNodesToLaunch! > 0);

  const isDisabled =
    !hasNetworkList ||
    !isNodeValid ||
    !isConfigValid ||
    Boolean(error) ||
    isLaunching ||
    isLoadingAllRegions !== 'finished';

  const handleCreateNodeClicked = async () => {
    if (!hasPermissionsToCreate) {
      setIsLaunching(true);
      await submitForm({
        formId: HUBSPOT_FORMS.requestNodeLaunch,
        formData: {
          email: user?.email,
          node_info: Object.values(nodeLauncherInfo).join(' | '),
        },
        callback: (message) => {
          toast(
            <div>
              <h5>
                <SvgIcon size="20px">
                  <IconRocket />
                </SvgIcon>
                <span>Request Received</span>
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
    } else onCreateNodeClicked();
  };

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

      <FormLabel>Pricing</FormLabel>
      <Pricing />

      <div css={styles.buttons}>
        <button
          onClick={handleCreateNodeClicked}
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
                : `Launch Your Node${totalNodesToLaunch > 1 ? 's' : ''}`}
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};
