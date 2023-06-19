import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { HostIcon, HostOs, HostStatus, TableBlock } from '@shared/components';

export const mapHostListToRows = (hostList?: Host[]) => {
  const headers: TableHeader[] = [
    {
      name: '',
      key: '1',
      width: '40px',
      minWidth: '60px',
      maxWidth: '100px',
    },
    {
      name: 'Name',
      key: '2',
      width: '300px',
    },
    {
      name: 'Version',
      key: '3',
      width: '200px',
    },
    {
      name: 'Status',
      key: '4',
      width: '200px',
    },
  ];

  const rows = hostList?.map((host: Host) => ({
    key: host?.id,
    cells: [
      {
        key: '1',
        component: <HostIcon />,
      },
      {
        key: '2',
        component: (
          <TableBlock
            name={host.name}
            address={<HostOs os={host.os} osVersion={host.osVersion} />}
          />
        ),
      },
      {
        key: '3',
        component: <>{host.version}</>,
      },
      {
        key: '4',
        component: <HostStatus status={host.status} />,
      },
    ],
  }));

  return {
    rows,
    headers,
  };
};
