import { useState } from 'react';
import { ProtocolVersion } from '@modules/grpc/library/blockjoy/v1/protocol';
import { FormLabel, FormHeader, Checkbox } from '@shared/components';
import {
  NodeLauncherPanel,
  NodeVersionSelect,
  NodeLauncherState,
  NodeVariantSelect,
} from '@modules/node';
import { styles } from './NodeLauncherConfig.styles';
import { NodeLauncherConfigAdvanced } from './NodeLauncherConfigAdvanced/NodeLauncherConfigAdvanced';
import { NodeLauncherConfigVariant } from './NodeLauncherConfigVariant/NodeLauncherConfigVariant';
import { useRecoilValue } from 'recoil';
import { authSelectors } from '@modules/auth';

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
  onVariantChanged: (variant: string) => void;
};

export const NodeLauncherConfig = ({
  onNodeConfigPropertyChanged,
  onNodePropertyChanged,
  onVersionChanged,
  onVariantChanged,
}: NodeLauncherConfigProps) => {
  const [showAdvancedConfig, setShowAdvancedConfig] = useState(false);

  const toggleAdvancedConfig = () => setShowAdvancedConfig(!showAdvancedConfig);

  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);

  return (
    <NodeLauncherPanel>
      <div css={styles.wrapper}>
        <FormHeader>Config</FormHeader>

        {/* {isSuperUser && ( */}
        <>
          <FormLabel>Variant</FormLabel>
          <NodeVariantSelect onChange={onVariantChanged} />
        </>
        {/* )} */}

        {/* <NodeLauncherConfigVariant onChange={onVariantChanged} /> */}

        <FormLabel>Version</FormLabel>
        <NodeVersionSelect onVersionChanged={onVersionChanged} />

        <FormLabel>
          <button
            css={styles.advancedConfigButton}
            onClick={toggleAdvancedConfig}
          >
            <Checkbox name="showAdvancedConfig" checked={showAdvancedConfig} />
            Advanced Config
          </button>
        </FormLabel>

        {showAdvancedConfig && (
          <NodeLauncherConfigAdvanced
            isOpen={showAdvancedConfig}
            onNodeConfigPropertyChanged={onNodeConfigPropertyChanged}
            onNodePropertyChanged={onNodePropertyChanged}
          />
        )}
      </div>
    </NodeLauncherPanel>
  );
};
