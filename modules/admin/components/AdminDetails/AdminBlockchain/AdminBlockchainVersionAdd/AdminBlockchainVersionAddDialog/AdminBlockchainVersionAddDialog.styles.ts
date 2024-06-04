import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  overlay: css`
    position: fixed;
    z-index: 11;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgb(0 0 0 / 40%);
    visibility: hidden;
    opacity: 0;
    transition: 0.3s;
  `,
  overlayOpen: css`
    visibility: visible;
    opacity: 1;
  `,
  scrollbar: css`
    height: calc(100vh - 73px);
    padding-bottom: 60px;
    padding-top: 20px;
    margin-right: 10px;
  `,
  dialog: (theme: ITheme) => css`
    background: ${theme.colorBackground};
    position: fixed;
    z-index: 12;
    padding: 0 0 24px;
    top: 0;
    right: 0;
    width: 80%;
    height: 100vh;
    translate: 100% 0;
    transition: 0.3s;

    @media ${breakpoints.fromMed} {
      width: 50%;
    }

    @media ${breakpoints.fromLrg} {
      width: 420px;
    }

    @media ${breakpoints.fromXLrg} {
      width: 500px;
      padding: 0 0 30px;
    }
  `,
  dialogOpen: css`
    translate: 0;
  `,
  dialogHeader: (theme: ITheme) => css`
    font-size: 18px;
    margin: 0;
    height: 72px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    border-bottom: 1px solid ${theme.colorBorder};
  `,
  dialogForm: css`
    display: grid;
    padding: 0 10px 0 20px;
  `,
};
