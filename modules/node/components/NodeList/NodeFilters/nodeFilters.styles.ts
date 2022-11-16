import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  outerWrapper: css`
    @media ${breakpoints.fromLrg} {
      padding-right: 20px;
    }
  `,
  wrapper: css`
    flex: 0 0 auto;
    transition-property: height;
    transition-duration: 0.3s;

    @media ${breakpoints.toXlrg} {
      height: 0;
      overflow: hidden;
    }

    @media ${breakpoints.fromLrg} {
      top: 56px;
      position: sticky;
      overflow: auto;
      flex: 0 0 200px;
      min-width: 200px;
      max-width: 200px;
      height: 1000px;
    }
  `,
  filters: css`
    padding-top: 20px;
  `,
  wrapperOpen: css`
    margin-bottom: 40px;

    @media ${breakpoints.toLrg} {
      height: auto;
    }
  `,
};
