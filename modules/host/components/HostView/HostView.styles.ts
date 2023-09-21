import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;

    @media ${breakpoints.fromXLrg} {
      flex-direction: row;
      height: 100%;
      padding-bottom: 20px;
    }
  `,
  content: css`
    flex: 1 1 auto;

    @media ${breakpoints.fromXLrg} {
      padding: 4px 20px 20px 0;
    }
  `,
  sidePanel: (theme: ITheme) => css`
    flex: 1 1 420px;
    max-width: 420px;
    min-width: 420px;
    width: 420px;
    padding: 0 0 20px 20px;
    border-left: 1px solid ${theme.colorBorder};

    @media ${breakpoints.fromXLrg} {
      position: sticky;
      top: 150px;
      height: calc(100vh - 120px);
    }

    @media ${breakpoints.toXlrg} {
      border-left: 0;
      border-bottom: 1px solid ${theme.colorBorder};
      padding: 20px 0 0 0;
      min-width: 100%;
      width: 100%;
    }
  `,
  loader: css`
    padding: 35px 0 0;
  `,
};
