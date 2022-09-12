import styled from '@emotion/styled';

import { appState } from '@modules/app/store';
import { layoutState } from '@modules/layout/store';
import { Button } from '@shared/components';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { PageHeader, PageSection, Table } from '../shared';
import { mockHosts } from './mockData';
import { HostsSortButton } from './shared';
import HostsTableBlock from './shared/HostsTableBlock';

export type Host = {
  id: string;
  name: string;
  address: string;
  location: string;
  status: string;
};

export const Hosts = () => {
  const { hostsLoading, hostsSorting } = useRecoilValue(appState);

  const { loadHosts, handleRowClick, handleAddHost, headers, rows } =
    useHosts();

  useEffect(() => {
    loadHosts();
  }, []);

  return (
    <PageSection>
      <PageHeader>
        Hosts
        <Button onClick={handleAddHost} size="small">
          Add Host
        </Button>
      </PageHeader>
      <Table
        isSorting={hostsSorting}
        isLoading={hostsLoading}
        headers={headers}
        rows={rows}
        onRowClick={handleRowClick}
      />
    </PageSection>
  );
};
