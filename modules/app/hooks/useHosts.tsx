import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { formatDistanceToNow } from 'date-fns';
import { appState } from '@modules/app/store';
import { layoutState } from '@modules/layout/store';
import { useEffect, useState } from 'react';
import { HostStatus } from '@modules/app/components/host/HostStatus';
import { Header, Row } from '@modules/app/components/shared/table/Table';
import { TableBlockHosts, TableSortButton } from '../components/shared';

interface State {
  rows?: Row[];
  headers?: Header[];
}

interface Hook extends State {
  loadHosts: () => void;
  handleAddHost: () => void;
  handleRowClick: (args1: any) => void;
}

export const useHosts = (): Hook => {
  const router = useRouter();

  const [state, setState] = useState<State>({
    rows: [],
    headers: [],
  });

  const { rows } = state;

  const [app, setApp] = useRecoilState(appState);
  const [layout, setLayout] = useRecoilState(layoutState);

  const { grpcClient, hosts, hostsSortExpression } = app;

  const handleSort = (hostsSortExpression: string) => {
    setApp({
      ...app,
      hostsSortExpression,
      hostsSorting: true,
    });
    setTimeout(() => {
      setApp({
        ...app,
        hostsSortExpression,
        hostsSorting: false,
      });
    }, 600);
  };

  const handleAddHost = () => {
    setLayout({
      ...layout,
      isHostsAddOpen: true,
    });
  };

  const handleRowClick = (args: any) => {
    router.push(`${router.pathname}/${args.key}`);
  };

  const headers = [
    {
      name: 'Name',
      width: '100px',
      key: '1',
      component: (
        <TableSortButton
          onClick={handleSort}
          sortExpression={hostsSortExpression}
        >
          name
        </TableSortButton>
      ),
    },
    {
      name: 'Added',
      width: '100px',
      key: '2',
      isHiddenOnMobile: true,
      component: (
        <TableSortButton
          onClick={handleSort}
          sortExpression={hostsSortExpression}
        >
          added
        </TableSortButton>
      ),
    },
    {
      name: 'Status',
      width: '100px',
      key: '3',
      component: (
        <TableSortButton
          onClick={handleSort}
          sortExpression={hostsSortExpression}
        >
          status
        </TableSortButton>
      ),
    },
  ];

  const loadHosts = async () => {
    setApp({
      ...app,
      hostsLoading: true,
    });
    const hosts: any = await grpcClient.getHosts();
    setApp({
      ...app,
      hosts,
      hostsLoading: false,
    });
  };

  useEffect(() => {
    if (hosts?.length) {
      console.log('hosts', hosts);
      const rows = hosts.map((host: any) => ({
        key: host.id.value,
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
              <span>
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

      setState({
        rows,
      });
    }
  }, [hosts?.length]);

  return {
    loadHosts,
    handleAddHost,
    handleRowClick,
    headers,
    rows,
  };
};
