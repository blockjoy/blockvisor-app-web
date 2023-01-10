import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: css`
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
  `,
  contentWrapper: css`
    flex: 1 1 auto;
    display: flex;

    @media ${breakpoints.toXlrg} {
      flex-direction: column;
    }
  `,
};
