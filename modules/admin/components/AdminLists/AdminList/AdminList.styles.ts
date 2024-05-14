import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  card: css`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    @media ${breakpoints.toLrg} {
      margin-bottom: 100px;
    }
  `,
};
