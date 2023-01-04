import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    padding: 20px 0;
  `,
  header: (theme: ITheme) => css`
    display: flex;
    gap: 10px;
    padding: 0 20px;
    margin-bottom: 30px;
    color: ${theme.colorDefault};
  `,
  item: (theme: ITheme) => css`
    padding: 0 20px 20px;
    border-bottom: 1px solid ${theme.colorBorder};
  `,
  buttons: css`
    display: grid;
    grid-template-columns: repeat(2, 90px);
    gap: 8px;
  `,
};
