import {
  NodeType,
  UiType,
} from '@modules/grpc/library/blockjoy/common/v1/node';
import { Node, NodeProperty } from '@modules/grpc/library/blockjoy/v1/node';
import { Copy, NodeFirewall } from '@shared/components';
import { escapeHtml } from '@shared/utils/escapeHtml';
import { LockedSwitch } from '../components/Shared';
import { styles } from '@shared/components/Buttons/NextLink/NextLink.styles';
import { convertNodeTypeToName } from '@modules/node';
import { capitalize } from 'utils/capitalize';

export const mapNodeToDetails = (node: Node) => {
  if (!node?.nodeType) return [];

  const rpcUrl = `http://${node.url}`;

  const details: {
    label: string | any;
    data: any | undefined;
  }[] = [
    { label: 'IP Address', data: node.ip || '-' },
    { label: 'Gateway IP', data: node.ipGateway || '-' },
    {
      label: 'Type',
      data: capitalize(convertNodeTypeToName(node.nodeType)) || '-',
    },
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
            <a
              css={styles.link}
              target="_blank"
              rel="noopener noreferrer"
              href={rpcUrl}
            >
              {rpcUrl}

              <span css={styles.copyButton}>
                <Copy value={rpcUrl} />
              </span>
            </a>
          </>
        ) || '-',
    });
  }

  if (node.allowIps.length || node.denyIps.length) {
    details.push({
      label: 'Firewall Rules',
      data: <NodeFirewall allowIps={node.allowIps} denyIps={node.denyIps} />,
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
