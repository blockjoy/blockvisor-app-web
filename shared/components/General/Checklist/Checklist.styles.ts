import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  container: css`
    margin: 32px 0 20px;
    margin-bottom: 20px;
  `,
  li: (theme: ITheme) => css`
    font-size: 14px;
    padding: 15px 0;
    border-top: 1px solid ${theme.colorBorderGrey};
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    gap: 10px;
  `,
  title: css`
    font-weight: 600;
  `,
};
