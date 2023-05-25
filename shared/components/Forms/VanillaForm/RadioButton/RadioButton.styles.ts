import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    position: relative;
    padding: 25px;
    background-color: ${theme.colorOverlay};
    cursor: pointer;
    border-radius: 3px;
    display: flex;
    flex-flow: column nowrap;
    flex: 1;

    &.active {
      background-color: ${theme.colorPrimary};
      color: ${theme.colorPrimaryText};
    }
  `,

  input: (theme: ITheme) => css`
    position: absolute;
    top: 12px;
    right: 12px;
    cursor: pointer;

    &::before {
      -webkit-transition: -webkit-transform 0.4s
        cubic-bezier(0.45, 1.8, 0.5, 0.75);
      -moz-transition: -moz-transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
      transition: transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
      -webkit-transform: scale(0, 0);
      -moz-transform: scale(0, 0);
      -ms-transform: scale(0, 0);
      -o-transform: scale(0, 0);
      transform: scale(0, 0);
      content: '';
      position: absolute;
      top: 0;
      left: 0.125rem;
      z-index: 1;
      width: 0.75rem;
      height: 0.75rem;
      background: ${theme.colorOverlay};
      border-radius: 50%;
    }
    &:checked::before {
      -webkit-transform: scale(1, 1);
      -moz-transform: scale(1, 1);
      -ms-transform: scale(1, 1);
      -o-transform: scale(1, 1);
      transform: scale(1, 1);
    }

    &::after {
      content: '';
      position: absolute;
      transform: translate(-0.1rem, -0.225rem);
      width: 1.2rem;
      height: 1.2rem;
      background: ${theme.colorText};
      border-radius: 50%;
    }
  `,
};
