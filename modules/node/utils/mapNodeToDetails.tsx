import {
  Node,
  NodeProperty,
  NodeType,
  UiType,
} from '@modules/grpc/library/blockjoy/v1/node';
import { Copy } from '@shared/components';
import { escapeHtml } from '@shared/utils/escapeHtml';
import { LockedSwitch, NodeTypeConfigLabel } from '../components/Shared';

export const mapNodeToDetails = (node: Node) => {
  if (!node?.nodeType) return [];

  const nodeUrl = `http://${node.name}.n0des.xyz`;

  const details: {
    label: string | any;
    data: any | undefined;
  }[] = [
    { label: 'IP Address', data: node.ip || '-' },
    { label: 'Gateway IP', data: node.ipGateway || '-' },
    {
      label: 'Version',
      data: node.version || 'Latest',
    },
    {
      label: 'Network',
      data: node.network || '-',
    },
  ];

  if (node.address) {
    details.unshift({ label: 'Node Address', data: node.address || '-' });
  }

  if (node.nodeType !== NodeType.NODE_TYPE_VALIDATOR) {
    details.unshift({
      label: 'RPC URL',
      data:
        (
          <>
            <a target="_blank" rel="noopener noreferrer" href={nodeUrl}>
              {nodeUrl}
            </a>
            <Copy value={nodeUrl} />
          </>
        ) || '-',
    });
  }

  details.push(
    ...node.properties
      ?.filter(
        (property: NodeProperty) =>
          property.uiType !== UiType.UI_TYPE_FILE_UPLOAD &&
          property.uiType !== UiType.UI_TYPE_PASSWORD,
      )
      .map((property: NodeProperty) => ({
        label: <>{property.displayName}</>,
        data:
          property.uiType === UiType.UI_TYPE_SWITCH ? (
            <LockedSwitch
              tooltip="Feature disabled during beta."
              isChecked={property.value === 'true' ? true : false}
            />
          ) : property.value === 'null' ? (
            ''
          ) : (
            escapeHtml(property.value!)
          ),
      })),
  );

  return details;
};
