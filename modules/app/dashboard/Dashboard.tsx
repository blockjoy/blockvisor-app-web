import { PageSection } from "../shared";

import DashboardNodeSummary from "./DashboardNodeSummary";
import DashboardEarnings from "./DashboardEarnings";

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
}