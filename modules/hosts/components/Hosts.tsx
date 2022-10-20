import {
  Button,
  EmptyColumn,
  PageHeader,
  PageSection,
  Table,
} from '@shared/components';
import { useEffect, useState } from 'react';
import { useHosts } from '../hooks/useHosts';
import { useRouter } from 'next/router';
import { hostsToRows } from '../utils/toRow';
import { css } from '@emotion/react';
import anime from 'animejs';

const headers = [
  {
    name: 'Name',
    key: '1',
    width: '350px',
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
    if (args.key.length < 12) {
      router.push(`hosts/install/${args.key}`);
    } else {
      router.push(`${router.pathname}/${args.key}`);
    }
  };

  const handleCreateClicked = async () => {
    setIsCreating(true);
    createHostProvision((key: string) => {
      router.push(`hosts/install/${key}`);
      setIsCreating(false);
    });
  };

  const animateEntry = () =>
    anime({
      targets: `#js-host-empty`,
      opacity: [0, 1],
      translateY: [8, 0],
      easing: 'easeInOutQuad',
      duration: 400,
    });
  useEffect(() => {
    animateEntry();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    getHosts();
  }, []);

  const rows = hostsToRows(hosts);
  return (
    <PageSection bottomBorder={false}>
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
      {Boolean(rows) ? (
        <Table
          isLoading={loadingHosts}
          headers={headers}
          rows={rows}
          onRowClick={handleRowClick}
        />
      ) : (
        <EmptyColumn
          id="js-host-empty"
          title="No Hosts."
          description="Add your nodes and hosts to get started with BlockVisor."
        />
      )}

      {/* <Pagination numberOfItems={10} itemsPerPage={1} /> */}
    </PageSection>
  );
}
