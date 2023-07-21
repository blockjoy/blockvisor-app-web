import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    background-color: ${theme.colorCard};
    padding: 20px;
    border-radius: 4px;
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
  `,
  titleWrapper: css`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  `,
  title: css`
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1.25px;
  `,
  pricing: css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    text-transform: uppercase;
    margin: 32px 0 20px;
  `,
  price: css`
    font-size: 22px;
    color: #fff;
    max-width: 110px;
  `,
  priceLabel: (theme: ITheme) => css`
    font-size: 10px;
    line-height: 16px;
    color: ${theme.colorTextGrey};
    letter-spacing: 1.25px;
    font-family: var(--font-family-primary);
  `,
  description: css`
    font-size: 14px;
    line-height: 1.25;
  `,
};
