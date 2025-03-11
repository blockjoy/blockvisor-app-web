import { css } from '@emotion/react';
import { rgba } from 'polished';
import { ITheme } from 'types/theme';

export const styles = {
  header: css`
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    margin-bottom: 20px;
  `,
  icon: (theme: ITheme) =>
    css`
      background-color: ${theme.colorLightGrey};
      color: ${theme.colorText};
      padding: 10px;
      border-radius: 6px;
    `,
  subtitle: css`
    font-size: 18px;
    font-weight: 700;
  `,
  title: css`
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 8px;
  `,
  description: css`
    font-size: 14px;
  `,
  gridNetwork: css`
    align-items: stretch;
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 1fr 1fr;
  `,
  gridNodeType: css`
    align-items: stretch;
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 1fr;
  `,
  item: (theme: ITheme) => css`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    max-width: 300px;
    border: 1px solid ${theme.colorBorderGrey};
    border-radius: 6px;
    line-height: 1.25;

    > h4 {
      font-size: 14px;
      font-weight: 700;
      text-transform: capitalize;
    }

    > p {
      font-size: 12px;
      color: ${theme.colorTextGrey};
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
  itemNetwork: css`
    width: 100%;
    max-width: 250px;
  `,
  itemNodeType: css`
    width: 100%;
    max-width: 385px;
  `,
  note: (theme: ITheme) => css`
    margin-bottom: 24px;
  `,
  divider: (theme: ITheme) => css`
    border-bottom: 1px solid ${theme.colorBorder};
  `,
};
