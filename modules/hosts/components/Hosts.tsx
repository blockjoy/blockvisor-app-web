import { Button } from '@shared/components';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { PageHeader, PageSection, Table } from '../../app/components/shared';
import { layoutState } from '@modules/layout/store/layoutAtoms';
import { useHosts } from '../hooks/useHosts';
import { useRouter } from 'next/router';
import { hostsToRows } from '../utils/toRow';

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

export function Hosts() {
  const setLayoutState = useSetRecoilState(layoutState);
  const router = useRouter();
  const { getHosts, loadingHosts, hosts } = useHosts();

  const handleRowClick = (args: any) => {
    router.push(`${router.pathname}/${args.key}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getHosts();
  }, []);

  const rows = hostsToRows(hosts);
  return (
    <PageSection>
      <PageHeader>
        Hosts
        <Button onClick={() => setLayoutState('hosts')} size="small">
          Add Host
        </Button>
      </PageHeader>
      <Table
        isLoading={loadingHosts}
        headers={headers}
        rows={rows}
        onRowClick={handleRowClick}
      />
    </PageSection>
  );
}
