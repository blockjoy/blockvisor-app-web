import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const breadcrumbStyles = {
  wrapper: (theme: ITheme) => css`
    position: fixed;
    z-index: 5;
    top: 0;
    left: 300px;
    display: none;
    align-items: center;
    gap: 10px;
    height: 56px;
    padding: 0 24px;
    font-size: 13px;

    @media only screen and (min-width: ${theme.screenSm}) {
      display: flex;
    }
  `,
  item: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    gap: 12px;

    &:first-of-type > span {
      color: ${theme.colorPrimary};
    }
  `,
  text: (theme: ITheme) => css`
    color: ${theme.colorLabel};
  `,
};
