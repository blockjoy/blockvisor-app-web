import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

const layout = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px 12px;
  min-height: auto;

  @media ${breakpoints.fromSml} {
    min-height: 100vh;
    padding: 24px 12px;
  }
`;

const layoutWrapper = css`
  opacity: 0;
  background-color: var(--color-text-5-o3);
  border-radius: 8px;
  padding: 30px;
  overflow: hidden;

  @media ${breakpoints.fromSml} {
    padding: 60px;
    width: 380px;
  }
`;

const layoutTitle = css`
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 24px;

  @media ${breakpoints.fromSml} {
    margin-top: 40px;
  }
`;

export { layout, layoutTitle, layoutWrapper };
