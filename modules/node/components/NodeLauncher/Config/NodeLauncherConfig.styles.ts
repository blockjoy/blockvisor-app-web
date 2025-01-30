import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: () => css`
    padding: 10px;
    flex: 1 1 400px;

    @media ${breakpoints.fromXLrg} {
      padding: 10px 24px;
    }
  `,
  advancedConfigButton: (theme: ITheme) => css`
    background: transparent;
    padding: 0;
    border: 0;
    color: inherit;
    height: 26px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: color 0.1s;

    :hover {
      color: ${theme.colorDefault};
    }

    svg path {
      fill: currentColor;
      transition: fill 0.1s;
    }
  `,
};
