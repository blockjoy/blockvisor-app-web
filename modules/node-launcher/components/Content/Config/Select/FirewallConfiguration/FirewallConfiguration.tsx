import { FirewallRule } from '@modules/grpc/library/blockjoy/common/v1/config';
import { UiType } from '@modules/grpc/library/blockjoy/common/v1/protocol';
import { NodeFirewallRules } from '@modules/node';
import { nodeLauncherAtoms } from '@modules/node-launcher/store/nodeLauncherAtoms';
import { handleNodeConfigProperties } from '@modules/node-launcher/utils/handlers';
import { NodePropertyGroup } from '@modules/node/types/common';
import { renderNodeConfigControl } from '@modules/node/utils/renderNodeConfigControl';
import { Checkbox, FormLabel, sort } from '@shared/components';
import { Fragment, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { kebabToCapitalized } from 'utils/kebabToCapitalized';
import { styles } from './FirewallConfiguration.styles';

export const FirewallConfiguration = () => {
  const [isDefault, setIsDefault] = useState(true);
  const [properties, setProperties] = useRecoilState(
    nodeLauncherAtoms.properties,
  );
  const [firewall, setFirewall] = useRecoilState(nodeLauncherAtoms.firewall);
  const setError = useSetRecoilState(nodeLauncherAtoms.error);

  const handleProperties = (
    key: string,
    keyGroup: string,
    value: boolean | string,
  ) => {
    handleNodeConfigProperties(
      properties,
      (nextProperties) => {
        if (!nextProperties?.length) return;
        setProperties(nextProperties);
      },
      () => {
        setError(null);
      },
    )(key, keyGroup, value);
  };

  const handleFirewall = (nextFirewall: FirewallRule[]) => {
    setFirewall(nextFirewall);
  };

  const sortedProperties = sort(properties ?? [], { field: 'key' });

  console.log('FIREWALL NEW', firewall);

  const handleDefault = () => setIsDefault(!isDefault);

  return (
    <>
      <FormLabel>
        <button css={styles.button} onClick={handleDefault}>
          <Checkbox name="showAdvancedConfig" checked={isDefault} />
          Use default configuration
        </button>
      </FormLabel>
      {!isDefault && (
        <div
          css={[styles.advancedConfig, !isDefault && styles.advancedConfigOpen]}
        >
          <FormLabel hint="Add IP addresses that are allowed/rejected">
            Firewall Rules
          </FormLabel>
          <NodeFirewallRules
            wrapperStyles={styles.firewall}
            rules={firewall}
            onFirewallChanged={handleFirewall}
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
                    kebabToCapitalized(
                      propertyGroup.keyGroup || propertyGroup.key,
                    )}
                </FormLabel>
                {renderNodeConfigControl(propertyGroup, handleProperties)}
              </Fragment>
            );
          })}
        </div>
      )}
    </>
  );
};
