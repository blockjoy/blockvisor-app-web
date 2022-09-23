import { Button } from '@shared/components';
import { useEffect, useState } from 'react';
import { PageHeader, PageSection, Table } from '../../app/components/shared';
import { useHosts } from '../hooks/useHosts';
import { useRouter } from 'next/router';
import { hostsToRows } from '../utils/toRow';
import { css } from '@emotion/react';

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
  const [isCreating, setIsCreating] = useState(false);

  const router = useRouter();
  const { getHosts, createHostProvision, loadingHosts, hosts } = useHosts();

  const handleRowClick = (args: any) => {
    console.log('handleRowClick', args);
    router.push(`${router.pathname}/${args.key}`);
  };

  const handleCreateClicked = async () => {
    setIsCreating(true);
    createHostProvision(() => console.log('host provision created'));
    setIsCreating(false);
    router.push('host-install');
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
        <Button
          loading={isCreating}
          style="secondary"
          onClick={handleCreateClicked}
          size="small"
          css={css`
            min-width: 100px;
            width: 100px;
          `}
        >
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
