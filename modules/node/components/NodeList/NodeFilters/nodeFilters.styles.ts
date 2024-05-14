import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  outerWrapper: css`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    @media ${breakpoints.fromXLrg} {
      top: 71px;
      position: sticky;
      flex: 0 0 200px;
      min-width: 200px;
      max-width: 200px;
      height: calc(100vh - 82px);
      padding-right: 16px;
      margin-bottom: 0;
    }
  `,
  outerWrapperCollapsed: css`
    margin-bottom: 0;

    @media ${breakpoints.fromXLrg} {
      max-width: 0;
      min-width: 0;
      padding: 0;
      overflow: hidden;
      margin-bottom: 0;
    }
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
  filters: css`
    overflow: auto;
    min-height: 0;
    margin: 0 0 16px 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
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
  `,
  search: css`
    margin-bottom: 16px;

    input {
      height: 38px;
    }
  `,
};
