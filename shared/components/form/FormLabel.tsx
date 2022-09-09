import styled from "@emotion/styled";
import { PropsWithChildren } from "react";

const StyledLabel = styled.label`
  display: block;
  font-size: 10px;
  color: ${(p) => p.theme.colorLabel};
  margin-bottom: 8px;
`;

export const FormLabel: React.FC<PropsWithChildren> = ({ children }) => {
  return <StyledLabel>{children}</StyledLabel>;
};
