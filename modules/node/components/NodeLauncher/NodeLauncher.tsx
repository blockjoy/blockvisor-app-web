import { useRecoilValue } from 'recoil';
import { styles } from './NodeLauncher.styles';
import { NodeLauncherConfig } from './Config/NodeLauncherConfig';
import { NodeLauncherProtocol } from './Protocol/NodeLauncherProtocol';
import { NodeLauncherSummary } from './Summary/NodeLauncherSummary';
import { EmptyColumn, PageTitle } from '@shared/components';
import { wrapper } from 'styles/wrapper.styles';
import { useNodeLauncherHandlers, nodeLauncherSelectors } from '@modules/node';
import { LauncherWithGuardProps } from '@modules/billing';
import IconRocket from '@public/assets/icons/app/Rocket.svg';

export const NodeLauncher = ({
  fulfilReqs,
  onCreateClick,
  permissions,
}: LauncherWithGuardProps) => {
  const {
    handleHostsChanged,
    handleRegionChanged,
    handleRegionsLoaded,
    handleProtocolSelected,
    handleNodePropertyChanged,
    handleNodeConfigPropertyChanged,
    handleVersionChanged,
    handleNetworkChanged,
    handleFileUploaded,
  } = useNodeLauncherHandlers({ fulfilReqs });

  const hasProtocol = useRecoilValue(nodeLauncherSelectors.hasProtocol);
  const hasSummary = useRecoilValue(nodeLauncherSelectors.hasSummary);
  const hasConfig = useRecoilValue(nodeLauncherSelectors.hasConfig);

  return (
    <>
      <PageTitle title="Launch Node" icon={<IconRocket />} />

      <div css={[wrapper.main, styles.wrapper]}>
        <NodeLauncherProtocol onProtocolSelected={handleProtocolSelected} />

        {hasProtocol ? (
          <>
            {hasConfig && (
              <NodeLauncherConfig
                onNetworkChanged={handleNetworkChanged}
                onFileUploaded={handleFileUploaded}
                onNodeConfigPropertyChanged={handleNodeConfigPropertyChanged}
                onNodePropertyChanged={handleNodePropertyChanged}
                onVersionChanged={handleVersionChanged}
              />
            )}
            {hasSummary && (
              <NodeLauncherSummary
                permissions={permissions}
                onHostsChanged={handleHostsChanged}
                onRegionChanged={handleRegionChanged}
                onCreateNodeClicked={onCreateClick}
                onRegionsLoaded={handleRegionsLoaded}
              />
            )}
          </>
        ) : (
          <div css={styles.empty}>
            <EmptyColumn
              title="Launch a Node."
              description="Select a protocol to get started."
            />
          </div>
        )}
      </div>
    </>
  );
};
