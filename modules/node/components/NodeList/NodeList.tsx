import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNodeList } from '@modules/node/hooks/useNodeList';
import { nodeAtoms } from '@modules/node/store/nodeAtoms';
import { hostsAtoms } from '@modules/hosts/store/hostAtoms';
import {
  EmptyColumn,
  PageSection,
  PageTitle,
  Table,
  TableGrid,
} from '@shared/components';
import anime from 'animejs';
import { ListTypeToggle } from '@shared/components/ListTypeToggle/ListTypeToggle';

export const NodeList = () => {
  const { loadNodes, handleNodeClick, handleAddNode } = useNodeList();

  const [activeListType, setActiveListType] = useRecoilState(
    nodeAtoms.activeListType,
  );
  const isLoading = useRecoilValue(nodeAtoms.isLoading);
  const nodeRows = useRecoilValue(nodeAtoms.nodeRows);
  const nodeCells = useRecoilValue(nodeAtoms.nodeCells);
  const hasHosts = !!useRecoilValue(hostsAtoms.hosts)?.length;
  const loading = isLoading === 'initializing' || isLoading === 'loading';
  const finished = isLoading === 'finished';

  const handleListTypeChanged = (type: string) => {
    setActiveListType(type);
  };

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
    <>
      <PageTitle
        title="All Nodes"
        actionOnClick={handleAddNode}
        actionText="Add Node"
      ></PageTitle>
      <PageSection bottomBorder={false}>
        {!Boolean(nodeRows?.length) && finished ? (
          <>
            <EmptyColumn
              id="js-nodes-empty"
              title="No Nodes."
              description="Add your nodes and hosts to get started with BlockVisor."
            />
          </>
        ) : (
          <div style={{ position: 'relative', marginTop: '20px' }}>
            <ListTypeToggle
              activeListType={activeListType}
              onTypeChanged={handleListTypeChanged}
            />
            {activeListType === 'table' ? (
              <Table
                isLoading={loading}
                headers={[
                  {
                    name: 'Name',
                    key: '1',
                    width: '300px',
                  },
                  {
                    name: 'Added',
                    key: '2',
                    width: '200px',
                  },
                  {
                    name: 'Status',
                    key: '3',
                    width: '200px',
                  },
                ]}
                rows={nodeRows || []}
                onRowClick={handleNodeClick}
              />
            ) : (
              <TableGrid cells={nodeCells} />
            )}
          </div>
        )}
      </PageSection>
    </>
  );
};
