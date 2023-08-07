import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  header: (theme: ITheme) => css`
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
    min-height: 100px;
    margin-bottom: 0;
    margin-right: 24px;
    border-bottom: 1px solid ${theme.colorBorder};

    @media ${breakpoints.toLrg} {
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 16px;
      padding: 20px 0;
    }

    @media ${breakpoints.toXlrg} {
      margin-right: 0;
    }
  `,
  detailsHeader: css`
    display: flex;
    gap: 10px;
    margin-bottom: 4px;
    white-space: wrap;
    word-break: break-all;

    @media ${breakpoints.toXlrg} {
      display: block;
      flex-direction: column;
      margin-bottom: 2px;
      font-size: 20px;
    }
  `,
  detailsFooter: css`
    display: flex;
    gap: 16px;
    white-space: nowrap;

    @media ${breakpoints.toLrg} {
      gap: 8px;
      flex-wrap: wrap;
      max-width: 100%;
      padding-top: 8px;
    }
  `,
  hostStatus: (theme: ITheme) => css`
    display: flex;
    gap: 4px;
    align-items: center;

    svg > path {
      fill: ${theme.colorPrimary};
    }

    p {
      color: ${theme.colorPrimary};
      font-size: 14px;
    }
  `,
  status: (theme: ITheme) => css`
    color: ${theme.colorPrimary};
  `,
};
