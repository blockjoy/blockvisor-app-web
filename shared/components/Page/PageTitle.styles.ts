import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  base: (theme: ITheme) => css`
    position: sticky;
    z-index: 3;
    top: 30px;
    display: flex;
    align-items: center;
    background: #2a2c2b;
    height: 72px;
    border-bottom: 1px solid ${theme.colorBorder};

    h1 {
      font-size: 18px;
    }
  `,
  wrapper: css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media ${breakpoints.toXlrg} {
      padding-left: 56px;
    }
  `,
  actions: css``,
};
