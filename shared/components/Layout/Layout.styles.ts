import { css } from '@emotion/react';
import { colors } from 'styles/utils.colors.styles';

const layout = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 24px 12px;
`;

const layoutWrapper = css`
  background-color: var(--color-text-5-o3);
  border-radius: 8px;
  padding: 30px;

  @media (min-width: 35.5rem) {
    padding: 60px;
    width: 380px;
  }
`;

const layoutTitle = css`
  margin-top: 40px;
  margin-bottom: 24px;
`;

export { layout, layoutTitle, layoutWrapper };
