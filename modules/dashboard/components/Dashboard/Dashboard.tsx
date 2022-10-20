import { useRecoilValue } from 'recoil';

import { appState } from '@modules/dashboard/store';

import { NodeEarnings, PageSection } from '@shared/components';
import { useDashboard } from '@modules/dashboard/hooks/useDashboard';
import { useEffect, useState } from 'react';
import { DashboardEmpty } from '../DashboardEmpty/DashboardEmpty';
import { NodeSummary } from '../NodeSummary/NodeSummary';
import { RecentHosts } from '../RecentHosts/RecentHosts';

export type NodeMetric = {
  name: string;
  icon?: string;
  value: number;
  isPrimary?: boolean;
  isGreyedOut?: boolean;
};

export type Dashboard = {
  nodeMetrics: NodeMetric[];
  recentHosts: any;
};

const isEmpty = (metrics: NodeMetric[]) => metrics.every((m) => m.value === 0);

export function Dashboard() {
  const [isRendered, setRendered] = useState(false);
  const { dashboardLoading, dashboard } = useRecoilValue(appState);
  const { recentHosts, nodeMetrics } = dashboard;
  const { loadDashboard } = useDashboard();

  useEffect(() => {
    window.scrollTo(0, 0);
    loadDashboard();
    setRendered(true);
  }, []);

  if (!isRendered) return null;

  return !Boolean(recentHosts.length) && isEmpty(nodeMetrics) ? (
    <PageSection bottomBorder={false}>
      <DashboardEmpty />
    </PageSection>
  ) : (
    <>
      <PageSection>
        <NodeSummary />
      </PageSection>
      <PageSection>
        <RecentHosts />
      </PageSection>
      {!dashboardLoading && (
        <PageSection>
          <NodeEarnings />
        </PageSection>
      )}
    </>
  );
}
