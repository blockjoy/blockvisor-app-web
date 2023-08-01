import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px;
    padding-left: 60px;
    border-bottom: 1px solid ${theme.colorBorder};
    box-sizing: border-box;
  `,
  wrapperSidebarOpen: css`
    padding-right: 16px;
  `,
  infoIcon: (theme: ITheme) => css`
    & path {
      fill: ${theme.colorDefault};
    }
  `,
};
