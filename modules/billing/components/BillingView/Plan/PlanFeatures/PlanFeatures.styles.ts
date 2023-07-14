import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  listContainer: css`
    margin: 32px 0 20px;
    margin-bottom: 20px;
  `,
  list: css``,
  listItem: (theme: ITheme) => css`
    font-size: 14px;
    padding: 12px 0;
    border-top: 1px solid ${theme.colorBorderGrey};
    display: flex;
    flex-flow: row nowrap;
    gap: 10px;

    &:not(:last-child) {
      margin-bottom: 5px;
    }
  `,
  listTitle: css`
    font-weight: 600;
  `,
};
