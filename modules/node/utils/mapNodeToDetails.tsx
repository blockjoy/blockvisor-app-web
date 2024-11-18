import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { Copy } from '@shared/components';
import { styles } from '@shared/components/Buttons/NextLink/NextLink.styles';

export const mapNodeToDetails = (node: Node) => {
  const rpcUrl = `http://${node.dnsUrl}`;

  const details: {
    label: string | any;
    data: any | undefined;
  }[] = [
    { label: 'IP Address', data: node.ipAddress || '-' },
    { label: 'Gateway IP', data: node.ipGateway || '-' },
    {
      label: 'Version',
      data: node.semanticVersion || 'Latest',
    },
    {
      label: 'Network',
      data: node.hostNetworkName || '-',
    },
  ];

  if (node.p2pAddress) {
    details.unshift({ label: 'P2P Address', data: node.p2pAddress || '-' });
  }

  if (rpcUrl) {
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

  // TODO: implement new node firewall rules
  // if (node.length || node.denyIps.length) {
  //   details.push({
  //     label: 'Firewall Rules',
  //     data: <NodeFirewall allowIps={node.allowIps} denyIps={node.denyIps} />,
  //   });
  // }

  // TODO: node.properties are missing
  // details.push(
  //   ...node.properties
  //     ?.filter(
  //       (property: NodeProperty) =>
  //         property.uiType !== UiType.UI_TYPE_FILE_UPLOAD &&
  //         property.uiType !== UiType.UI_TYPE_PASSWORD,
  //     )
  //     .map((property: NodeProperty) => ({
  //       label: <>{property.displayName}</>,
  //       data:
  //         property.uiType === UiType.UI_TYPE_SWITCH ? (
  //           <LockedSwitch
  //             isChecked={property.value === 'true' ? true : false}
  //           />
  //         ) : property.value === 'null' ? (
  //           ''
  //         ) : (
  //           escapeHtml(property.value!)
  //         ),
  //     })),
  // );

  return details;
};
