import styled from "@emotion/styled";

import { PageHeader, BlockButton } from "../shared";

import { useRecoilState} from "recoil";

import { layoutState } from "@modules/layout/store";

import IconNodes from "@public/assets/icons/box-12.svg";

const StyledList = styled.ul`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;

    @media only screen and (min-width: ${p => p.theme.screenSm}) {
        flex-wrap: nowrap;
        gap: 32px;
    }
`;

const StyledItemBlock = styled.li`
    padding-right: 16px;

    @media only screen and (min-width: ${p => p.theme.screenSm}) {
        padding-right: 30px;
    }

    &:first-of-type {
        border-right: 1px solid ${p => p.theme.colorBorder};
    }
`;

const StyledItemValue = styled.div`
  font-size: 28px;
  margin-bottom: 6px;
  color: ${p => p.theme.colorText};

  @media only screen and (min-width: ${p => p.theme.screenSm}) {
    font-size: 40px;
  }
`;

const StyledItemLabel = styled.div`
  display: flex;
  gap: 6px;
  font-size: 14px;
  color: ${p => p.theme.colorLabel};
`;

const StyledItemLabelIcon = styled.span`
  & path {
    fill: ${p => p.theme.colorLabel};
  }
`;

const StyledItemLabelText = styled.span`
  color: ${p => p.theme.colorLabel};
`;

const mockItems = [
    {
        icon: <IconNodes />,
        label: "Nodes",
        value: 49,
    },
    {
        icon: <IconNodes />,
        label: "Online",
        value: 15,
    },
    {
        icon: <IconNodes />,
        label: "Syncing",
        value: 14,
    }
]

export default () => {
    const [layout, setLayout] = useRecoilState(layoutState);
    const handleAddNode = () => setLayout({ ...layout, isNodeAddOpen: true })
    return (
        <>
            <PageHeader>
                Your Nodes
                <BlockButton onClick={handleAddNode}>Add Node</BlockButton>
            </PageHeader>
            <StyledList>
                {mockItems.map(item => (
                    <StyledItemBlock key={item.label}>
                        <StyledItemValue>{item.value}</StyledItemValue>
                        <StyledItemLabel>
                            <StyledItemLabelIcon>
                                {item.icon}
                            </StyledItemLabelIcon>
                            <StyledItemLabelText>
                                {item.label}
                            </StyledItemLabelText>
                        </StyledItemLabel>
                    </StyledItemBlock>
                ))}
            </StyledList>
        </>
    )
}