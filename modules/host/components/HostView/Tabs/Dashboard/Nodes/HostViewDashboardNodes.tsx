import { useRecoilValue } from 'recoil';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { hostAtoms, mapHostNodesToRows } from '@modules/host';
import { useNodeList } from '@modules/node';
import { Table, DetailsWrapper } from '@shared/components';
import { EmptyColumn, ROUTES, TableSkeleton } from '@shared/index';
import { spacing } from 'styles/utils.spacing.styles';
import { useRouter } from 'next/router';

export const HostViewDashboardNodes = () => {
  const { nodeList, isLoading, handleNodeClick } = useNodeList();
  const host = useRecoilValue(hostAtoms.activeHost);

  const hostNodes = nodeList.filter((node: Node) => node.hostId === host?.id);

  const { headers, rows } = mapHostNodesToRows(hostNodes);

  const linkHref = `${ROUTES.HOST(host?.id!)}/nodes`;

  const router = useRouter();

  return (
    <DetailsWrapper title="Hosts" href={linkHref}>
      {isLoading !== 'finished' ? (
        <TableSkeleton />
      ) : !Boolean(hostNodes?.length) && isLoading === 'finished' ? (
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
    </DetailsWrapper>
  );
};
