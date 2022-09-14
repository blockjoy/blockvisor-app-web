import { appState } from '@modules/app/store';
import { Button } from '@shared/components';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { PageHeader, PageSection, Table } from '../shared';
import { useHosts } from '@modules/app/hooks/useHosts';
import { layoutState } from '@modules/layout/store/layoutAtoms';

export type Host = {
  id: string;
  name: string;
  address: string;
  location: string;
  status: string;
};

export const Hosts = () => {
  const { hostsLoading } = useRecoilValue(appState);
  const setLayoutState = useSetRecoilState(layoutState);

  const { loadHosts, handleRowClick, headers, rows } = useHosts();

  useEffect(() => {
    window.scrollTo(0, 0);
    loadHosts();
  }, []);

  return (
    <PageSection>
      <PageHeader>
        Hosts
        <Button onClick={() => setLayoutState('hosts')} size="small">
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
