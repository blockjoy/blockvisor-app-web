import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  summary: (theme: ITheme) => css`
    border: 1px solid ${theme.colorBorder};
    border-radius: 6px;
    padding: 16px 16px 0;
    margin-bottom: 16px;

    @media ${breakpoints.toXlrg} {
      max-width: 100%;
    }
  `,
  summaryList: (theme: ITheme) => css`
    display: grid;
    gap: 16px;
    margin: 0 0 20px;

    li {
      min-width: 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    li label {
      display: block;
      width: 140px;
      margin-bottom: 4px;
      font-size: 14px;
      color: ${theme.colorLabel};
      width: 100%;
    }

    li div {
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      min-width: 0;
    }
  `,
  summaryIcon: (theme: ITheme) => css`
    height: 24px;
    width: 24px;
  `,
  serverError: (theme: ITheme) => css`
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 16px;
    line-height: 1.45;
    border-radius: 4px;
    font-weight: 600;
    background: ${theme.colorDanger};
    color: ${theme.colorPrimaryText};
  `,
  missingFieldsTitle: (theme: ITheme) => css`
    color: ${theme.colorLabel};
    font-size: 13px;
    margin-bottom: 8px;
    padding-left: 32px;
  `,
  missingFields: css`
    display: grid;
    grid-auto-rows: 26px;
    margin-bottom: 20px;

    div {
      display: flex;
      align-items: center;
      padding-left: 32px;
      font-size: 14px;
    }
  `,
};
