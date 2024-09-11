import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    display: flex;
    flex-direction: column;
    max-width: 33%;
    padding: 10px 16px 10px 0;
    border-right: 1px solid ${theme.colorBorder};

    @media ${breakpoints.fromXLrg} {
      flex: 1 1 400px;
      margin-left: -14px;
      min-height: calc(100vh - 72px);
      max-height: calc(100vh - 72px);
    }

    @media ${breakpoints.toXlrg} {
      display: block;
      max-height: inherit;
      max-width: 100%;
      border-right: none;
      border-bottom: 1px solid ${theme.colorBorder};
      padding: 10px 0 20px;
    }
  `,
};
