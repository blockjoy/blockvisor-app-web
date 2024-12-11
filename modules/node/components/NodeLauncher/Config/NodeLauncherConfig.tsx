import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import { renderControls } from '@modules/node/utils/renderNodeLauncherConfigControls';
import { ProtocolVersion } from '@modules/grpc/library/blockjoy/v1/protocol';
import { FormLabel, FormHeader } from '@shared/components';
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
  onVersionChanged: (version: ProtocolVersion | null) => void;
  onVariantChanged: (variant: string) => void;
};

export const NodeLauncherConfig = ({
  onNodeConfigPropertyChanged,
  onNodePropertyChanged,
  onVersionChanged,
  onVariantChanged,
}: NodeLauncherConfigProps) => {
  const nodeLauncher = useRecoilValue(nodeLauncherAtoms.nodeLauncher);

  const { properties } = nodeLauncher;

  const handleFirewallChanged = (nextFirewall: FirewallRule[]) =>
    onNodePropertyChanged('firewall', nextFirewall);

  return (
    <NodeLauncherPanel>
      <div css={styles.wrapper}>
        <FormHeader>Config</FormHeader>

        <FormLabel>Version</FormLabel>
        <NodeVersionSelect onVersionChanged={onVersionChanged} />

        <FormLabel>Variant</FormLabel>
        <NodeVariantSelect onChange={onVariantChanged} />

        <FormLabel hint="Add IP addresses that are allowed/denied">
          Firewall Rules
        </FormLabel>
        <NodeFirewallRules
          rules={nodeLauncher.firewall}
          onFirewallChanged={handleFirewallChanged}
        />

        {properties?.map((propertyGroup: NodePropertyGroup, index) => {
          const isRequired =
            (propertyGroup.uiType === UiType.UI_TYPE_TEXT ||
              propertyGroup.uiType === UiType.UI_TYPE_PASSWORD) &&
            propertyGroup.value === '';

          return (
            <Fragment key={propertyGroup.keyGroup! + index!}>
              <FormLabel isRequired={isRequired}>
                {kebabToCapitalized(
                  propertyGroup.keyGroup || propertyGroup.key,
                )}
              </FormLabel>
              {renderControls(propertyGroup, onNodeConfigPropertyChanged)}
            </Fragment>
          );
        })}
      </div>
    </NodeLauncherPanel>
  );
};
