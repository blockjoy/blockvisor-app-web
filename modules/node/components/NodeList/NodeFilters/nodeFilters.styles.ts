import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    flex: 0 0 auto;

    transition-property: height;
    transition-duration: 0.3s;

    @media ${breakpoints.toLrg} {
      max-height: 0;
      overflow: hidden;
    }

    @media ${breakpoints.fromLrg} {
      top: 56px;
      position: sticky;
      overflow: auto;
      flex: 0 0 200px;
      height: 1000px;
      padding-right: 20px;
    }
  `,
  filters: css`
    padding-top: 20px;
  `,
  wrapperOpen: css`
    @media ${breakpoints.toLrg} {
      max-height: 1000px;
    }
  `,
};
