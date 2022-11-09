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
import { NodeFilters } from './NodeFilters/NodeFilters';
import anime from 'animejs';
import { styles } from './nodeList.styles';
import { NodeListHeader } from './NodeListHeader/NodeListHeader';

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
          <div css={styles.wrapper}>
            <NodeFilters loadNodes={loadNodes} />

            <div style={{ flex: '1 1 auto' }}>
              <NodeListHeader
                totalRows={nodeRows?.length || 0}
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
                <div css={styles.gridWrapper}>
                  <TableGrid isLoading={loading} cells={nodeCells} />
                </div>
              )}
            </div>
          </div>
        )}
      </PageSection>
    </>
  );
};
