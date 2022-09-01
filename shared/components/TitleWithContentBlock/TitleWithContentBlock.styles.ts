import { css } from '@emotion/css';

export const styles = {
  base: css`
    display: grid;
    gap: 28px;
    padding-top: 20px;
    margin-top: 40px;
    border-top: 1px solid var(--color-text-5-o10);

    @media (--screen-large) {
      padding-top: 40px;
      margin-top: 80px;
      grid-template-columns: 296px auto;
    }
  `,
  content: css`
    color: var(--color-text-4);
  `,
};
