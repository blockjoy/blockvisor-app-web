import { css, keyframes } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

const spin = keyframes`
  100% {
    transform: rotate(1turn);
  }
`;

export const styles = {
  wrapper: css`
    position: relative;
    display: flex;
    justify-content: flex-start;
  `,
  dropdown: css`
    top: 54px;
    right: 0;
    left: auto;
    width: 100%;
    min-width: max-content;
    max-width: 200px;

    @media ${breakpoints.toLrg} {
      left: 0;
      right: auto;
    }
  `,
  dropdownItem: css`
    padding-left: 18px;
    padding-right: 20px;
    gap: 12px;
  `,
  dropdownButton: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: ${theme.colorInput};
    border-radius: 6px;
    border: 0;
    padding: 0 14px 0 16px;
    height: 44px;
    color: ${theme.colorDefault};
    cursor: pointer;
    transition: 0.3s;

    svg path {
      fill: ${theme.colorDefault};
      transition: 0.3s;
    }

    :is(:hover, :active, :focus) {
      color: ${theme.colorText};
      box-shadow: 0px 0px 0px 2px rgba(255, 255, 255, 0.1);

      svg path {
        fill: ${theme.colorText};
      }
    }
  `,
  dropdownText: (theme: ITheme) => css`
    font-size: 14px;
    color: ${theme.colorDefault};
  `,
  icon: (theme: ITheme) => css`
    pointer-events: none;
    transition: transform 0.3s;

    svg path {
      fill: ${theme.colorLabel};
    }
  `,
  cogIcon: css`
    animation: ${spin} 0.9s infinite linear;
  `,
  iconActive: css`
    transform: rotate(-180deg);
  `,
  borderTop: css`
    border-top: 1px solid rgb(255 255 255 / 20%);
  `,
  scrollbar: css`
    max-height: inherit;
  `,
};
