import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: css`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 0 24px;

    @media ${breakpoints.fromXLrg} {
      flex-direction: row;
      padding: 0 30px;
    }
  `,
  gridWrapper: css`
    width: 100%;
  `,
  nodeListWrapper: css`
    flex: 1 1 auto;
    @media ${breakpoints.fromLrg} {
      position: static;
      margin-left: 0;
    }
  `,
  endMessage: css``,
};
