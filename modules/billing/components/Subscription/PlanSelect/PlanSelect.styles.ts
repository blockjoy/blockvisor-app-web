import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    max-width: 500px;
  `,
  headline: css`
    font-size: 16px;
    text-transform: uppercase;
    margin-bottom: 15px;
    font-weight: 700;
  `,
  planTitle: css`
    font-size: 24px;
    font-weight: 700;
  `,
  renewText: css`
    display: flex;
    max-width: 70%;
  `,
  renewSwitch: css`
    display: flex;
    flex: 1;
    margin-bottom: 0;
    justify-content: flex-end;
  `,
  totalPrice: css`
    font-size: 24px;
    font-weight: 700;
  `,
  buttons: css`
    margin-top: 12px;
    display: flex;
    flex-flow: row nowrap;
    gap: 10px;
  `,
  button: css`
    min-width: 120px;
  `,
  features: css`
    display: flex;
    flex-direction: column;
    gap: 8px;

    li {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  `,
  summaryIcon: (theme: ITheme) => css`
    display: inline-flex;
    height: 20px;
    width: 20px;
    path {
      fill: ${theme.colorPrimary};
    }
  `,
};
