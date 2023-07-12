import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;

    @media ${breakpoints.fromLrg} {
      flex-direction: row;
      height: 100%;
      padding-bottom: 20px;
    }
  `,
  content: css`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
  `,
  sidePanel: (theme: ITheme) => css`
    flex: 1 1 420px;
    max-width: 420px;
    padding: 0 0 20px 20px;
    border-left: 1px solid ${theme.colorBorder};

    @media ${breakpoints.toXlrg} {
      border-left: 0;
      border-top: 1px solid ${theme.colorBorder};
      padding: 20px 0 0 0;
      max-width: 1000px;
      margin-bottom: 100px;
      display: none;
    }
  `,
  loader: css`
    padding: 35px 0 0;
  `,
};
