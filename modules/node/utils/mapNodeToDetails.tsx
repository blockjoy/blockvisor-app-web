import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { Copy } from '@shared/components';
import { styles } from '@shared/components/Buttons/NextLink/NextLink.styles';
import { getNodeRpcUrl } from './getNodeRpcUrl';

export const mapNodeToDetails = (node: Node) => {
  const rpcUrl = getNodeRpcUrl(node.dnsName);

  const nodeType = node.versionMetadata.find(
    (m) => m.metadataKey === 'node-type',
  )?.value;

  const network = node.versionMetadata.find(
    (m) => m.metadataKey === 'network',
  )?.value;

  const client = node.versionMetadata.find(
    (m) => m.metadataKey === 'client',
  )?.value;

  const details: {
    label: string | any;
    data: any | undefined;
  }[] = [
    {
      label: 'Version',
      data: node.semanticVersion || 'Latest',
    },
  ];

  if (client) {
    details.unshift({
      label: 'Client',
      data: client,
    });
  }

  if (network) {
    details.unshift({
      label: 'Network',
      data: network,
    });
  }

  if (nodeType) {
    details.unshift({
      label: 'Node Type',
      data: nodeType,
    });
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

  return details;
};
