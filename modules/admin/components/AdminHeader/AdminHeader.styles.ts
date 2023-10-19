import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  cardHeader: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    width: 100%;
    padding-top: 2px;
    padding-bottom: 20px;
    border-bottom: 1px solid ${theme.colorBorder};

    h2 {
      font-size: 16px;
    }

    @media ${breakpoints.toXlrg} {
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 10px;
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
    height: 40px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    margin-right: 16px;

    path {
      fill: ${theme.colorPrimary};
    }
  `,
};
