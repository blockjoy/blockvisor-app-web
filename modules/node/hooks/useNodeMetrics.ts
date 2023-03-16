import { useRecoilState, useRecoilValue } from 'recoil';
import { nodeAtoms } from '../store/nodeAtoms';
import { apiClient } from '@modules/client';
import { organizationAtoms } from '@modules/organization';
import { checkForTokenError } from 'utils/checkForTokenError';

interface Hook {
  totalNodes: number | null;
  nodeMetrics: NodeMetrics[];
  loadMetrics: (
    shouldReturn?: boolean | undefined,
  ) => Promise<number | undefined>;
  isLoading: LoadingState;
}

export const useNodeMetrics = (): Hook => {
  const [nodeMetrics, setNodeMetrics] = useRecoilState(nodeAtoms.nodeMetrics);
  const [isLoading, setIsLoading] = useRecoilState(
    nodeAtoms.nodeMetricsLoadingState,
  );
  const [totalNodes, setTotalNodes] = useRecoilState(nodeAtoms.totalNodes);
  const orgId = useRecoilValue(organizationAtoms.defaultOrganization);

  const loadMetrics = async (shouldReturn = false) => {
    setIsLoading('initializing');
    const metrics: any = await apiClient.getDashboardMetrics(orgId?.id);

    console.log('metrics', metrics);

    checkForTokenError(metrics);

    setNodeMetrics(metrics);

    const total: number =
      metrics?.reduce((accumulator: number, metric: NodeMetrics) => {
        const currentValue = parseInt(metric.value) ?? 0;
        return accumulator + currentValue;
      }, 0) ?? 0;

    setTotalNodes(total);

    setIsLoading('finished');
    if (shouldReturn) return total || 0;
  };

  return {
    totalNodes,
    nodeMetrics,
    loadMetrics,
    isLoading,
  };
};
