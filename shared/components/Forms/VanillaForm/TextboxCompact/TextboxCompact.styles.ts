import { css, keyframes } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-6px); }
  50% { transform: translateX(6px); }
`;

export const styles = {
  wrapper: (theme: ITheme) => css`
    position: relative;
    margin-top: 6px;
    margin-bottom: 6px;
    min-width: 0;
    display: flex;

    :hover input:valid {
      opacity: 1;
      border-color: ${theme.colorLabel};
    }
  `,
  label: (theme: ITheme) => css`
    position: absolute;
    top: 12px;
    left: 0;
    transform-origin: 0% 0%;
    color: ${theme.colorDanger};
    pointer-events: none;
    transition: 0.3s;
  `,
  labelError: (theme: ITheme) => css`
    color: ${theme.colorDanger};
  `,
  input:
    (noBottomMargin: boolean = false) =>
    (theme: ITheme) =>
      css`
        background: transparent;
        border: 0;
        border-bottom: 1px solid ${theme.colorBorder};
        outline: none;
        color: ${theme.colorText};
        height: 44px;
        min-width: 100%;
        border-radius: 0;
        padding: 0;
        ${!noBottomMargin && `margin-bottom: 8px;`};
        opacity: 0.8;

        &,
        p,
        path {
          transition: 0.2s;
        }

        :is(:focus:valid, :active:valid) {
          svg path {
            fill: ${theme.colorText};
          }

          opacity: 1;
          border-color: ${theme.colorBorderGrey};
        }

        :is(:focus, .has-value) {
          ~ label {
            top: -8px;
            transform: scale(0.75);
          }
        }

        :valid ~ label {
          border-color: ${theme.colorLabel} !important;
          color: ${theme.colorLabel};
        }

        @media ${breakpoints.toMed} {
          min-width: 100%;
        }

        @media ${breakpoints.fromXLrg} {
          min-width: 100%;
        }
      `,
  inputRequired: (theme: ITheme) => css`
    &:invalid {
      border-color: ${theme.colorDanger} !important;
    }
  `,
  inputError: (theme: ITheme) => css`
    border-color: ${theme.colorDanger} !important;
  `,
  inputRequiredAnimation: css`
    animation: ${shake} 0.1s 3;
  `,
  asterix: (theme: ITheme) => css`
    color: ${theme.colorDanger};
    margin-left: 4px;
    font-size: 18px;
    position: absolute;
    top: 1px;
  `,
};
