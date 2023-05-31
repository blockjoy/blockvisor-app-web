import { useRecoilValue } from 'recoil';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { hostAtoms, mapHostNodesToRows } from '@modules/host';
import { useNodeList, useNodeView } from '@modules/node';
import { EmptyColumn, Table, TableSkeleton } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { useRouter } from 'next/router';

export const HostViewNodes = () => {
  const router = useRouter();

  const { nodeList, isLoading, handleNodeClick } = useNodeList();
  const { stopNode, startNode } = useNodeView();
  const host = useRecoilValue(hostAtoms.activeHost);
  const isLoadingActiveHost = useRecoilValue(hostAtoms.isLoadingActiveHost);

  const hostNodes = nodeList.filter((node: Node) => node.hostId === host?.id);

  const handleAction = (type: string, nodeId: string) => {
    if (type === 'start') startNode(nodeId);
    else if (type === 'stop') stopNode(nodeId);
  };

  const { headers, rows } = mapHostNodesToRows(hostNodes, handleAction);

  return (
    <>
      {isLoading !== 'finished' && isLoadingActiveHost !== 'finished' ? (
        <TableSkeleton />
      ) : !Boolean(hostNodes?.length) ? (
        <EmptyColumn
          title="No Nodes."
          description={
            <div>
              <h3 css={spacing.bottom.mediumSmall}>
                Here is where your nodes will show, once you have some.
              </h3>
              <a onClick={() => router.push('/launch-node')}>
                Launch a node to get started
              </a>
            </div>
          }
        />
      ) : (
        <Table
          isLoading={isLoading}
          headers={headers}
          rows={rows}
          fixedRowHeight="120px"
          onRowClick={handleNodeClick}
        />
      )}
    </>
  );
};
