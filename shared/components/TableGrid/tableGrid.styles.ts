import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  grid: css`
    display: grid;
    gap: 16px;
    grid-template-columns: 1fr;
    grid-auto-rows: 140px;

    @media ${breakpoints.fromSml} {
      grid-template-columns: repeat(3, 1fr);
    }

    @media ${breakpoints.fromXLrg} {
      grid-template-columns: repeat(4, 1fr);
    }

    @media ${breakpoints.fromHuge} {
      grid-template-columns: repeat(6, 1fr);
    }
  `,

  cellIcon: (theme: ITheme) => css`
    width: 36px;
    min-width: 36px;
    flex: 0 0 36px;
    align-self: flex-start;
    margin-top: 16px;

    > svg {
    }

    > svg > path {
      fill: ${theme.colorLabel};
    }
  `,
  cell: css`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    min-width: 0;
    padding: 16px;
    background: rgba(248, 250, 246, 0.03);
    cursor: pointer;
  `,
  cellHeader: css`
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 16px;
  `,

  cellRight: css`
    flex: 1 1 auto;
    min-width: 0;
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
    font-size: 13px;
  `,
};
