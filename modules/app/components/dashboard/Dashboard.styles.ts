import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const dashboardNodeStyles = {
  list: (theme: ITheme) => css`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;

    @media only screen and (min-width: ${theme.screenSm}) {
      flex-wrap: nowrap;
      gap: 32px;
    }
  `,
  itemBlock: (theme: ITheme) => css`
    padding-right: 16px;
    color: ${theme.colorText};

    & path {
      fill: ${theme.colorText};
    }

    @media only screen and (min-width: ${theme.screenSm}) {
      padding-right: 30px;
    }

    &:first-of-type {
      border-right: 1px solid ${theme.colorBorder};
    }

    &:nth-of-type(2) {
      padding-right: 8px;
    }
  `,
  itemBlockPrimary: (theme: ITheme) => css`
    color: ${theme.colorPrimary};

    & path {
      fill: ${theme.colorPrimary};
    }
  `,
  itemBlockGreyedOut: (theme: ITheme) => css`
    color: ${theme.colorLabel};

    & path {
      fill: ${theme.colorLabel};
    }
  `,
  itemValue: (theme: ITheme) => css`
    display: block;
    font-size: 28px;
    margin-bottom: 6px;
    color: inherit;

    @media only screen and (min-width: ${theme.screenSm}) {
      font-size: 40px;
    }
  `,
  itemLabel: (theme: ITheme) => css`
    display: flex;
    gap: 6px;
    font-size: 14px;
  `,
};
