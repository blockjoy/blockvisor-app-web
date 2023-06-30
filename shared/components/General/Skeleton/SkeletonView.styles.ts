import { css, keyframes } from '@emotion/react';

const appear = keyframes`
    0% {
        visibility: hidden;
    }
    100%{
        visibility: visible;
    }
`;

export const styles = {
  wrapper: css`
    display: grid;
    gap: 20px;
    visibility: hidden;
    animation: ${appear} 0.01s 0.1s both;
  `,
};
