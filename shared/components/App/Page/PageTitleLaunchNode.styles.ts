import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  button: (theme: ITheme) => css`
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 0;
    margin-left: 8px;
    border-radius: 6px;
    background: ${theme.colorPrimary};
    color: ${theme.colorPrimaryText};
    border: 0;
    cursor: pointer;
    white-space: nowrap;
    transition: box-shadow 0.18s var(--transition-easing-cubic);

    &:hover,
    &:active,
    &:focus {
      box-shadow: 0px 0px 0px 3px var(--color-primary-o30);
    }

    :hover svg {
      scale: 1.1;
    }

    svg {
      transition: 0.3s;
      height: 16px;
      width: 16px;
    }

    @media ${breakpoints.fromSml} {
      padding: 0 24px 0 16px;
    }

    @media ${breakpoints.toSml} {
      width: 44px;
      min-width: 44px;
      max-width: 44px;
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
