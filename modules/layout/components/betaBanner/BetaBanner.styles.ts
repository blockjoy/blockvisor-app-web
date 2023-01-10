import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    position: fixed;
    display: grid;
    place-items: center;
    height: 30px;
    z-index: 6;
    width: 100%;
    font-weight: 600;
    font-size: 13px;
    background: ${theme.colorPrimary};
    color: ${theme.colorPrimaryText};
  `,
};
