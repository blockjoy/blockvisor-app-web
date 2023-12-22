import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    display: flex;
    flex-direction: column;
    max-width: 33%;
    max-height: calc(100vh - 72px);
    padding: 10px 16px 10px 0;
    border-right: 1px solid ${theme.colorBorder};

    @media ${breakpoints.fromXLrg} {
      flex: 1 1 400px;
      margin-left: -14px;
    }

    @media ${breakpoints.toXlrg} {
      display: block;
      max-height: 1000px;
      max-width: 100%;
      border-right: none;
      border-bottom: 1px solid ${theme.colorBorder};
      padding: 10px 0 20px;
    }

    div:hover .row:hover {
      opacity: 1;
    }
  `,
  scrollbar: css`
    flex: 1 1 auto;
    min-height: 0;
  `,
};
