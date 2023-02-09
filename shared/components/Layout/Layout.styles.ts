import { css } from '@emotion/react';

const layout = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 24px 12px;
`;

const layoutWrapper = (overflow: string) => css`
  opacity: 0;
  background-color: var(--color-text-5-o3);
  border-radius: 8px;
  padding: 30px;
  overflow: ${overflow};

  @media (min-width: 35.5rem) {
    padding: 60px;
    width: 380px;
  }
`;

const layoutTitle = css`
  font-size: 20px;
  margin-top: 40px;
  margin-bottom: 24px;
`;

export { layout, layoutTitle, layoutWrapper };
