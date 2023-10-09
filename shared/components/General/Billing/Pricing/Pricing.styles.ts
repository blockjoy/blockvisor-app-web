import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  `,
  priceWrapper: css`
    display: flex;
    align-items: flex-end;
  `,

  priceSubtotal: (theme: ITheme) => css`
    text-decoration: line-through;
    font-size: 12px;
    margin-right: 2px;
    color: ${theme.colorDefault};
  `,
  priceTotal: css`
    font-size: 18px;
    margin-right: 2px;
  `,
  priceLabel: css`
    font-size: 12px;
  `,
  promo: (theme: ITheme) => css`
    display: flex;
    width: 80px;
    cursor: pointer;
    font-size: 11px;
    color: ${theme.colorDefault};

    :hover {
      text-decoration: underline;
    }
  `,
};
