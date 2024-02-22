import { css } from '@emotion/react';
import { rgba } from 'polished';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    margin-bottom: 15px;
  `,
  icon: (theme: ITheme) => css`
    path {
      fill: ${theme.colorPrimary};
    }
  `,
  form: css`
    display: flex;
    flex-flow: row nowrap;
    gap: 5px;

    > div {
      width: 100%;
    }
  `,
  promoWrapper: (theme: ITheme) => css`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 10px;
    border: 1px solid ${theme.colorPrimary};
    border: 1px solid ${rgba(theme.colorPrimary || '#ffffff', 0.25)};
    border-radius: 6px;
    padding: 10px;
  `,
  promoCode: css`
    font-size: 14px;
    margin-bottom: 3px;
    > span {
      font-size: 16px;
      font-weight: 700;
    }
  `,
  promoInfo: (theme: ITheme) => css`
    color: ${theme.colorTextGrey};
    font-size: 12px;
  `,
  promoBtn: (theme: ITheme) => css`
    margin-left: auto;
    color: ${theme.colorDanger};
    font-size: 13px;

    :hover {
      text-decoration: underline;
    }
  `,
  invalid: css`
    border-color: var(--color-utility-warning);
    color: var(--color-utility-warning); ;
  `,
};
