import { css } from '@emotion/react';
import { ITheme } from 'types/theme';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  header: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px;
    min-height: 72px;
    margin-bottom: 20px;
    cursor: pointer;
    border-bottom: 1px solid ${theme.colorBorder};

    @media ${breakpoints.fromXLrg} {
      display: flex;
    }

    path,
    span {
      transition: 0.3s;
    }
  `,
};
