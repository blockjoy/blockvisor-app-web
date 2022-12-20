import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    padding: 10px 0;
    flex: 1 1 auto;
    width: 500px;
    max-width: 500px;
    min-width: 500px;
    border-left: 1px solid ${theme.colorBorder};

    @media ${breakpoints.toXlrg} {
      max-width: 100%;
      width: 100%;
      border-left: 0;
      border-top: 1px solid ${theme.colorBorder};
    }
  `,
  h2: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    height: 58px;
    font-size: 16px;
    margin: 0;
    font-weight: 400;
    color: ${theme.colorLabel};
    padding: 0 30px;
  `,
  buttons: css`
    display: flex;
    gap: 10px;
  `,
  summary: (theme: ITheme) => css`
    border: 1px solid ${theme.colorBorder};
    border-radius: 6px;
    padding: 16px;
    margin: 0 30px 16px;

    @media ${breakpoints.toXlrg} {
      max-width: 400px;
    }
  `,
  summaryList: (theme: ITheme) => css`
    display: grid;
    gap: 16px;
    margin: 0 0 20px;

    li {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    li label {
      display: block;
      width: 140px;
      margin-bottom: 4px;
      font-size: 14px;
      color: ${theme.colorLabel};
      width: 100%;
    }
  `,
  summaryIcon: (theme: ITheme) => css`
    height: 24px;
    width: 24px;
    path {
      fill: ${theme.colorPrimary};
    }
  `,
  summaryIconClose: (theme: ITheme) => css`
    width: 24px;
    height: 24px;
    padding: 4px;
    display: grid;
    place-items: center;

    path {
      fill: ${theme.colorDanger};
    }
  `,
  createButton: (theme: ITheme) => css`
    background: ${theme.colorPrimary};
    color: ${theme.colorPrimaryText};
    border: 0;
    height: 48px;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 600;
    padding: 0 30px 0 20px;
    border-radius: 4px;
    cursor: pointer;
    white-space: nowrap;

    svg {
      width: 20px;
      height: 20px;
    }

    :disabled {
      opacity: 0.2;
      cursor: not-allowed;
    }
  `,
};
