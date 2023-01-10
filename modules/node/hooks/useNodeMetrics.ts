import { useRecoilState } from 'recoil';
import { nodeAtoms } from '../store/nodeAtoms';
import { apiClient } from '@modules/client';

interface Hook {
  totalNodes: number | null;
  nodeMetrics: NodeMetrics[];
  loadMetrics: () => void;
}

export const useNodeMetrics = (): Hook => {
  const [nodeMetrics, setNodeMetrics] = useRecoilState(nodeAtoms.nodeMetrics);
  const [totalNodes, setTotalNodes] = useRecoilState(nodeAtoms.totalNodes);

  const loadMetrics = async () => {
    const metrics: any = await apiClient.getDashboardMetrics();
    setNodeMetrics(metrics);

    console.log('loadMetrics', metrics);

    if (metrics.code) {
      setTotalNodes(100);
      return;
    }

    // TODO: move total to recoil selector
    const total: number = metrics.reduce((accumulator: number, metric: any) => {
      const currentValue = parseInt(metric.value) ?? 0;
      return accumulator + currentValue;
    }, 0);

    setTotalNodes(total);
  };

  return {
    totalNodes,
    nodeMetrics,
    loadMetrics,
  };
};
