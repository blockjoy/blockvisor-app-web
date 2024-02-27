import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    display: flex;
    flex-flow: row wrap;
  `,

  container: css`
    &:not(:last-child) {
      margin-right: 10px;
    }
  `,
};
