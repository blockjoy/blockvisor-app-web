import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    height: 56px;
    border-bottom: 1px solid ${theme.colorBorder};
    margin-bottom: 20px;
  `,
  tabs: () => css`
    display: flex;
    gap: 16px;
    align-self: stretch;
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
  sidePanelHeader: (theme: ITheme) => css`
    color: ${theme.colorText};
    margin-left: auto;
    width: 400px;

    @media ${breakpoints.toXlrg} {
      display: none;
    }
  `,
};
