import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  item: (theme: ITheme) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    border: 1px solid ${theme.colorBorderGrey};
    border-radius: 6px;
    line-height: 1.25;
    cursor: pointer;

    > h4 {
      font-size: 14px;
      font-weight: 700;
      text-transform: capitalize;
    }

    > p {
      font-size: 12px;
    }
  `,
  itemActive: (theme: ITheme) => css`
    border-color: ${theme.colorPrimary};
  `,
  itemDisabled: (theme: ITheme) => css`
    color: rgb(255 255 255 / 25%);
    border-color: rgb(255 255 255 / 5%);
    background: transparent;
    cursor: not-allowed;
  `,
};
