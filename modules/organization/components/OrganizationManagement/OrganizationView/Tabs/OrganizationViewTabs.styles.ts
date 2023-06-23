import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  tabs: (theme: ITheme) => css`
    display: flex;
    gap: 16px;
    height: 56px;
    border-bottom: 1px solid ${theme.colorBorder};
    margin-bottom: 20px;

    @media ${breakpoints.toXlrg} {
      .metrics {
        display: none;
      }
    }
  `,
  tabButton: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    color: ${theme.colorLabel};
    padding-top: 2px;
    border-bottom: 2px solid transparent;
  `,
  tabButtonActive: (theme: ITheme) => css`
    color: ${theme.colorText};
    border-bottom-color: ${theme.colorDefault};
  `,
};
