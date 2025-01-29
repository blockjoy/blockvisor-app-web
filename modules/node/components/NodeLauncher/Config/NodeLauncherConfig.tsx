import { Fragment, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { renderNodeConfigControl } from '@modules/node/utils/renderNodeConfigControl';
import { ProtocolVersion } from '@modules/grpc/library/blockjoy/v1/protocol';
import { FormLabel, FormHeader, sort, SvgIcon } from '@shared/components';
import {
  NodeLauncherPanel,
  NodeVersionSelect,
  nodeLauncherAtoms,
  NodeLauncherState,
  NodeVariantSelect,
  NodePropertyGroup,
  NodeFirewallRules,
} from '@modules/node';
import { styles } from './NodeLauncherConfig.styles';
import { UiType } from '@modules/grpc/library/blockjoy/common/v1/protocol';
import { kebabToCapitalized } from 'utils';
import { FirewallRule } from '@modules/grpc/library/blockjoy/common/v1/config';
import IconPlus from '@public/assets/icons/common/Plus.svg';
import IconMinus from '@public/assets/icons/common/Minus.svg';

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
  const nodeLauncher = useRecoilValue(nodeLauncherAtoms.nodeLauncher);

  const [showAdvancedConfig, setShowAdvancedConfig] = useState(false);

  const { properties } = nodeLauncher;

  const sortedProperties = sort(properties, { field: 'key' });

  const handleFirewallChanged = (nextFirewall: FirewallRule[]) =>
    onNodePropertyChanged('firewall', nextFirewall);

  const toggleAdvancedConfig = () => setShowAdvancedConfig(!showAdvancedConfig);

  return (
    <NodeLauncherPanel>
      <div css={styles.wrapper}>
        <FormHeader>Config</FormHeader>

        <FormLabel>Variant</FormLabel>
        <NodeVariantSelect onChange={onVariantChanged} />

        <FormLabel>Version</FormLabel>
        <NodeVersionSelect onVersionChanged={onVersionChanged} />

        <FormLabel>
          <button
            css={styles.advancedConfigButton}
            onClick={toggleAdvancedConfig}
          >
            Advanced Config
            <SvgIcon size="10px" isDefaultColor>
              {showAdvancedConfig ? <IconMinus /> : <IconPlus />}
            </SvgIcon>
          </button>
        </FormLabel>

        {showAdvancedConfig && (
          <div
            css={[
              styles.advancedConfig,
              showAdvancedConfig && styles.advancedConfigOpen,
            ]}
          >
            <FormLabel hint="Add IP addresses that are allowed/rejected">
              Firewall Rules
            </FormLabel>
            <NodeFirewallRules
              wrapperStyles={styles.firewall}
              rules={nodeLauncher.firewall}
              onFirewallChanged={handleFirewallChanged}
            />

            {sortedProperties?.map(
              (propertyGroup: NodePropertyGroup, index) => {
                const isRequired =
                  (propertyGroup.uiType === UiType.UI_TYPE_TEXT ||
                    propertyGroup.uiType === UiType.UI_TYPE_PASSWORD) &&
                  propertyGroup.value === '';

                return (
                  <Fragment key={propertyGroup.keyGroup! + index!}>
                    <FormLabel isCapitalized isRequired={isRequired}>
                      {propertyGroup.displayGroup ||
                        kebabToCapitalized(
                          propertyGroup.keyGroup || propertyGroup.key,
                        )}
                    </FormLabel>
                    {renderNodeConfigControl(
                      propertyGroup,
                      onNodeConfigPropertyChanged,
                    )}
                  </Fragment>
                );
              },
            )}
          </div>
        )}
      </div>
    </NodeLauncherPanel>
  );
};
