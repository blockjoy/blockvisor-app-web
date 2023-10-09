import { css, keyframes } from '@emotion/react';
import { ITheme } from 'types/theme';

const move = keyframes`
  0% {
    translate: 0 0;
  }
  100% {
    translate: -35px 0;
  }
`;

export const styles = {
  backgroundWrapper: (theme: ITheme) => css`
    position: absolute;
    z-index: 0;
    overflow: hidden;
    top: 0;
    left: 0;
    bottom: 0;
    opacity: 0.5;
    transition: width 0.3s;

    ::before,
    ::after {
      content: '';
      position: inherit;
      top: 0;
      bottom: 0;
    }

    ::before {
      z-index: 2;
      right: 0;
      width: 100%;
      background: linear-gradient(transparent, ${theme.colorCard} 100%);
    }

    ::after {
      z-index: 1;
      left: -50%;
      width: 350px;
      background: repeating-linear-gradient(
        45deg,
        rgb(255 255 255 / 20%),
        rgb(255 255 255 / 20%) 6px,
        rgb(255 255 255 / 10%) 6px,
        rgb(255 255 255 / 10%) 12px
      );
      animation: ${move} 0.8s infinite linear;
    }
  `,
  background: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  `,
  value: (theme: ITheme) => css`
    color: ${theme.colorPrimary};
    font-style: normal;
    font-size: 10px;
    position: absolute;
    top: 50%;
    right: 8px;
    line-height: 1;
    transform: translateY(-50%);
  `,
};
