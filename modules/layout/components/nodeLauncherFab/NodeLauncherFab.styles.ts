import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  button: (theme: ITheme) => css`
    position: absolute;
    z-index: 8;
    right: 24px;
    top: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 0 32px 0 24px;
    height: 44px;
    border-radius: 6px;
    background: ${theme.colorPrimary};
    color: ${theme.colorPrimaryText};
    border: 0;
    cursor: pointer;
    white-space: nowrap;

    :hover svg {
      scale: 1.1;
    }

    svg {
      transition: 0.3s;
      height: 35%;
    }

    @media ${breakpoints.toLrg} {
      padding: 0 20px 0 16px;
      scale: 0.8;
      transform-origin: 100% 50%;
    }
  `,
  buttonText: (theme: ITheme) => css`
    color: ${theme.colorPrimaryText};
    font-weight: 600;
    font-size: 16px;
  `,
};
