import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: css`
    position: relative;
    z-index: 3;
    min-height: 100vh;

    @media ${breakpoints.fromXLrg} {
      margin-left: 64px;
    }
  `,
  wrapperSidebarOpen: css`
    @media ${breakpoints.fromXLrg} {
      margin-left: 260px;
    }
  `,
  wrapperFlex: css`
    display: flex;
    flex-direction: column;
  `,
};
