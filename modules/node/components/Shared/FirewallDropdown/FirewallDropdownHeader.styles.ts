import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  tabs: (theme: ITheme) => css`
    position: relative;
    display: flex;
    gap: 5px;
    border-bottom: 1px solid ${theme.colorBorderGrey};
    margin-bottom: 10px;
  `,
  tabsUnderline: (theme: ITheme) => css`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 60px;
    height: 2px;
    background: ${theme.colorText};
    transition: 0.3s;
  `,
  tabButton: (theme: ITheme) => css`
    display: grid;
    place-items: center;
    background: transparent;
    border: 0;
    padding: 2px 8px 0;
    width: 60px;
    height: 48px;
    font-size: 16px;
    border-bottom: 2px solid transparent;
    color: ${theme.colorLabel};
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      border-color: ${theme.colorBorderGrey};
    }
  `,
  tabButtonActive: (theme: ITheme) => css`
    color: ${theme.colorText};
  `,
  confirmButton: (theme: ITheme) => css`
    position: absolute;
    top: 6px;
    right: 0;
  `,
};
