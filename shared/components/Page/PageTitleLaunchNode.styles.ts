import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  button: (theme: ITheme) => css`
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

    transition: box-shadow 0.18s var(--transition-easing-cubic);

    &:hover,
    &:active {
      box-shadow: 0px 0px 0px 3px var(--color-primary-o30);
    }

    :hover svg {
      scale: 1.1;
    }

    svg {
      transition: 0.3s;
      height: 16px;
      width: 16px;
      flex: 0 0 16px;
    }

    @media ${breakpoints.toSml} {
      width: 44px;
    }

    @media ${breakpoints.toLrg} {
      gap: 8px;
      padding: 0 10px;
      transform-origin: 100% 50%;
      min-width: 0;

      svg {
        width: 14px;
        flex: 0 0 14px;
      }
    }
  `,
  buttonText: (theme: ITheme) => css`
    display: none;

    @media ${breakpoints.fromSml} {
      display: block;
      color: ${theme.colorPrimaryText};
      font-weight: 600;
      font-size: 16px;
    }
  `,
};
