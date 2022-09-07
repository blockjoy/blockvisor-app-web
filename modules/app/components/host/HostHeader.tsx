import { useRecoilValue } from "recoil";

import { appState } from "@modules/app/store";

import styled from "@emotion/styled";

import { BlockButton, Status } from "../shared";

const StyledHeader = styled.div`
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const StyledTitle = styled.span`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
`;

const StyledTitleText = styled.span`
  font-size: 20px;
`;

const StyledActions = styled.span`
    display: flex;
    gap: 8px;
`;

const StyledFooter = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 12px;
    color: ${p => p.theme.colorLabel};
`;

export default () => {
    const { activeHost } = useRecoilValue(appState);
    const handleStopClicked = () => null;
    const handleStartClicked = () => null;
    return (
        <>
            <StyledHeader>
                <StyledTitle>
                    <StyledTitleText>{activeHost.name}</StyledTitleText>
                    <Status name={activeHost.status} isPrimary />
                </StyledTitle>
                <StyledActions>
                    <BlockButton isAccent disabled onClick={handleStopClicked}>Stop</BlockButton>
                    <BlockButton isAccent onClick={handleStartClicked}>Start</BlockButton>
                </StyledActions>
            </StyledHeader>
            <StyledFooter>
                <span>{activeHost.ip_addr}</span>
                <span>{activeHost.location}</span>
            </StyledFooter>
        </>
    )
}