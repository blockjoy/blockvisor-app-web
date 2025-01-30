import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  overlay: css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease-in-out;
    z-index: 999;
  `,
  overlayVisible: css`
    opacity: 1;
    visibility: visible;
  `,
  drawer: (theme: ITheme) => css`
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    max-width: 80%;
    height: 100%;
    transform: translateX(100%);
    z-index: 1000;
    overflow-y: auto;
    transition: transform 0.3s ease-in-out;
    background-color: ${theme.colorBackground};
  `,
  open: css`
    transform: translateX(0);
  `,
  closeButton: (theme: ITheme) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    background: transparent;
    border: 0;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;

    :hover {
      background-color: ${theme.colorOverlay};
    }

    path {
      fill: ${theme.colorText};
    }
  `,
  header: (theme: ITheme) => css`
    padding: 20px 40px 15px 10px;
    position: relative;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    ::after {
      content: '';
      position: absolute;
      bottom: 0;
      height: 1px;
      background-color: ${theme.colorBorderGrey};
      left: 10px;
      right: 10px;
    }
  `,
  content: css`
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  `,
};
