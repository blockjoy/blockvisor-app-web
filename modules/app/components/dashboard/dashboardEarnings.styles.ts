import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const dashboardEarningsStyles = {
  list: (theme: ITheme) => css`
    display: flex;
    gap: 30px;
    margin-bottom: 50px;
    flex-wrap: wrap;

    @media only screen and (min-width: ${theme.screenSm}) {
      flex-wrap: nowrap;
      gap: 50px;
    }
  `,
  itemHeader: (theme: ITheme) => css`
    color: ${theme.colorLabel};
    letter-spacing: 1px;
    font-size: 12px;
    margin-bottom: 16px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  `,
  itemRow: css`
    display: flex;
    gap: 8px;
    align-items: flex-end;
  `,
  itemValue: (theme: ITheme) => css`
    font-size: 24px;
    line-height: 1;

    @media only screen and (min-width: ${theme.screenSm}) {
      font-size: 36px;
    }
  `,
};
