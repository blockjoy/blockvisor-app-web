import { css } from '@emotion/react';
import { rgba } from 'polished';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  cardHeader: (theme: ITheme) => css`
    position: sticky;
    z-index: 2;
    top: 72px;
    display: flex;
    align-items: center;
    width: 100%;
    padding-top: 22px;
    padding-bottom: 20px;
    min-height: 88px;
    border-bottom: 1px solid ${theme.colorBorder};
    background: ${rgba(theme.colorBackground || '#000', 0.7)};
    backdrop-filter: blur(10px);

    h2 {
      font-size: 16px;
    }

    @media ${breakpoints.toSml} {
      gap: 10px;
      flex-wrap: wrap;
    }
  `,
  cardTitle: (theme: ITheme) => css`
    font-size: 16px;
    text-transform: capitalize;
  `,
  cardTitleClickable: css`
    cursor: pointer;
  `,
  cardIcon: (theme: ITheme) => css`
    background: ${theme.colorInput};
    width: 40px;
    min-width: 40px;
    height: 40px;
    border-radius: 50%;
    display: grid;
    place-items: center;

    path {
      fill: ${theme.colorPrimary};
    }

    @media ${breakpoints.fromSml} {
      margin-right: 16px;
    }
  `,
};
