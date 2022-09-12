import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const nodesStyles = {
  added: (theme: ITheme) => css`
    color: ${theme.colorLabel};
  `,
  addedCell: (theme: ITheme) => css`
    display: block;
    margin-top: 20px;
    font-size: 13px;
    color: ${theme.colorLabel};

    @media only screen and (min-width: ${theme.screenSm}) {
      display: none;
    }
  `,
  status: (theme: ITheme) => css`
    font-size: 12px;
    letter-spacing: 1px;
    color: ${theme.colorDefault};
  `,
};
