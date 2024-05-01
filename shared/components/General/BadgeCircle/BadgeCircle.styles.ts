import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  badge: (theme: ITheme) => css`
    position: absolute;
    top: 2px;
    right: 2px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    font-size: 10px;
    font-weight: 600;
    display: grid;
    place-items: center;
    color: ${theme.colorPrimaryText};
    background: ${theme.colorPrimary};
    border: 3px solid ${theme.colorBackground};
  `,
};
