import styled from "@emotion/styled";

import { PageHeader } from "../../shared";

import { mockEarningsData as mockItems } from "./mockEarningsData";

const StyledList = styled.ul`
  display: flex;
  gap: 30px;
  margin-bottom: 50px;

  flex-wrap: wrap;

    @media only screen and (min-width: ${p => p.theme.screenSm}) {
        flex-wrap: nowrap;
        gap: 50px;
    }
`;

const StyledItemHeader = styled.div`
  color: ${p => p.theme.colorLabel};
  letter-spacing: 1px;
  font-size: 12px;
  margin-bottom: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const StyledItemRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
`;

const StyledItemValue = styled.div`
  font-size: 24px;
  line-height: 1;

  @media only screen and (min-width: ${p => p.theme.screenSm}) {
        font-size: 36px;
    }
`;

const StyledItemSuffix = styled.div`
  
`;

export const DashboardEarningsSummary = () => {
    return (
        <>
            <PageHeader>
                Earnings
            </PageHeader>
            <StyledList>
                {mockItems.map(item => (
                    <li key={item.name}>
                        <StyledItemHeader>
                            {item.name}
                        </StyledItemHeader>
                        <StyledItemRow>
                            <StyledItemValue>
                                {item.value}
                            </StyledItemValue>
                            <StyledItemSuffix>
                                HNT
                            </StyledItemSuffix>
                        </StyledItemRow>
                    </li>
                ))}
            </StyledList>
        </>
    )
}