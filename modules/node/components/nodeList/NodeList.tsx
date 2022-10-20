import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Table } from '@modules/app/components/shared';
import { useNodeList } from '@modules/node/hooks/useNodeList';
import { nodeAtoms } from '@modules/node/store/nodeAtoms';
import {
  Button,
  EmptyColumn,
  PageHeader,
  PageSection,
} from '@shared/components';
import anime from 'animejs';

export const NodeList = () => {
  const { loadNodes, handleRowClick, handleAddNode } = useNodeList();

  const isLoading = useRecoilValue(nodeAtoms.isLoading);
  const nodeRows = useRecoilValue(nodeAtoms.nodeRows);

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
        <Button onClick={handleAddNode} style="secondary" size="small">
          Add Node
        </Button>
      </PageHeader>
      {Boolean(nodeRows) ? (
        <>
          <Table
            isLoading={isLoading}
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
        </>
      ) : (
        <EmptyColumn
          id="js-nodes-empty"
          title="No Nodes."
          description="Add your nodes and hosts to get started with BlockVisor."
        />
      )}
    </PageSection>
  );
};
