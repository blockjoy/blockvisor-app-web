import {
  Node,
  NodeProperty,
  NodeType,
  UiType,
} from '@modules/grpc/library/blockjoy/v1/node';
import { Copy } from '@shared/components';
import { escapeHtml } from '@shared/utils/escapeHtml';
import { LockedSwitch, NodeTypeConfigLabel } from '../components/Shared';
import { blockchainPortList } from '@shared/constants/lookups';

const formatter = new Intl.DateTimeFormat('en-US');

export const mapNodeToDetails = (node: Node) => {
  if (!node?.nodeType) return [];

  /**TODO: remove the mocked data to real data*/
  const nodeUrl = `http://${node.ip}:${
    blockchainPortList.find(
      (p) => p.name === node.blockchainName.toLocaleLowerCase(),
    )?.port
  }`;

  const details: {
    label: string | any;
    data: any | undefined;
  }[] = [
    { label: 'Node Address', data: node.address || '-' },
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

  /** Validators should have no url*/
  if (node.nodeType !== NodeType.NODE_TYPE_VALIDATOR) {
    details.unshift({
      label: 'RPC URL',
      data:
        (
          <>
            <a target="_blank" rel="noopener noreferrer" href={nodeUrl}>
              {nodeUrl}
            </a>
            <Copy value="https://blockjoy.com/" />
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
