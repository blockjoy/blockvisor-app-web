import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  cardHeader: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    width: 100%;
    padding-bottom: 20px;
    border-bottom: 1px solid ${theme.colorBorder};
  `,
  cardTitle: (theme: ITheme) => css`
    font-size: 16px;
    text-transform: capitalize;
  `,
  total: (theme: ITheme) => css`
    position: relative;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 0 20px;
    margin: 0 20px;
    border-left: 1px solid ${theme.colorBorderGrey};
    border-right: 1px solid ${theme.colorBorderGrey};

    :hover .tooltip {
      opacity: 1;
      visibility: visible;
    }

    @media ${breakpoints.toXlrg} {
      border: 0;
      margin: 0;
      padding: 0;
    }
  `,
  totalValue: (theme: ITheme) => css`
    display: block;
    font-style: normal;
    font-size: 20px;
    color: ${theme.colorText};
    text-transform: capitalize;
    line-height: 1;
  `,
  totalTooltip: (theme: ITheme) => css`
    position: absolute;
    top: -32px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    background: ${theme.colorTooltip};
    color: ${theme.colorText};
    border-radius: 6px;
    padding: 4px 8px;
    font-size: 12px;
    text-align: center;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
  `,
  cardIcon: (theme: ITheme) => css`
    background: ${theme.colorInput};
    width: 40px;
    min-width: 40px;
    flex: 0 0 40px;
    height: 40px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    margin-right: 16px;
  `,
};
