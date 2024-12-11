import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue } from 'recoil';
import isEqual from 'lodash/isEqual';
import { authSelectors } from '@modules/auth';
import { UiType } from '@modules/grpc/library/blockjoy/common/v1/protocol';
import {
  NodeFirewallRules,
  useNodeView,
  nodeAtoms,
  NodeConfig,
} from '@modules/node';
import { renderControls } from '@modules/node/utils/renderNodeLauncherConfigControls';
import {
  Button,
  ButtonGroup,
  FormLabelCaps,
  TableSkeleton,
} from '@shared/components';
import { styles } from './NodeViewConfig.styles';
import { kebabToCapitalized } from 'utils';
import { FirewallRule } from '@modules/grpc/library/blockjoy/common/v1/config';

export const NodeViewConfig = () => {
  const { node, nodeImage, isLoading, updateNode } = useNodeView();

  const [nodeConfig, setNodeConfig] = useRecoilState<NodeConfig>(
    nodeAtoms.nodeConfig,
  );

  const [originalPropertyValues, setOriginalPropertyValues] = useState<
    string[]
  >([]);

  const { properties } = nodeConfig;

  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);

  useEffect(() => {
    if (!nodeImage || !node) return;

    const nextProperties = node.config?.image?.values?.map((property) => {
      const imageProperty = nodeImage.properties.find(
        (p) => p.key === property.key,
      );

      const imageProperties = nodeImage.properties.filter(
        (p) => p.keyGroup === imageProperty?.keyGroup,
      );

      return {
        key: property.key,
        value: property.value,
        keyGroup: imageProperty?.keyGroup || property.key,
        properties: imageProperties,
        uiType: imageProperty?.uiType!,
      };
    })!;

    setNodeConfig({
      ...nodeConfig,
      properties: nextProperties,
    });

    setOriginalPropertyValues(nextProperties.map((p) => p.value));
  }, [node, nodeImage]);

  const handlePropertyChanged = (
    key: string,
    keyGroup: string,
    value: string,
  ) => {
    const nextProperties = nodeConfig.properties.map((property) =>
      property.key === key || property.keyGroup === keyGroup
        ? { ...property, key, value }
        : property,
    );

    setNodeConfig({
      ...nodeConfig,
      properties: nextProperties,
    });
  };

  const handleFirewallChanged = (nextFirewall: FirewallRule[]) => {
    setNodeConfig({
      ...nodeConfig,
      firewall: nextFirewall,
    });
  };

  const handleSave = async () => {
    await updateNode({
      nodeId: node?.nodeId!,
      newValues: nodeConfig.properties.map((property) => ({
        key: property.key,
        value: property.value,
      })),
    });

    toast.success('Node Updated');
  };

  const editedValues = nodeConfig.properties.map((p) => p.value);

  const isDirty = !isEqual(editedValues, originalPropertyValues);

  const isValid = nodeConfig.properties.every(
    (property) =>
      property.uiType === UiType.UI_TYPE_TEXT ||
      property.uiType === UiType.UI_TYPE_PASSWORD ||
      property.value,
  );

  return isLoading && !node?.nodeId ? (
    <TableSkeleton />
  ) : (
    <div css={styles.wrapper}>
      {properties.map((propertyGroup) => (
        <div css={styles.row} key={propertyGroup.keyGroup}>
          <FormLabelCaps noBottomMargin>
            {kebabToCapitalized(propertyGroup.keyGroup || propertyGroup.key)}
          </FormLabelCaps>
          {renderControls(propertyGroup, handlePropertyChanged, true)}
        </div>
      ))}

      {/* 
      <div css={styles.row}>
        <FormLabelCaps noBottomMargin>Firewall Rules</FormLabelCaps>
        <NodeFirewallRules />
      </div> */}

      <ButtonGroup>
        <Button
          loading={isLoading}
          disabled={!isDirty || !isValid}
          onClick={handleSave}
        >
          Save
        </Button>
      </ButtonGroup>
    </div>
  );
};
