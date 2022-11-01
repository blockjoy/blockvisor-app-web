import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  grid: css`
    display: grid;
    gap: 16px;
    grid-template-columns: 1fr;
    grid-auto-rows: 160px;
    padding-top: 36px;

    @media ${breakpoints.fromSml} {
      grid-template-columns: repeat(2, 1fr);
    }

    @media ${breakpoints.fromXLrg} {
      grid-template-columns: repeat(3, 1fr);
    }

    @media ${breakpoints.fromHuge} {
      grid-template-columns: repeat(4, 1fr);
    }
  `,
  gridHeader: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 120px;
  `,
  gridHeaderSortBy: css`
    display: flex;
    align-items: center;
    gap: 8px;
    width: 120px;
    background: transparent;
    color: rgba(255, 255, 255, 0.3);
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 10px;
    border: 0;
    cursor: pointer;

    & path {
      fill: rgba(255, 255, 255, 0.3);
    }
  `,
  gridHeaderTotal: (theme: ITheme) => css`
    color: ${theme.colorText};
    flex: 1;
    text-align: center;
    font-size: 13px;
    white-space: nowrap;
  `,
  cell: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 4px;
    min-width: 0;
    padding: 20px;
    background: rgba(248, 250, 246, 0.03);
    cursor: pointer;
  `,
  cellHeader: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 16px;
  `,
  cellMoreIcon: css`
    width: 16px;
    height: 16px;
    rotate: 90deg;

    svg {
      width: 100%;
      height: 100%;
    }

    path {
      fill: rgba(255, 255, 255, 0.3);
    }
  `,
  cellTitle: css`
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  cellStatus: css`
    display: inline-block;
  `,
  cellEarnings: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    color: ${theme.colorLabel};
    margin-bottom: 16px;
  `,
};
