import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  inputWrapper: css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media ${breakpoints.toMed} {
      width: 100%;
    }
  `,
  blockchainInput: (theme: ITheme) => css`
    flex: 1 1 auto;
    height: 44px;
    /* padding-left: 40px; */
    padding-left: 16px;
    color: ${theme.colorText};
    border: 2px solid transparent;
    outline: none;
    border-radius: 6px;
    background: #3b403e;

    @media ${breakpoints.fromMed} {
      flex: 1 1 360px;
      min-width: 360px;
      max-width: 360px;
    }

    /* :focus {
      border-color: ${theme.colorPrimary};
    } */
  `,
  blockchainInputOpen: css`
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  `,
  blockchainIcon: css`
    position: absolute;
    left: 12px;
    top: 50%;
    translate: 0 -50%;
    height: 20px;

    & path {
      fill: #7e827a;
    }
  `,
  createButton: (theme: ITheme) => css`
    position: absolute;
    top: 6px;
    right: 5px;
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: 4px;
    background: ${theme.colorPrimary};
    cursor: pointer;

    :disabled {
      background: rgba(0, 0, 0, 0.2);
      cursor: not-allowed;

      & path {
        fill: rgba(255, 255, 255, 0.2);
      }
    }
  `,
  closeButton: (theme: ITheme) => css`
    position: absolute;
    top: 6px;
    right: 5px;
    width: 32px;
    height: 32px;
    border: 0;
    background: transparent;
    cursor: pointer;

    & path {
      fill: ${theme.colorText};
    }
  `,
};
