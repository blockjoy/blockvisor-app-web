import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: css`
    position: relative;
    z-index: 3;
    padding: 56px 0 16px;
    transition: margin 0.4s;
  `,
  wrapperSidebarOpen: css`
    @media ${breakpoints.toMed} {
      margin-left: 260px;
    }
  `,
};
