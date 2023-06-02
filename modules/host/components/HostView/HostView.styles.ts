import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: css`
    display: flex;
    flex-direction: column;
    padding: 20px 0;

    @media ${breakpoints.fromLrg} {
      flex-direction: row;
      height: 100%;
    }
  `,
  content: css`
    flex: 1 1 auto;

    @media ${breakpoints.fromLrg} {
      padding: 4px 20px 20px 0;
    }
  `,
  loader: css`
    padding: 15px 0 0;
  `,
};
