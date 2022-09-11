import styled from '@emotion/styled';
import React from 'react';

const StyledContent = styled.section`
  position: relative;
  padding: 24px 24px 40px;
  border-bottom: 1px solid ${(p) => p.theme.colorBorder};
`;

export const PageSection: React.FC<React.PropsWithChildren> = ({
  children,
}) => <StyledContent>{children}</StyledContent>;
