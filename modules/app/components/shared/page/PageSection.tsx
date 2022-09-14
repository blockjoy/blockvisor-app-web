import styled from '@emotion/styled';
import React from 'react';
import { wrapper } from 'styles/wrapper.styles';

const StyledContent = styled.section`
  position: relative;
  padding: 24px 0px;
  border-bottom: 1px solid ${(p) => p.theme.colorBorder};
  margin: 0 auto;
`;

export const PageSection: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <StyledContent>
    <div css={wrapper.main}>{children}</div>
  </StyledContent>
);
