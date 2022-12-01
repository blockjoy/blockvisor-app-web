import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    position: absolute;
    z-index: 2;
    top: 44px;
    left: 50%;
    translate: -50% 0;
    width: 360px;
    max-width: 360px;
    min-width: 360px;
    background: #3b403e;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    overflow: hidden;

    @media ${breakpoints.toMed} {
      width: 100%;
      max-width: 100%;
      min-width: 100%;
    }
  `,
  button: (theme: ITheme) => css`
    background: transparent;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    height: 44px;
    padding: 0 12px;
    text-align: left;
    border: 0;
    color: ${theme.colorText};
    cursor: pointer;
    font-size: 14px;

    :nth-child(odd) {
      background: rgba(0, 0, 0, 0.2);
    }

    &:hover {
      background: ${theme.colorPrimary};
      color: ${theme.colorPrimaryText};

      path {
        fill: ${theme.colorPrimaryText};
      }
    }
  `,
};
