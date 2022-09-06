import styled from "@emotion/styled";
import { rgba } from "polished";

const StyledChartDialog = styled.div`
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    display: grid;
    place-items: center;
    text-align: center;
    width: 100%;
    height: 100%;
    background: ${p => rgba(p.theme.colorBackground, 0.85)};
`;

const StyledChartDialogMessage = styled.div`
    display: grid;
    place-items: center;
    text-align: center;
    width: 350px;
    height: 100px;
    padding: 30px;;
    background: rgba( 0, 0, 0, 0.3 );
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    border-radius: 10px;
    color: ${p => p.theme.colorLabel};
    line-height: 1.35;
`;

export const DashboardEarningsChartDialog = () => {
    return (
        <StyledChartDialog>
            <StyledChartDialogMessage>
                Charts are currently in beta testing and will be available soon.
            </StyledChartDialogMessage>
        </StyledChartDialog>
    )
}