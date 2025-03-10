import { authSelectors } from '@modules/auth';
import { FirewallRule } from '@modules/grpc/library/blockjoy/common/v1/config';
import { UiType } from '@modules/grpc/library/blockjoy/common/v1/protocol';
import { ProtocolVersion } from '@modules/grpc/library/blockjoy/v1/protocol';
import {
  NodeFirewallRules,
  nodeLauncherAtoms,
  NodeVariantSelect,
  NodeVersionSelect,
} from '@modules/node';
import {
  NodeLauncherState,
  NodePropertyGroup,
} from '@modules/node/types/common';
import { renderNodeConfigControl } from '@modules/node/utils/renderNodeConfigControl';
import { FormLabel, sort } from '@shared/components';
import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import { kebabToCapitalized } from 'utils/kebabToCapitalized';
import { styles } from './NodeLauncherConfigAdvanced.styles';

type Props = {
  isOpen?: boolean;
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

export const NodeLauncherConfigAdvanced = ({
  isOpen,
  onNodeConfigPropertyChanged,
  onNodePropertyChanged,
  onVersionChanged,
  onVariantChanged,
}: Props) => {
  const nodeLauncher = useRecoilValue(nodeLauncherAtoms.nodeLauncher);

  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);

  const { properties, firewall } = nodeLauncher;

  const handleFirewallChanged = (nextFirewall: FirewallRule[]) =>
    onNodePropertyChanged('firewall', nextFirewall);

  const sortedProperties = sort(properties ?? [], { field: 'key' });

  return (
    <div css={[styles.advancedConfig, isOpen && styles.advancedConfigOpen]}>
      {isSuperUser && (
        <>
          <FormLabel>Variant</FormLabel>
          <NodeVariantSelect onVariantChanged={onVariantChanged} />

          <FormLabel>Version</FormLabel>
          <NodeVersionSelect onVersionChanged={onVersionChanged} />
        </>
      )}
      <FormLabel hint="Add IP addresses that are allowed/rejected">
        Firewall Rules
      </FormLabel>
      <NodeFirewallRules
        wrapperStyles={styles.firewall}
        rules={firewall}
        onFirewallChanged={handleFirewallChanged}
      />

      {sortedProperties?.map((propertyGroup: NodePropertyGroup, index) => {
        const isRequired =
          (propertyGroup.uiType === UiType.UI_TYPE_TEXT ||
            propertyGroup.uiType === UiType.UI_TYPE_PASSWORD) &&
          propertyGroup.value === '';

        return (
          <Fragment key={propertyGroup.keyGroup! + index!}>
            <FormLabel isCapitalized isRequired={isRequired}>
              {propertyGroup.displayGroup ||
                kebabToCapitalized(propertyGroup.keyGroup || propertyGroup.key)}
            </FormLabel>
            {renderNodeConfigControl(
              propertyGroup,
              onNodeConfigPropertyChanged,
            )}
          </Fragment>
        );
      })}
    </div>
  );
};
