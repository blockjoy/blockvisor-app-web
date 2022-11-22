import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: css`
    position: relative;
    z-index: 3;
    padding: 56px 0 16px;
  `,
  wrapperSidebarOpen: css`
    @media ${breakpoints.fromXLrg} {
      margin-left: 260px;
    }
  `,
};
