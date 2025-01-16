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
  buttons: (theme: ITheme) => css`
    padding: 20px 30px;
    border-top: 1px solid ${theme.colorBorder};
  `,
  firewall: css`
    margin-bottom: 12px;
  `,
  advancedConfig: (theme: ITheme) => css`
    border-top: 1px solid transparent;
    padding-top: 16px;
  `,
  advancedConfigOpen: (theme: ITheme) => css`
    border-top-color: ${theme.colorBorder};
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
