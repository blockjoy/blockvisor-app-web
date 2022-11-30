import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  outerWrapper: css`
    @media ${breakpoints.fromLrg} {
      padding-right: 20px;
    }

    @media ${breakpoints.fromXLrg} {
      top: 72px;
      position: sticky;
      overflow: auto;
      flex: 0 0 200px;
      min-width: 200px;
      max-width: 200px;
      height: calc(100vh - 172px);
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
  resetButton: (theme: ITheme) => css`
    background: transparent;
    border: 0;
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${theme.colorDefault};
    font-size: 14px;
    height: 56px;
    cursor: pointer;

    path {
      fill: ${theme.colorDefault};
    }

    :hover {
      color: ${theme.colorText};

      & path {
        fill: ${theme.colorText};
      }
    }
  `,
};
