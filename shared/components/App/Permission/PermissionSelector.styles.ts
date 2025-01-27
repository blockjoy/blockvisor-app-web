import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  container: css`
    display: block;
  `,
  wrapper: css`
    display: grid;
    grid-gap: 10px;
    grid-auto-rows: 0;
    grid-template-columns: repeat(2, minmax(100px, 1fr));
  `,
  group: (theme: ITheme) => css`
    display: grid;
    padding: 15px 10px;
    background-color: ${theme.colorCard};
    border-radius: 6px;
  `,
  itemTitle: css`
    font-size: 16px;
    text-transform: uppercase;
    margin-bottom: 10px;
  `,
  item: css`
    display: grid;
  `,
};
