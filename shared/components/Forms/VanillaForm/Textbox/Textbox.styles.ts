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
    :hover input:valid {
      opacity: 1;
      border-color: ${theme.colorLabel};
    }
  `,
  input:
    (noBottomMargin: boolean = false) =>
    (theme: ITheme) =>
      css`
        background: transparent;
        border: 1px solid ${theme.colorBorder};
        outline: none;
        color: ${theme.colorText};
        height: 44px;
        min-width: 100%;
        border-radius: 6px;
        padding: 0 10px;
        ${!noBottomMargin && `margin-bottom: 20px;`};
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

        @media ${breakpoints.toMed} {
          min-width: 100%;
        }

        @media ${breakpoints.fromXLrg} {
          min-width: 100%;
        }
      `,
  inputRequired: (theme: ITheme) => css`
    &:invalid {
      border-color: ${theme.colorDanger};
    }
  `,
  inputError: (theme: ITheme) => css`
    border-color: ${theme.colorDanger} !important;
  `,
  inputRequiredAnimation: css`
    animation: ${shake} 0.1s 3;
  `,
};
