import {
  Node,
  NodeProperty,
  UiType,
} from '@modules/grpc/library/blockjoy/v1/node';
import { escapeHtml } from '@shared/utils/escapeHtml';
import { LockedSwitch, NodeTypeConfigLabel } from '../components/Shared';

const formatter = new Intl.DateTimeFormat('en-US');

export const mapNodeToDetails = (node: Node) => {
  if (!node?.nodeType) return [];

  console.log(node);

  /** Validators should have no addreess*/
  const nodeUrl =
    node.ip && node.ip && node.nodeType !== 3
      ? `https://${node.ip}/nodes/${node.id}`
      : '-';

  const details: {
    label: string | any;
    data: any | undefined;
    hasCopy?: boolean;
  }[] = [
    { label: 'IP Address', data: node.ip || '-' },
    { label: 'Node Url', data: nodeUrl, hasCopy: true },
    {
      label: 'Version',
      data: node.version || 'Latest',
    },
    {
      label: 'Network',
      data: node.network || '-',
    },
  ];

  details.push(
    ...node.properties
      ?.filter(
        (property: NodeProperty) =>
          property.uiType !== UiType.UI_TYPE_FILE_UPLOAD &&
          property.uiType !== UiType.UI_TYPE_PASSWORD,
      )
      .map((property: NodeProperty) => ({
        label: <NodeTypeConfigLabel>{property.name}</NodeTypeConfigLabel>,
        data:
          property.value === 'null' ? (
            '-'
          ) : property.uiType === UiType.UI_TYPE_SWITCH ? (
            <LockedSwitch
              tooltip="You will be able to enable Self Hosting after BETA."
              isChecked={property.value === 'true' ? true : false}
            />
          ) : (
            escapeHtml(property.value!)
          ),
      })),
  );

  return details;
};
