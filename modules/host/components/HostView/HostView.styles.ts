import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: css`
    display: flex;
    flex-direction: column;
    padding: 0 0 20px;

    @media ${breakpoints.fromLrg} {
      flex-direction: row;
    }
  `,
  content: css`
    flex: 1 1 auto;

    @media ${breakpoints.fromXLrg} {
      padding: 4px 20px 20px 0;
    }
  `,
  loader: css`
    padding: 35px 0 0;
  `,
};
