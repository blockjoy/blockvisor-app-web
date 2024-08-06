import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  outerWrapper: css`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    @media ${breakpoints.fromXLrg} {
      top: 71px;
      position: sticky;
      flex: 0 0 200px;
      min-width: 200px;
      max-width: 200px;
      height: calc(100vh - 82px);
      padding-right: 16px;
      margin-bottom: 0;
    }
  `,
  outerWrapperCollapsed: css`
    margin-bottom: 0;

    @media ${breakpoints.fromXLrg} {
      max-width: 0;
      min-width: 0;
      padding: 0;
      overflow: hidden;
      margin-bottom: 0;
    }
  `,
  sorting: css`
    @media ${breakpoints.fromXLrg} {
      display: none;
    }
  `,
};
