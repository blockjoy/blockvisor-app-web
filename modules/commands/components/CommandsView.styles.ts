import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: css`
    background-color: #1e201f;
    border-radius: 6px;
    padding: 20px;

    @media ${breakpoints.fromXHuge} {
      margin-right: 20px;
    }
  `,
};
