import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { mapHostNodesToRows, useHostView } from '@modules/host';
import { useNodeList } from '@modules/node';
import { EmptyColumn, Table, TableSkeleton } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { useRouter } from 'next/router';
import { ROUTES } from '@shared/constants/routes';

export const HostViewNodes = () => {
  const router = useRouter();
  const { nodeList, isLoading } = useNodeList();
  const { host, isLoading: isLoadingActiveHost } = useHostView();
  const hostNodes = nodeList.filter((node: Node) => node.hostId === host?.id);
  const { headers, rows } = mapHostNodesToRows(hostNodes);

  const handleNodeClicked = (id: string) => router.push(ROUTES.NODE(id));

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
          hideHeader
          isLoading={isLoading}
          headers={headers}
          rows={rows}
          fixedRowHeight="120px"
          onRowClick={handleNodeClicked}
        />
      )}
    </>
  );
};
