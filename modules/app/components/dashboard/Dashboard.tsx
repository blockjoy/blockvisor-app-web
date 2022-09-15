import { useRecoilValue } from 'recoil';
import { PageSection } from '../shared';
import { appState } from '@modules/app/store';
import { DashboardNodeSummary } from './DashboardNodeSummary';
import { DashboardRecentHosts } from './DashboardRecentHosts';
import { NodeEarnings } from '@shared/components';
import { useDashboard } from '@modules/app/hooks/useDashboard';
import { useEffect, useState } from 'react';

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

export default () => {
  const [isRendered, setRendered] = useState(false);
  const { dashboardLoading } = useRecoilValue(appState);
  const { loadDashboard } = useDashboard();

  useEffect(() => {
    window.scrollTo(0, 0);
    loadDashboard();
    setRendered(true);
  }, []);

  if (!isRendered) return null;

  return (
    <>
      <PageSection>
        <DashboardNodeSummary />
      </PageSection>
      <PageSection>
        <DashboardRecentHosts />
      </PageSection>
      {!dashboardLoading && (
        <PageSection>
          <NodeEarnings />
        </PageSection>
      )}
    </>
  );
};
