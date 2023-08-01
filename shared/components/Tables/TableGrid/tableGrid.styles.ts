import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  grid: css`
    display: grid;
    gap: 16px;
    grid-template-columns: 1fr;
    grid-auto-rows: 160px;
    padding: 0 0 20px;

    @media ${breakpoints.fromSml} {
      grid-template-columns: repeat(2, 1fr);
    }

    @media ${breakpoints.fromXLrg} {
      grid-template-columns: repeat(3, 1fr);
    }

    @media ${breakpoints.fromHuge} {
      grid-template-columns: repeat(4, 1fr);
    }

    @media ${breakpoints.fromXHuge} {
      grid-template-columns: repeat(5, 1fr);
    }
  `,

  cellIcon: (theme: ITheme) => css`
    align-self: flex-start;
    margin-top: 16px;
    margin-right: 8px;

    > svg {
    }

    > svg > path {
      fill: ${theme.colorDefault};
    }
  `,
  cell: (theme: ITheme) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 1px solid transparent;
    min-width: 0;
    padding: 16px 24px;
    background: ${theme.colorCard};
    cursor: pointer;

    @media ${breakpoints.fromLrg} {
      :hover,
      :active {
        border-color: ${theme.colorBorder};
      }
    }
  `,
  cellHeader: css`
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 4px;
    line-height: 1.6;
    white-space: nowrap;
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
    color: ${theme.colorDefault};
    margin-bottom: 16px;
    font-size: 13px;
    text-transform: capitalize;

    svg path {
      fill: ${theme.colorDefault};
    }
  `,
};
