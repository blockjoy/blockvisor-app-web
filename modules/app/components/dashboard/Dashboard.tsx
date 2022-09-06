import { PageSection } from "../shared";

import { 
    DashboardNodeSummary, 
    DashboardEarnings 
} from "./shared";

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