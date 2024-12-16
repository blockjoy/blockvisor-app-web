import { capitalized } from '@modules/admin';
import {
  FirewallAction,
  FirewallDirection,
  ImagePropertyValue,
} from '@modules/grpc/library/blockjoy/common/v1/config';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { Copy } from '@shared/components';
import { styles } from '@shared/components/Buttons/NextLink/NextLink.styles';
import { escapeHtml } from '@shared/utils/escapeHtml';
import { spacing } from 'styles/utils.spacing.styles';
import { getNameFromEnum } from 'utils/getNameFromEnum';

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

  return details;
};
