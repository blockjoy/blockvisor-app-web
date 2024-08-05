import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
  `,
  item: (theme: ITheme) => css`
    display: flex;
    padding: 15px 10px 15px 0;

    :is(:last-child) {
      span:first-child {
        font-size: 16px;
        font-weight: 700;
      }

      span:last-child {
        font-size: 22px;
        font-weight: 700;
      }
    }

    :is(:not(:last-child)) {
      border-bottom: 1px solid ${theme.colorBorder};
    }
  `,
  itemTitle: (theme: ITheme) => css`
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    width: 50%;
    font-size: 12px;
    text-transform: uppercase;
    color: ${theme.colorDefault};
  `,
  itemData: css`
    display: flex;
    justify-content: flex-end;
    width: 50%;
    font-size: 18px;
    line-height: 1;
  `,
};
