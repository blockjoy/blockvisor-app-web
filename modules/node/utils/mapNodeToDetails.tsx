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

  /** Validators should have no addreess*/
  /**TODO: remove the mocked data to - */
  const nodeUrl =
    node.address && node.nodeType !== 3
      ? node.address
      : `https://${node.ip}/node`;

  const details: {
    label: string | any;
    data: any | undefined;
    hasCopy?: boolean;
    isHyperlink?: boolean;
  }[] = [
    { label: 'IP Address', data: node.ip || '-' },
    { label: 'Node Address', data: nodeUrl, hasCopy: true, isHyperlink: true },
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
