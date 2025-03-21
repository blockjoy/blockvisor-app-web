import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import isEqual from 'lodash/isEqual';
import { UiType } from '@modules/grpc/library/blockjoy/common/v1/protocol';
import {
  NodeFirewallRules,
  useNodeView,
  nodeAtoms,
  NodeConfig,
  LockedSwitch,
  NodePropertyGroup,
} from '@modules/node';
import { renderNodeConfigControl } from '@modules/node/utils/renderNodeConfigControl';
import {
  Button,
  ButtonGroup,
  DeleteModal,
  FormLabelCaps,
  sort,
  Switch,
} from '@shared/components';
import { styles } from './NodeViewConfig.styles';
import { kebabToCapitalized } from 'utils';
import {
  FirewallConfig,
  FirewallRule,
} from '@modules/grpc/library/blockjoy/common/v1/config';
import { authSelectors } from '@modules/auth';
import { escapeHtml } from '@shared/utils/escapeHtml';

export const NodeViewConfig = () => {
  const { node, nodeImage, isLoading, updateNode } = useNodeView();

  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);

  const [isConfirmingUpdate, setIsConfirmingUpdate] = useState(false);

  const [isLoadingConfig, setIsLoadingConfig] = useState(true);

  const [isSaving, setIsSaving] = useState(false);

  const [nodeConfig, setNodeConfig] = useRecoilState<NodeConfig | null>(
    nodeAtoms.nodeConfig,
  );

  const [originalPropertyValues, setOriginalPropertyValues] = useState<
    string[]
  >([]);

  const [originalFirewall, setOriginalFirewall] = useState<FirewallRule[]>([]);

  const sortedProperties: NodePropertyGroup[] = sort(
    nodeConfig?.properties ?? [],
    { field: 'key' },
  );

  const handlePropertyChanged = (
    key: string,
    keyGroup: string,
    value: string,
  ) => {
    const nextProperties = sortedProperties.map((property) =>
      property.key === key || property.keyGroup === keyGroup
        ? { ...property, key, value }
        : property,
    );

    setNodeConfig({
      ...nodeConfig!,
      properties: nextProperties,
    });
  };

  const handleFirewallChanged = (nextFirewall: FirewallRule[]) =>
    setNodeConfig({
      ...nodeConfig!,
      firewall: nextFirewall,
    });

  const handleAutoUpgradeChanged = (nextAutoUpgrade: boolean) => {
    setNodeConfig({
      ...nodeConfig!,
      autoUpgrade: nextAutoUpgrade,
    });
  };

  const handleUpdate = () => {
    if (isPropertiesDirty) {
      setIsConfirmingUpdate(!isConfirmingUpdate);
    } else {
      handleUpdateConfirm();
    }
  };

  const handleUpdateConfirm = async () => {
    if (!node?.config?.firewall) return;

    setIsSaving(true);

    const newFirewall: FirewallConfig = {
      ...node?.config?.firewall,
      rules: nodeConfig?.firewall!,
    };

    await updateNode(
      {
        nodeId: node?.nodeId!,
        autoUpgrade: nodeConfig?.autoUpgrade,
        newValues: sortedProperties.map((property) => ({
          key: property.key,
          value: property.value,
        })),
        newFirewall,
      },
      true,
    );

    setOriginalPropertyValues(
      sortedProperties.map((property) => property.value),
    );

    setIsSaving(false);

    setIsConfirmingUpdate(false);
  };

  const buildConfig = () => {
    if (!node) {
      setIsLoadingConfig(false);
      return;
    }

    const nextProperties = node.config?.image?.values?.map((property) => {
      const imageProperty = nodeImage?.properties.find(
        (p) => p.key === property.key,
      );

      const imageProperties = nodeImage?.properties.filter(
        (p) => p.keyGroup === imageProperty?.keyGroup,
      )!;

      return {
        key: property.key,
        value: property.value,
        keyGroup: imageProperty?.keyGroup || property.key,
        properties: imageProperties,
        uiType: imageProperty?.uiType!,
        displayName:
          imageProperty?.displayGroup! || imageProperty?.displayName!,
      };
    })!;

    setNodeConfig({
      ...nodeConfig!,
      properties: nextProperties,
      firewall: node.config?.firewall?.rules!,
      autoUpgrade: node.autoUpgrade,
    });

    setOriginalPropertyValues(nextProperties.map((p) => p.value));

    const firewallCopy = [...node.config?.firewall?.rules!];

    setOriginalFirewall(firewallCopy);

    setIsLoadingConfig(false);
  };

  useEffect(() => {
    if (nodeConfig) {
      setIsLoadingConfig(false);
      return;
    } else {
      buildConfig();
    }
  }, [node, nodeImage]);

  useEffect(() => {
    buildConfig();
  }, []);

  const editedValues = sort(
    !nodeConfig?.properties ? [] : nodeConfig?.properties.map((p) => p.value),
  );

  const isPropertiesDirty = !isEqual(
    sort(editedValues),
    sort(originalPropertyValues),
  );

  const isDirty =
    isPropertiesDirty ||
    !isEqual(nodeConfig?.firewall, originalFirewall) ||
    nodeConfig?.autoUpgrade !== node?.autoUpgrade;

  const isValid = nodeConfig?.properties?.every(
    (property) =>
      property.uiType === UiType.UI_TYPE_ENUM ||
      property.uiType === UiType.UI_TYPE_SWITCH ||
      ((property.uiType === UiType.UI_TYPE_TEXT ||
        property.uiType === UiType.UI_TYPE_PASSWORD) &&
        property.value),
  );

  return (isLoading && !node?.nodeId) || isLoadingConfig ? (
    <></>
  ) : (
    <>
      {isConfirmingUpdate && (
        <DeleteModal
          portalId="update-node-modal"
          elementName={escapeHtml(node?.displayName! || node?.nodeName!)}
          entityName="Node"
          type="Update"
          warningMessage="Warning: Updating node config properties will trigger a node restart."
          onHide={() => setIsConfirmingUpdate(false)}
          onSubmit={handleUpdateConfirm}
        />
      )}
      <div css={styles.wrapper}>
        <div css={styles.row}>
          <FormLabelCaps noBottomMargin>Auto Upgrade</FormLabelCaps>
          {isSuperUser ? (
            <Switch
              noBottomMargin
              checked={nodeConfig?.autoUpgrade}
              tooltip=""
              disabled={false}
              name="autoUpgrade"
              onChange={(name: string, value: boolean) =>
                handleAutoUpgradeChanged(value)
              }
            />
          ) : (
            <LockedSwitch isChecked={node!.autoUpgrade} />
          )}
        </div>

        <div css={styles.row}>
          <FormLabelCaps noBottomMargin>Firewall Rules</FormLabelCaps>
          <NodeFirewallRules
            onFirewallChanged={handleFirewallChanged}
            rules={nodeConfig?.firewall}
          />
        </div>

        {sortedProperties.map((propertyGroup) => {
          const displayName =
            (propertyGroup.uiType !== UiType.UI_TYPE_ENUM &&
              propertyGroup.properties?.[0].displayName) ||
            propertyGroup.displayGroup ||
            kebabToCapitalized(propertyGroup.keyGroup || propertyGroup.key);

          return (
            <div css={styles.row} key={propertyGroup.keyGroup}>
              <FormLabelCaps noBottomMargin>{displayName}</FormLabelCaps>
              {renderNodeConfigControl(
                propertyGroup,
                handlePropertyChanged,
                true,
              )}
            </div>
          );
        })}

        <ButtonGroup>
          <Button
            size="small"
            loading={isSaving}
            disabled={!isDirty || !isValid || isSaving}
            onClick={handleUpdate}
          >
            Update
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
};
