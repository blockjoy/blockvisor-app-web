import { PageSection } from '../shared';
import { DashboardNodeSummary, DashboardEarnings } from '.';
import { useDashboard } from '@modules/app/hooks/useDashboard';
import { useEffect } from 'react';

export type NodeMetric = {
  name: string;
  icon?: string;
  value: number;
  isPrimary?: boolean;
  isGreyedOut?: boolean;
};

export type Dashboard = {
  nodeMetrics: NodeMetric[];
};

export default () => {
  const { loadDashboard } = useDashboard();

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <>
      <PageSection>
        <DashboardNodeSummary />
      </PageSection>
      <PageSection>
        <DashboardEarnings />
      </PageSection>
    </>
  );
};
