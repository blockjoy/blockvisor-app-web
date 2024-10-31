import { Host, HostSortField } from '@modules/grpc/library/blockjoy/v1/host';
import {
  HostIcon,
  HostIpStatus,
  HostManagedBy,
  TableBlock,
} from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';

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
      name: 'Host',
      key: '2',
      width: '300px',
      dataField: HostSortField.HOST_SORT_FIELD_HOST_NAME,
    },
    {
      name: 'Version',
      key: '3',
      width: '200px',
    },
    {
      name: 'Managed By',
      key: '4',
      width: '200px',
    },
  ];

  const rows = hostList?.map((host: Host) => ({
    key: host?.id,
    cells: [
      {
        key: '1',
        component: <HostIcon size="20px" />,
      },
      {
        key: '2',
        component: (
          <TableBlock
            topRow={host.name}
            middleRow={
              <div css={spacing.top.small}>
                <HostIpStatus ipAddresses={host.ipAddresses} />
              </div>
            }
          />
        ),
      },
      {
        key: '3',
        component: <>{host.version}</>,
      },
      {
        key: '4',
        component: <HostManagedBy managedBy={host.managedBy} />,
      },
    ],
  }));

  return {
    rows,
    headers,
  };
};
