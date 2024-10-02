import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  item: css`
    word-break: break-word;
    :hover {
      background: rgb(255 255 255 / 5%);
    }
  `,
  scrollbar: css`
    max-height: 260px;
    height: max-content;

    ::-webkit-scrollbar-track {
      background: rgb(255 255 255 / 10%);
    }
  `,
};
