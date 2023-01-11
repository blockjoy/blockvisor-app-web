import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  header: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    gap: 16px;
    color: ${theme.colorDefault};
    margin-bottom: 40px;
    margin-top: 40px;
    font-size: 19px;
  `,
  list: (theme: ITheme) => css`
    display: grid;
    gap: 16px;
    margin-bottom: 0;

    li {
      display: flex;
      align-items: center;
      gap: 50px;
      padding-bottom: 12px;
      border-bottom: 1px solid ${theme.colorBorder};

      &:hover > span:first-child {
        color: ${theme.colorText};
      }
    }
  `,
  email: (theme: ITheme) => css`
    display: block;
    color: ${theme.colorDefault};
    margin-bottom: 6px;
    flex: 0 0 300px;
  `,
  created: (theme: ITheme) => css`
    color: ${theme.colorLabel};
    font-size: 14px;
  `,
};
