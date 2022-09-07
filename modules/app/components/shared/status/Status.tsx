import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { CssProps, Props, StyledProps } from "./Status.config";

const primaryStyles = (p: CssProps) => css`
    color: ${p.theme.colorPrimary};
`;

const dangerStyles = (p: CssProps) => css`
    color: ${p.theme.colorDanger};
`;

const StyledStatus = styled.span<StyledProps>`
  display: flex;
  gap: 10px;
  font-size: 10px;
  letter-spacing: 1.5px;

  ${p => p.isPrimary && primaryStyles};
  ${p => p.isDanger && dangerStyles};
`;

const Status: React.FC<Props> = ({ name, isPrimary }) => {
    return <StyledStatus isPrimary={isPrimary}>{name}</StyledStatus>
}

export { Status };