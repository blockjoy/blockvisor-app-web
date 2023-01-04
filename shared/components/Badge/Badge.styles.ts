import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  badge: (theme: ITheme) => css`
    display: grid;
    place-items: center;
    height: 18px;
    min-width: 32px;
    padding: 0 4px;
    border-radius: 9px;
    font-size: 10px;
    font-weight: 600;
    background: ${theme.colorDanger};
    color: ${theme.colorBackground};
  `,
};
