import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px 16px;
  `,
  header: (theme: ITheme) => css`
    color: ${theme.colorLabel};
    letter-spacing: 1.5px;
    font-size: 10px;
    margin-bottom: 16px;
  `,
  list: css`
    margin-bottom: 24px;
  `,
  link: (theme: ITheme) => css`
    display: flex;
    gap: 10px;
    color: ${theme.colorText};
    padding: 12px 10px;
    font-size: 13px;
    border-radius: 8px;
    user-select: none;

    &.active {
      background: ${theme.colorActive};
    }

    & path {
      fill: ${theme.colorLabel};
    }

    &.active path {
      fill: ${theme.colorPrimary};
    }
  `,
};
