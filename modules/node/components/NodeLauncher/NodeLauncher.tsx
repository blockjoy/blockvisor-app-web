import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { styles } from './NodeLauncher.styles';
import { NodeLauncherConfig } from './Config/NodeLauncherConfig';
import { NodeLauncherProtocol } from './Protocol/NodeLauncherProtocol';
import { NodeLauncherSummary } from './Summary/NodeLauncherSummary';
import { EmptyColumn, PageTitle } from '@shared/components';
import { wrapper } from 'styles/wrapper.styles';
import {
  useNodeLauncherHandlers,
  nodeLauncherSelectors,
  nodeLauncherAtoms,
} from '@modules/node';
import { LauncherWithGuardProps } from '@modules/billing';
import IconRocket from '@public/assets/icons/app/Rocket.svg';

export const NodeLauncher = ({
  fulfilReqs,
  onCreateClick,
  hasPermissionsToCreate,
}: LauncherWithGuardProps) => {
  const {
    handleHostsChanged,
    handleRegionChanged,
    handleRegionsLoaded,
    handleProtocolSelected,
    handleNodePropertyChanged,
    handleNodeConfigPropertyChanged,
    handleVersionChanged,
    handleVariantChanged,
  } = useNodeLauncherHandlers({ fulfilReqs });

  const hasProtocol = useRecoilValue(nodeLauncherSelectors.hasProtocol);
  const hasSummary = useRecoilValue(nodeLauncherSelectors.hasSummary);
  const hasConfig = useRecoilValue(nodeLauncherSelectors.hasConfig);
  const setError = useSetRecoilState(nodeLauncherAtoms.error);

  useEffect(() => {
    return () => {
      setError(null);
    };
  }, []);

  return (
    <>
      <PageTitle title="Launch Node" icon={<IconRocket />} />
      <div css={[wrapper.main, styles.wrapper]}>
        <NodeLauncherProtocol onProtocolSelected={handleProtocolSelected} />
        {hasProtocol ? (
          <>
            {hasConfig && (
              <NodeLauncherConfig
                onNodeConfigPropertyChanged={handleNodeConfigPropertyChanged}
                onNodePropertyChanged={handleNodePropertyChanged}
                onVersionChanged={handleVersionChanged}
                onVariantChanged={handleVariantChanged}
              />
            )}
            {hasSummary && (
              <NodeLauncherSummary
                hasPermissionsToCreate={!!hasPermissionsToCreate}
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
