import { formatDistanceToNow } from 'date-fns';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { HostStatus, TableBlock } from '@shared/components';

export const mapHostListToRows = (hostList?: Host[]) => {
  const headers: TableHeader[] = [
    {
      name: 'Name',
      key: '1',
      width: '300px',
    },
    {
      name: 'Added',
      key: '2',
      width: '200px',
    },
    {
      name: 'Status',
      key: '3',
      width: '200px',
    },
  ];

  const rows = hostList?.map((host: Host) => ({
    key: host?.id,
    cells: [
      {
        key: '1',
        component: (
          <>
            <TableBlock name={host.name} address={host?.ip!} />
          </>
        ),
      },
      {
        key: '2',
        component: (
          <span style={{ fontSize: '14px', whiteSpace: 'nowrap' }}>
            {formatDistanceToNow(new Date(host.createdAt!), {
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

  return {
    rows,
    headers,
  };
};
