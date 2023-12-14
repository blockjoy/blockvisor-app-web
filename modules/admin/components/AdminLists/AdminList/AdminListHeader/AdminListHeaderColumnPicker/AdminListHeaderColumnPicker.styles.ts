import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    position: relative;
  `,
  title: (theme: ITheme) => css`
    color: ${theme.colorDefault};
    padding: 16px 10px 10px;
    font-size: 13px;
  `,
  item: css`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 52px 0 10px;
    height: 36px;
    cursor: pointer;
    font-size: 13px;

    :hover {
      background: rgb(255 255 255 / 5%);
    }
  `,
};
