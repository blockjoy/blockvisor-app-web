import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: css`
    min-height: 100%;

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
    @media ${breakpoints.fromLrg} {
      display: flex;
      flex-direction: column;
    }
  `,
};
