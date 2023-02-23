import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    overflow-x: hidden;
    overflow-y: auto;

    ::-webkit-scrollbar {
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: ${theme.colorLabel};
    }
  `,
};
