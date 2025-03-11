import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  header: css`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  `,
  title: css`
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 8px;
  `,
  subtitle: css`
    font-size: 14px;
  `,

  search: (theme: ITheme) => css`
    margin-bottom: 0;
    min-width: 300px;

    > input {
      border: 1px solid ${theme.colorBorder};
      border-radius: 6px;
    }
  `,
  scrollbar: css`
    min-height: 500px;
    max-height: 100vh;
  `,
};
