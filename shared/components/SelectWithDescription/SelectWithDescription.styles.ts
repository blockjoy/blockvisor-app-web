import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  base: css`
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-top: 24px;
    padding-bottom: 10px;
    align-items: flex-start;
    border-bottom: 1px solid var(--color-text-5-o10);

    @media ${breakpoints.fromSml} {
      flex-direction: row;
      justify-content: space-between;
    }
  `,
  description: css`
    margin-top: 8px;
    display: block;
    color: var(--color-text-2);
  `,
};
