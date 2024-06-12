import { css, keyframes } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

const spin = keyframes`
  100% {
    transform: rotate(1turn);
  }
`;

const move = keyframes`
  0% {
    translate: 25px 0;
  }
  100% {
    translate: -20px 0;
  }
`;

export const styles = {
  wrapper: (theme: ITheme) => css`
    padding: 10px 0 10px 24px;
    flex: 1 1 400px;
    max-width: 400px;
    border-left: 1px solid ${theme.colorBorder};

    @media ${breakpoints.toXlrg} {
      padding: 10px;
      max-width: 100%;
      width: 100%;
      min-width: 100%;
      border-left: 0;
      border-top: 1px solid ${theme.colorBorder};
    }
  `,
  buttons: css`
    display: flex;
    gap: 10px;
    position: relative;

    :hover .tooltip {
      opacity: 1;
      visibility: visible;
    }
  `,
  createButton: (theme: ITheme) => css`
    position: relative;
    overflow: hidden;
    background: ${theme.colorPrimary};
    color: ${theme.colorPrimaryText};
    border: 0;
    height: 48px;
    width: 100%;
    font-weight: 600;
    padding: 0 30px 0 20px;
    border-radius: 4px;
    cursor: pointer;
    white-space: nowrap;
    transition: 0.3s;

    @media ${breakpoints.toXlrg} {
      margin-bottom: 100px;
    }

    svg {
      width: 20px;
      height: 20px;
    }

    path {
      fill: ${theme.colorPrimaryText};
    }

    ::before,
    ::after {
      content: '';
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      visibility: hidden;
      transition: 0.3s;
    }

    ::before {
      background: repeating-linear-gradient(
        60deg,
        transparent,
        transparent 10px,
        rgba(0, 0, 0, 0.05) 10px,
        rgba(0, 0, 0, 0.05) 20px
      );
      animation: ${move} 0.5s infinite linear;
    }

    ::after {
      background: linear-gradient(transparent, ${theme.colorPrimary} 60%);
    }

    :disabled {
      cursor: not-allowed;
      opacity: 0.25;
    }

    :not(:disabled):is(:focus, :hover, :active) {
      box-shadow: 0px 0px 0px 3px var(--color-primary-o30);
    }

    @media ${breakpoints.fromLrg} {
      width: 300px;
    }

    @media ${breakpoints.fromXLrg} {
      width: 100%;
    }
  `,
  createButtonInner: css`
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 12px;
  `,
  createButtonLoading: css`
    &::before,
    &::after {
      opacity: 1;
      visibility: visible;
    }
  `,
  cogIcon: css`
    display: grid;
    place-items: center;
    width: 20px;
    height: 20px;
    animation: ${spin} 0.9s infinite linear;
  `,
  autoSelect: (theme: ITheme) => css`
    position: relative;
    display: inline-block;
    color: ${theme.colorDefault};
    margin-left: 10px;
    padding-bottom: 2px;
    font-size: 13px;
    bottom: -1px;

    :hover {
      color: ${theme.colorText};

      ::after {
        opacity: 1;
        background: ${theme.colorText};
      }
    }

    ::after {
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: ${theme.colorDefault};
      opacity: 0;
      transition: 0.2s;
    }
  `,
};
