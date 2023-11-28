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
  summary: (theme: ITheme) => css`
    border: 1px solid ${theme.colorBorder};
    border-radius: 6px;
    padding: 16px 16px 0;
    margin-bottom: 16px;

    @media ${breakpoints.toXlrg} {
      max-width: 100%;
    }
  `,
  summaryList: (theme: ITheme) => css`
    display: grid;
    gap: 16px;
    margin: 0 0 20px;

    li {
      min-width: 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    li label {
      display: block;
      width: 140px;
      margin-bottom: 4px;
      font-size: 14px;
      color: ${theme.colorLabel};
      width: 100%;
    }

    li div {
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      min-width: 0;
    }
  `,
  summaryIcon: (theme: ITheme) => css`
    height: 24px;
    width: 24px;
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
  serverError: (theme: ITheme) => css`
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 16px;
    line-height: 1.45;
    border-radius: 4px;
    font-weight: 600;
    background: ${theme.colorDanger};
    color: ${theme.colorPrimaryText};
  `,
  missingFieldsTitle: (theme: ITheme) => css`
    color: ${theme.colorLabel};
    font-size: 13px;
    margin-bottom: 8px;
    padding-left: 32px;
  `,
  missingFields: css`
    display: grid;
    grid-auto-rows: 26px;
    margin-bottom: 20px;

    div {
      display: flex;
      align-items: center;
      padding-left: 32px;
      font-size: 14px;
    }
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
