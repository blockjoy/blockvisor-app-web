import { PageSection } from '../shared';
import { DashboardNodeSummary, DashboardEarnings } from '.';

export default () => {
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
