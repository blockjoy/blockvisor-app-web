import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  button: (theme: ITheme) => css`
    position: fixed;
    z-index: 10;
    right: 20px;
    bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 0 32px 0 24px;
    height: 64px;
    border-radius: 32px;
    background: ${theme.colorPrimary};
    color: ${theme.colorPrimaryText};
    border: 0;
    cursor: pointer;

    :hover svg {
      scale: 1.1;
    }

    svg {
      transition: 0.3s;
      height: 40%;
    }

    @media ${breakpoints.toLrg} {
      padding: 0;
      width: 64px;
    }
  `,
  buttonText: (theme: ITheme) => css`
    color: ${theme.colorPrimaryText};
    font-weight: 600;
    font-size: 17px;

    @media ${breakpoints.toLrg} {
      display: none;
    }
  `,
};
