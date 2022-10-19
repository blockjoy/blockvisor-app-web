import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { PageHeader, PageSection, Table } from '@modules/app/components/shared';
import { useNodeList } from '@modules/node/hooks/useNodeList';
import { nodeAtoms } from '@modules/node/store/nodeAtoms';
import { Button, EmptyColumn } from '@shared/components';

export const NodeList = () => {
  const { loadNodes, handleRowClick, handleAddNode } = useNodeList();

  const isLoading = useRecoilValue(nodeAtoms.isLoading);
  const nodeRows = useRecoilValue(nodeAtoms.nodeRows);

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
          title="No Nodes."
          description="Add your nodes and hosts to get started with BlockVisor."
        />
      )}
    </PageSection>
  );
};
