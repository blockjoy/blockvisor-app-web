import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (bottomBorder?: boolean) => (theme: ITheme) =>
    css`
      display: flex;
      flex-direction: column;
      ${bottomBorder &&
      `padding-bottom: 10px;
      border-bottom: 1px solid ${theme.colorBorder};
      `}
    `,
  titleWrapper: css`
    display: flex;
    flex-direction: row;
    gap: 8px;
    margin-bottom: 10px;
  `,
  title: css`
    font-size: 14px;
  `,
  content: css``,
};
