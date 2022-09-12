import { appState } from '@modules/app/store';
import { Button } from '@shared/components';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { PageHeader, PageSection, Table } from '../shared';
import { useHosts } from '@modules/app/hooks/useHosts';

export type Host = {
  id: string;
  name: string;
  address: string;
  location: string;
  status: string;
};

export const Hosts = () => {
  const { hostsLoading } = useRecoilValue(appState);

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
        isLoading={hostsLoading}
        headers={headers}
        rows={rows}
        onRowClick={handleRowClick}
      />
    </PageSection>
  );
};
