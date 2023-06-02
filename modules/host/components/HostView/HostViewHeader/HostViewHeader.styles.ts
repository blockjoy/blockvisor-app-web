import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  header: (theme: ITheme) => css`
    display: flex;
    gap: 12px;
    align-items: center;
    min-height: 100px;
    margin-bottom: 0;
    border-bottom: 1px solid ${theme.colorBorder};

    @media ${breakpoints.toLrg} {
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 16px;
      padding: 20px 0;
    }
  `,
  detailsHeader: css`
    display: flex;
    gap: 10px;
    margin-bottom: 4px;

    @media ${breakpoints.toXlrg} {
      flex-direction: column;
      margin-bottom: 2px;
      font-size: 20px;
    }

    word-break: break-word;
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
