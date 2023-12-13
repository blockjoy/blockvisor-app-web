import { useRecoilValue } from 'recoil';
import { styles } from './NodeLauncher.styles';
import IconRocket from '@public/assets/icons/app/Rocket.svg';
import { NodeLauncherConfig } from './Config/NodeLauncherConfig';
import { NodeLauncherProtocol } from './Protocol/NodeLauncherProtocol';
import { NodeLauncherSummary } from './Summary/NodeLauncherSummary';
import { EmptyColumn, PageTitle } from '@shared/components';
import { wrapper } from 'styles/wrapper.styles';
import { useNodeLauncherHandlers, nodeLauncherSelectors } from '@modules/node';

export const NodeLauncher = () => {
  const {
    handleHostChanged,
    handleRegionChanged,
    handleRegionsLoaded,
    handleProtocolSelected,
    handleNodePropertyChanged,
    handleNodeConfigPropertyChanged,
    handleVersionChanged,
    handleFileUploaded,
    handleCreateNodeClicked,
  } = useNodeLauncherHandlers();

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
                onFileUploaded={handleFileUploaded}
                onNodeConfigPropertyChanged={handleNodeConfigPropertyChanged}
                onNodePropertyChanged={handleNodePropertyChanged}
                onVersionChanged={handleVersionChanged}
              />
            )}
            {hasSummary && (
              <NodeLauncherSummary
                onHostChanged={handleHostChanged}
                onRegionChanged={handleRegionChanged}
                onCreateNodeClicked={handleCreateNodeClicked}
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
