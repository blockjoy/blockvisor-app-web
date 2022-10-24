import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useNodeList } from '@modules/node/hooks/useNodeList';
import { nodeAtoms } from '@modules/node/store/nodeAtoms';
import { hostsAtoms } from '@modules/hosts/store/hostAtoms';
import {
  Button,
  EmptyColumn,
  PageHeader,
  PageSection,
  Table,
} from '@shared/components';
import anime from 'animejs';

export const NodeList = () => {
  const { loadNodes, handleRowClick, handleAddNode } = useNodeList();

  const isLoading = useRecoilValue(nodeAtoms.isLoading);
  const nodeRows = useRecoilValue(nodeAtoms.nodeRows);
  const hasHosts = !!useRecoilValue(hostsAtoms.hosts)?.length;
  const loading = isLoading === 'initializing' || isLoading === 'loading';
  const finished = isLoading === 'finished';
  const animateEntry = () =>
    anime({
      targets: `#js-nodes-empty`,
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
    loadNodes();
  }, []);

  return (
    <PageSection bottomBorder={false}>
      <PageHeader>
        Nodes
        <Button
          disabled={!hasHosts}
          onClick={handleAddNode}
          style="secondary"
          size="small"
        >
          Add Node
        </Button>
      </PageHeader>
      {!Boolean(nodeRows?.length) && finished ? (
        <>
          <EmptyColumn
            id="js-nodes-empty"
            title="No Nodes."
            description="Add your nodes and hosts to get started with BlockVisor."
          />
        </>
      ) : (
        <Table
          isLoading={loading}
          headers={[
            {
              name: 'Name',
              key: '1',
            },
            {
              name: 'Status',
              key: '2',
            },
          ]}
          rows={nodeRows || []}
          onRowClick={handleRowClick}
        />
      )}
    </PageSection>
  );
};
