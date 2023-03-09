import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  header: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
  headline: css`
    font-size: 20px;
  `,
  info: (theme: ITheme) => css`
    font-size: 10px;
    margin-top: 10px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 8px;
    color: ${theme.colorPlaceholder};
  `,
  details: css`
    margin-top: 40px;
  `,
};
