import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const hostStyles = {
  header: css`
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    margin-bottom: 50px;
    color: ${theme.colorLabel};
  `,
  detailsRow: (theme: ITheme) => css`
    display: flex;
    align-items: flex-end;
    height: 50px;
    padding-bottom: 16px;
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
  added: (theme: ITheme) => css`
    display: block;
    margin-top: 20px;
    font-size: 13px;
    color: ${theme.colorLabel};

    @media only screen and (min-width: ${theme.screenSm}) {
      display: none;
    }
  `,
};
