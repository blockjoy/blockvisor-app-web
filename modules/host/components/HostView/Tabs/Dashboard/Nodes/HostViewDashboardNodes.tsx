import { useRecoilValue } from 'recoil';
import { hostAtoms, mapHostNodesToRows } from '@modules/host';
import { useNodeList } from '@modules/node';
import {
  Table,
  FormHeaderCaps,
  TableSkeleton,
  EmptyColumn,
} from '@shared/components';
import { ROUTES } from '@shared/constants/routes';
import { spacing } from 'styles/utils.spacing.styles';
import { useRouter } from 'next/router';

export const HostViewDashboardNodes = () => {
  const { nodeListByHost, nodeListByHostLoadingState, handleNodeClick } =
    useNodeList();
  const host = useRecoilValue(hostAtoms.activeHost);

  const { headers, rows } = mapHostNodesToRows(nodeListByHost);

  const viewAllLink = `${ROUTES.HOST(host?.id!)}/nodes`;

  const router = useRouter();

  return (
    <>
      <FormHeaderCaps noBottomMargin viewAllLink={viewAllLink}>
        Nodes
      </FormHeaderCaps>
      {nodeListByHostLoadingState !== 'finished' ? (
        <TableSkeleton />
      ) : !Boolean(nodeListByHost?.length) &&
        nodeListByHostLoadingState === 'finished' ? (
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
          isLoading={nodeListByHostLoadingState}
          headers={headers}
          rows={rows}
          fixedRowHeight="120px"
          onRowClick={handleNodeClick}
        />
      )}
    </>
  );
};
