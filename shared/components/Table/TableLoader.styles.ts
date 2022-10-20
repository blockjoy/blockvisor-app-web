import { css, keyframes } from '@emotion/react';
import { ITheme } from 'types/theme';

const spinKeyframes = keyframes`
    100% { transform: rotate(360deg); }
`;

export const styles = {
  wrapper: css`
    position: absolute;
    top: -5%;
    left: -5%;
    display: grid;
    place-items: center;
    width: 110%;
    height: 110%;
    backdrop-filter: blur(4px);
    visibility: hidden;
    opacity: 0;
    transition: all 0.4s;
  `,
  loading: css`
    visibility: visible;
    opacity: 1;
  `,
  spinner: (theme: ITheme) => css`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 3px solid ${theme.colorLightGrey};
    border-top-color: ${theme.colorPrimary};
    animation: ${spinKeyframes} 0.7s infinite linear;
  `,
};
