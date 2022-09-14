import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { formatDistanceToNow } from 'date-fns';
import { appState } from '@modules/app/store';
import { layoutState } from '@modules/layout/store';
import { useEffect, useState } from 'react';
import { HostStatus } from '@modules/app/components/shared/host-status/HostStatus';
import { Header, Row } from '@modules/app/components/shared/table/Table';
import { TableBlockHosts, TableSortButton } from '../components/shared';
import { apiClient } from '@modules/client';

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

  const { hosts } = app;

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
      key: '1',
    },
    {
      name: 'Added',
      key: '2',
      isHiddenOnMobile: true,
    },
    {
      name: 'Status',
      key: '3',
    },
  ];

  const loadHosts = async () => {
    setApp({
      ...app,
      hostsLoading: true,
    });
    const hosts: any = await apiClient.getHosts();
    setApp({
      ...app,
      hosts,
      hostsLoading: false,
    });
  };

  useEffect(() => {
    if (hosts?.length) {
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
