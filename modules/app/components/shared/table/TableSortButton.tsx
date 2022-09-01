import styled from "@emotion/styled";
import { css } from "@emotion/react";

import IconSort from "@public/assets/icons/sort-12.svg";
import SizedIcon from "@modules/layout/components/shared/SizedIcon";

type Props = {
    children: React.ReactNode,
    onClick: (arg0: string) => void,
    sortExpression?: string,
    activeSortExpression?: string,
}

type ButtonProps = {
    isActive: boolean
}

const activeStyles = (p: any) => {
    return css`
        &,
        &:hover {
            color: ${p.theme.colorPrimary};
        }
        & path,
        &:hover path {
            fill: ${p.theme.colorPrimary};
        }
    `;
}

const StyledButton = styled.button<ButtonProps>`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0;
    border: 0;
    background: transparent;
    letter-spacing: inherit;
    text-transform: inherit;
    color: inherit;
    cursor: pointer;

    &:hover {
        color: ${p => p.theme.colorText};
    }

    &:hover path {
        fill: ${p => p.theme.colorText};
    }

    ${p => p.isActive && activeStyles};
`;

const StyledText = styled.span`
  letter-spacing: inherit;
  text-transform: inherit;
  color: inherit;
  line-height: 1;
`;

export const TableSortButton: React.FC<Props> = ({ 
    children,
    onClick, 
    sortExpression, 
    activeSortExpression }) => {
    return (
        <StyledButton 
            onClick={() => onClick(sortExpression || "")}
            isActive={sortExpression === activeSortExpression}
        >
            <StyledText>
                {children}
            </StyledText>
            <SizedIcon size="10px">
                <IconSort />
            </SizedIcon>
        </StyledButton>
    )
}