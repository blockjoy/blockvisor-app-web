import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  outerWrapper: css`
    @media ${breakpoints.fromLrg} {
      padding-right: 20px;
    }

    @media ${breakpoints.fromXLrg} {
      top: 56px;
      position: sticky;
      overflow: auto;
      flex: 0 0 200px;
      min-width: 200px;
      max-width: 200px;
      height: 800px;
    }
  `,
  outerWrapperCollapsed: css`
    @media ${breakpoints.fromXLrg} {
      max-width: 0;
      min-width: 0;
      padding: 0;
      overflow: hidden;
    }
  `,
  wrapper: css`
    transition-property: height;
    transition-duration: 0.3s;

    @media ${breakpoints.toXlrg} {
      height: 0;
      overflow: hidden;
    }
  `,
  filters: css`
    padding-top: 20px;
  `,
  wrapperOpen: css`
    margin-bottom: 40px;

    @media ${breakpoints.toXlrg} {
      height: auto;
    }
  `,
};
