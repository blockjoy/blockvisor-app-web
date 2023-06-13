import { css, keyframes } from '@emotion/react';

type Props = {
  size: ButtonSize;
};

const spin = keyframes`
    100% { transform: rotate(1turn); }
`;

const styles = {
  spinner: css`
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 3px solid rgb(255 255 255 / 20%);
    border-top-color: rgb(255 255 255 / 80%);
    animation: ${spin} 0.7s infinite linear;
  `,
  small: css`
    width: 18px;
    height: 18px;
  `,
  medium: css`
    width: 24px;
    height: 24px;
  `,
};

export const ButtonSpinner = ({ size }: Props) => (
  <span className="button-spinner" css={[styles.spinner, styles[size]]} />
);
