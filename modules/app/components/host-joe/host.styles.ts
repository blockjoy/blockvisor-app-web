import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const hostStyles = {
  header: (theme: ITheme) => css`
    flex: 1 1 auto;
    flex-wrap: wrap;
    display: flex;
    gap: 20px;
    justify-content: space-between;
    margin-bottom: 50px;

    @media only screen and (min-width: ${theme.screenSm}) {
      flex-wrap: nowrap;
    }
  `,
  headerTitle: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
  `,
  headerTitleText: (theme: ITheme) => css`
    font-size: 20px;
    color: ${theme.colorText};
  `,
  actions: css`
    display: flex;
    gap: 8px;
  `,
  headerLower: (theme: ITheme) => css`
    display: flex;
    gap: 12px;
    margin-top: 12px;
    color: ${theme.colorLabel};
  `,
  detailsRow: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    padding-top: 18px;
    padding-bottom: 12px;
    border-bottom: 1px solid ${theme.colorBorder};
  `,
  detailsLabel: (theme: ITheme) => css`
    flex: 0 0 160px;
    width: 160px;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: ${theme.colorDefault};
  `,
  detailsValue: (theme: ITheme) => css`
    color: ${theme.colorText};
  `,
  status: (theme: ITheme) => css`
    font-size: 12px;
    line-height: 1;
    color: ${theme.colorPrimary};
  `,
};
