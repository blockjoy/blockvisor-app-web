import { escapeHtml } from '@shared/utils/escapeHtml';
import { NodeTypeConfigLabel, LockedSwitch } from '@shared/components';
import { ReactNode } from 'react';
import {
  Node,
  NodeProperty,
  UiType,
} from '@modules/grpc/library/blockjoy/v1/node';

export const mapNodeConfigToDetails = (node: Node) => {
  if (!node?.nodeType) return [];

  const details: {
    id: string;
    label: string | ReactNode;
    data: any | undefined;
  }[] = node.properties
    ?.filter(
      (property: NodeProperty) =>
        property.uiType !== UiType.UI_TYPE_FILE_UPLOAD &&
        property.uiType !== UiType.UI_TYPE_PASSWORD,
    )
    .map((property: any) => ({
      id: property.name,
      label: <NodeTypeConfigLabel>{property.name}</NodeTypeConfigLabel>,
      data:
        property.value === 'null' ? (
          '-'
        ) : property.uiType === 'switch' ? (
          <LockedSwitch
            tooltip="You will be able to enable Self Hosting after BETA."
            isChecked={property.value === 'true' ? true : false}
          />
        ) : (
          escapeHtml(property.value)
        ),
    }));

  details.unshift({
    id: 'auto-updates',
    label: <>AUTO UPDATES</>,
    data: <LockedSwitch />,
  });

  details.unshift({
    id: 'network',
    label: <>NETWORK</>,
    data: node.network || '-',
  });

  return details;
};
