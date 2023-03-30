import { escapeHtml } from '@shared/utils/escapeHtml';
import { NodeTypeConfigLabel, LockedSwitch } from '@shared/components';
import { BlockjoyNode } from 'types/Node';
import { ReactNode } from 'react';

export const mapNodeConfigToDetails = (node: BlockjoyNode) => {
  console.log('mapNodeConfigToDetails', node);

  if (!node?.type) {
    return [];
  }

  const details: {
    id: string;
    label: string | ReactNode;
    data: any | undefined;
  }[] = node.propertiesList
    ?.filter(
      (property: any) =>
        property.uiType !== 'key-upload' && !property.uiType.includes('pwd'),
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
