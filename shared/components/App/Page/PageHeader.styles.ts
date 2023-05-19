import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  header: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 36px;
    font-size: 20px;
    margin: 0 0 32px;
    color: ${theme.colorText};
  `,
};
