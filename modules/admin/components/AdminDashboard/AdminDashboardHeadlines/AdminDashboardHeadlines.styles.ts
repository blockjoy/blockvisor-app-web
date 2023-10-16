import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 202px;
    margin-bottom: 10px;

    @media ${breakpoints.toLrg} {
      grid-template-columns: repeat(2, 1fr);
      margin-right: 0;
    }
  `,
  card: (theme: ITheme) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    border: 1px solid ${theme.colorBorder};
    border-radius: 6px;
    padding: 14px 60px 0;

    path {
      fill: ${theme.colorPrimary};
    }
  `,
  cardValue: (theme: ITheme) => css`
    font-style: normal;
    font-size: 20px;
    color: ${theme.colorPrimary};
    text-transform: capitalize;
    margin-bottom: 0px;
  `,
  cardLabel: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    color: ${theme.colorDefault};
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 10px;
    text-align: center;
    min-height: 30px;
    white-space: nowrap;
  `,
};
