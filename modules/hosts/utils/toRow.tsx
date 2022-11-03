import {
  Button,
  HostStatus,
  TableBlockHosts,
  TableBlockNodes,
} from '@shared/components';
import { formatDistanceToNow } from 'date-fns';
import { MouseEventHandler } from 'react';
import { styles as detailsHeaderStyles } from '@shared/components/DetailsHeader/DetailsHeader.styles';
import { NodeStatus } from '@modules/node';

export function hostsToRows(hosts: Host[] | null) {
  return hosts?.map((host: any) => ({
    key: host.id,
    cells: [
      {
        key: '1',
        component: (
          <>
            <TableBlockHosts
              location={host.location}
              name={host.name}
              address={host.address}
            />
          </>
        ),
      },
      {
        key: '2',
        component: (
          <span style={{ fontSize: '14px' }}>
            {formatDistanceToNow(new Date(host.created_at_datetime), {
              addSuffix: true,
            })}
          </span>
        ),
      },
      {
        key: '3',
        component: <HostStatus status={host.status} />,
      },
    ],
  }));
}

export function nodeListToRow(
  host: Host | null,
  stopNode: MouseEventHandler<HTMLButtonElement>,
  restartNode: MouseEventHandler<HTMLButtonElement>,
) {
  return host?.nodesList?.map((node: any) => ({
    key: node.id,
    cells: [
      {
        key: '1',
        component: (
          <>
            <TableBlockNodes
              id={node.id}
              name={node.name}
              address={node.address}
            />
          </>
        ),
      },
      {
        key: '2',
        component: <NodeStatus status={node.status} />,
      },
      {
        key: '3',
        component: (
          <span className="show-on-hover" css={detailsHeaderStyles.actions}>
            <Button
              id={host.id}
              onClick={stopNode}
              type="button"
              size="small"
              style="secondary"
            >
              Stop
            </Button>
            <Button
              id={host.id}
              onClick={restartNode}
              type="button"
              size="small"
              style="secondary"
            >
              Restart
            </Button>
          </span>
        ),
      },
    ],
  }));
}
