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
    padding-left: 56px;
    color: ${theme.colorText};
    border: 2px solid transparent;
    outline: none;
    border-radius: 6px;
    background: #3b403e;

    @media ${breakpoints.fromMed} {
      flex: 1 1 580px;
      min-width: 580px;
      max-width: 580px;
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
    top: 50%;
    left: 5px;
    translate: 0 -50%;
    width: 42px;
    height: 24px;
    padding: 12px;
    border: 0;
    border-right: 1px solid ${theme.colorLabel};
    display: grid;
    place-items: center;
    pointer-events: none;
    background: transparent;

    & path {
      fill: ${theme.colorPrimary};
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
