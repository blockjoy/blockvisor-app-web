import { useState } from 'react';
import { ProtocolVersion } from '@modules/grpc/library/blockjoy/v1/protocol';
import { FormLabel, FormHeader, Checkbox } from '@shared/components';
import {
  NodeLauncherPanel,
  NodeLauncherState,
  NodeLauncherVariantSegments,
  nodeLauncherSelectors,
  nodeLauncherAtoms,
} from '@modules/node';
import { styles } from './NodeLauncherConfig.styles';
import { NodeLauncherConfigAdvanced } from './NodeLauncherConfigAdvanced/NodeLauncherConfigAdvanced';
import { NodeLauncherConfigVariant } from './NodeLauncherConfigVariant/NodeLauncherConfigVariant';
import { useRecoilValue } from 'recoil';

type NodeLauncherConfigProps = {
  onNodeConfigPropertyChanged: (
    key: string,
    keyGroup: string,
    value: string | boolean,
  ) => void;
  onNodePropertyChanged: <K extends keyof NodeLauncherState>(
    name: K,
    value: NodeLauncherState[K],
  ) => void;
  onVersionChanged: (version: ProtocolVersion) => void;
  onVariantChanged: (variantSegments: NodeLauncherVariantSegments) => void;
};

export const NodeLauncherConfig = ({
  onNodeConfigPropertyChanged,
  onNodePropertyChanged,
  onVersionChanged,
  onVariantChanged,
}: NodeLauncherConfigProps) => {
  const [showAdvancedConfig, setShowAdvancedConfig] = useState(false);

  const toggleAdvancedConfig = () => setShowAdvancedConfig(!showAdvancedConfig);

  const isVariantSegmentsLoaded = useRecoilValue(
    nodeLauncherSelectors.isVariantSegmentsLoaded,
  );

  const selectedProtocol = useRecoilValue(nodeLauncherAtoms.selectedProtocol);

  return (
    <NodeLauncherPanel>
      <div css={styles.wrapper}>
        <FormHeader>Config</FormHeader>

        <NodeLauncherConfigVariant onChange={onVariantChanged} />

        {(isVariantSegmentsLoaded || selectedProtocol?.key === 'legacy') && (
          <>
            <FormLabel>
              <button
                css={styles.advancedConfigButton}
                onClick={toggleAdvancedConfig}
              >
                <Checkbox
                  name="showAdvancedConfig"
                  checked={showAdvancedConfig}
                />
                Advanced Config
              </button>
            </FormLabel>

            {showAdvancedConfig && (
              <NodeLauncherConfigAdvanced
                isOpen={showAdvancedConfig}
                onNodeConfigPropertyChanged={onNodeConfigPropertyChanged}
                onNodePropertyChanged={onNodePropertyChanged}
                onVersionChanged={onVersionChanged}
              />
            )}
          </>
        )}
      </div>
    </NodeLauncherPanel>
  );
};
