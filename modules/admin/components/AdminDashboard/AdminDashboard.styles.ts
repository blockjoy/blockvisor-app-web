import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: css`
    display: flex;
  `,
  grid: css`
    flex: 1 1 auto;
    min-width: 0;
    display: grid;
    grid-template-columns: repeat(1, auto);
    grid-auto-rows: max-content;
    gap: 20px;
    padding-top: 20px;

    @media ${breakpoints.fromXHuge} {
      grid-template-columns: repeat(2, 50%);
    }
  `,
};
