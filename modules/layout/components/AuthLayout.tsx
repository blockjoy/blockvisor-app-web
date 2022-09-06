import styled from "@emotion/styled";
import React from "react";
import { Logo } from '@shared/components/Logo/Logo';

const StyledWrapper = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 24px 12px;
`;

const StyledCard = styled.div`
  background-color: var(--color-text-5-o3);
  border-radius: 8px;
  padding: 30px;

  @media (min-width: 35.5rem) {
    padding: 60px;
    width: 380px;
  }
`;

const StyledHeaderText = styled.h2`
  font-size: 20px;
  margin-top: 40px;
  margin-bottom: 24px;
`;

type LayoutType = {
    children: React.ReactNode,
    layoutTitle: string
}

export const AuthLayout: React.FC<LayoutType>  = ({ children, layoutTitle }) => {
  return (
   <StyledWrapper>
    <StyledCard>
        <header>
          <Logo />
          <StyledHeaderText>{layoutTitle}</StyledHeaderText>
        </header>
        {children}
    </StyledCard>
   </StyledWrapper>
  );
}
