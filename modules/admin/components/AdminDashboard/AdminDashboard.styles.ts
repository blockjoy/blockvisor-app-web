import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: css`
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  grid: css`
    display: grid;
    width: 100%;
    gap: 20px;
    padding-top: 20px;

    @media ${breakpoints.fromLrg} {
      grid-template-columns: repeat(2, 1fr);
    }

    @media ${breakpoints.fromXHuge} {
      grid-template-columns: repeat(4, 1fr);
    }
  `,
};
