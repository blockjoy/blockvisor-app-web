import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  tabs: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    gap: 16px;
    height: 56px;
    margin-bottom: 20px;
    border-bottom: 1px solid ${theme.colorBorder};
  `,
  tabButton: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    height: 100%;
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
    width: 370px;

    @media ${breakpoints.toXHuge} {
      display: none;
    }

    @media ${breakpoints.fromXHuge} {
      width: 430px;
    }
  `,
};
