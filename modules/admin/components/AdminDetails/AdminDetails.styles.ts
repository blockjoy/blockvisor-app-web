import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
  `,
};
