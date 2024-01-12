import { escapeHtml } from '@shared/utils/escapeHtml';
import { NodeTypeConfigLabel, LockedSwitch } from '@modules/node';
import { ReactNode } from 'react';
import { Node, NodeProperty } from '@modules/grpc/library/blockjoy/v1/node';
import { UiType } from '@modules/grpc/library/blockjoy/common/v1/node';

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
    .map((property: NodeProperty) => ({
      id: property.name,
      label: <NodeTypeConfigLabel>{property.name}</NodeTypeConfigLabel>,
      data:
        property.value === 'null' ? (
          '-'
        ) : property.uiType === UiType.UI_TYPE_SWITCH ? (
          <LockedSwitch
            tooltip="Feature disabled during beta."
            isChecked={property.value === 'true' ? true : false}
          />
        ) : (
          escapeHtml(property.value!)
        ),
    }));

  return details;
};
