import { appState } from '@modules/app/store';
import { Button } from '@shared/components';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { PageHeader, PageSection, Table } from '@modules/app/components/shared';
import { useNodeList } from '@modules/node/hooks/useNodeList';
import { Pagination } from '@shared/components/Pagination/Pagination';

export const NodeList = () => {
  const { loadNodes, handleRowClick, handleAddNode, headers, rows, isLoading } =
    useNodeList();

  useEffect(() => {
    window.scrollTo(0, 0);
    loadNodes();
  }, []);

  return (
    <PageSection>
      <PageHeader>
        Nodes
        <Button onClick={handleAddNode} style="secondary" size="small">
          Add Node
        </Button>
      </PageHeader>
      <Table
        isLoading={isLoading}
        headers={headers}
        rows={rows}
        onRowClick={handleRowClick}
      />
      <Pagination numberOfItems={10} itemsPerPage={1} />
    </PageSection>
  );
};
