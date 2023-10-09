import { css, keyframes } from '@emotion/react';
import { ITheme } from 'types/theme';

const spin = keyframes`
    100% { transform: rotate(1turn); }
`;

export const styles = {
  wrapper: css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: grid;
    place-items: center;
    gap: 30px;
  `,
  spinner: (theme: ITheme) => css`
    width: 130px;
    height: 130px;
    border-radius: 50%;
    border: 4px solid ${theme.colorInput};
    border-top-color: ${theme.colorPrimary};
    animation: ${spin} 0.8s infinite linear;
  `,
};
