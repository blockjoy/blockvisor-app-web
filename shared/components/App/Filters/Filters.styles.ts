import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  filters: css`
    overflow: auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  wrapper: css`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    min-height: 0;
    transition-property: height;
    transition-duration: 0.3s;

    @media ${breakpoints.toXlrg} {
      height: 0;
      overflow: hidden;
    }
  `,
  wrapperOpen: css`
    @media ${breakpoints.toXlrg} {
      height: auto;
    }
  `,
  skeleton: css`
    margin-bottom: 20px;

    @media ${breakpoints.toXlrg} {
      margin-top: 20px;
    }
  `,
  resetButton: (theme: ITheme) => css`
    background: transparent;
    border: 0;
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${theme.colorDefault};
    font-size: 16px;
    height: 40px;
    cursor: pointer;
    transition: 0.3s;
    margin-top: 7px;

    path {
      fill: ${theme.colorDefault};
      transition: 0.3s;
    }

    :hover {
      color: ${theme.colorText};

      & path {
        fill: ${theme.colorText};
      }
    }
  `,
  updateButton: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 13px;
    font-weight: 600;
    height: 36px;
    min-height: 36px;
    max-height: 36px;
    padding: 0 16px;
    border: 0;
    border-radius: 6px;
    background: ${theme.colorPrimary};
    color: ${theme.colorPrimaryText};
    cursor: pointer;

    path {
      fill: ${theme.colorPrimaryText};
    }

    &:hover {
      color: ${theme.colorPrimaryText};
    }

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  `,
  form: css`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    min-height: 0;
    gap: 16px;
  `,
  search: css`
    @media ${breakpoints.toXlrg} {
      padding: 2px;
    }

    input {
      height: 38px;
    }
  `,
};
