import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  filterBlock: (theme: ITheme) => css`
    margin-right: 16px;
    padding: 12px;
    border-radius: 4px;
    border: 1px solid ${theme.colorBorder};
    cursor: pointer;
  `,
  labelHeader: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  `,
  labelText: (theme: ITheme) => css`
    color: ${theme.colorDefault};
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;

    rect,
    path {
      fill: red;
    }
  `,
  labelIcon: (theme: ITheme) => css`
    display: grid;
    place-items: center;
    width: 10px;
    height: 10px;
    background: transparent;
    border: 0;

    rect,
    path {
      fill: ${theme.colorText};
    }
  `,
  checkboxList: css`
    display: grid;
    gap: 8px;
    max-height: 122px;
    padding-top: 16px;
    overflow: hidden;
  `,
  checkboxListShowAll: css`
    max-height: 20000px;
    padding-bottom: 0;
  `,
  checkboxRow: (theme: ITheme) => css`
    display: flex;
    gap: 10px;
    font-size: 14px;
    color: ${theme.colorDefault};
  `,
  selectedFilterRow: (theme: ITheme) => css`
    display: flex;
    gap: 8px;
    font-size: 14px;

    path {
      fill: ${theme.colorPrimary};
    }
  `,
  showMore: (theme: ITheme) => css`
    background: transparent;
    padding: 0;
    border: 0;
    cursor: pointer;
    display: block;
    color: ${theme.colorLabel};
    text-decoration: underline;
    font-size: 13px;
    margin-top: 10px;
    display: block;

    :hover {
      color: ${theme.colorDefault};
    }
  `,
};
