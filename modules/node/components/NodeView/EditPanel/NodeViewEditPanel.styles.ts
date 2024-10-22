import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    width: 100%;
  `,
  overlay: css`
    position: fixed;
    inset: 0;
    background: rgb(0 0 0 / 25%);
    opacity: 0;
    visibility: hidden;
    transition: 0.3s;
  `,
  overlayVisible: css`
    opacity: 1;
    visibility: visible;
  `,
  editPanel: (theme: ITheme) => css`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 420px;
    background: ${theme.colorCard};
    transform: translateX(100%);
    transition: 0.3s;
  `,
  editPanelVisible: css`
    transform: translateX(0);
  `,
};
