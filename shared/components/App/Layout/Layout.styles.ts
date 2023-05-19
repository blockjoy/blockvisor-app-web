import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

const layout = css`
  display: grid;
  place-items: center;
  padding: 24px 12px;
  min-height: 100%;
`;

const layoutWrapper = (overflow: string) => css`
  opacity: 0;
  background-color: var(--color-text-5-o3);
  border-radius: 8px;
  padding: 50px 30px;
  width: 90%;

  @media ${breakpoints.fromSml} {
    padding: 70px 50px 60px;
    width: 400px;
    max-width: 400px;
    min-width: 400px;
  }
`;

const layoutTitle = css`
  font-size: 20px;
  margin-top: 40px;
  margin-bottom: 24px;
`;

export { layout, layoutTitle, layoutWrapper };
