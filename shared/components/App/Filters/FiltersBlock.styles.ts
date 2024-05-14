import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  checkboxList: css`
    display: flex;
    flex-direction: column;
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
  selectedFilterRowText: css`
    word-break: break-word;
    text-transform: capitalize;
  `,
  checkedIcon: css`
    width: 18px;
    height: 18px;
  `,
};
