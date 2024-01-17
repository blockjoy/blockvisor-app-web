import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  card: (theme: ITheme) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 40px 30px 24px;
    height: 200px;
    min-height: 200px;
    max-height: 200px;
    border-radius: 6px;
    border: 1px solid ${theme.colorBorderGrey};
  `,
  cardTotal: (theme: ITheme) => css`
    cursor: pointer;

    label {
      cursor: pointer;
    }

    :hover var::after {
      opacity: 1;
      visibility: visible;
    }
  `,
  cardTitle: css`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 30px;
  `,
  cardIcon: (theme: ITheme) => css`
    display: grid;
    place-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: ${theme.colorInput};

    path {
      fill: ${theme.colorPrimary};
    }
  `,
  cardLabel: (theme: ITheme) => css`
    display: block;
    color: ${theme.colorDefault};
    margin-bottom: 2px;
  `,
  cardValue: (theme: ITheme) => css`
    position: relative;
    font-style: normal;
    font-size: 34px;

    ::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -2px;
      right: 0;
      height: 1px;
      background: ${theme.colorText};
      opacity: 0;
      visibility: hidden;
      transition: 0.3s;
    }
  `,
};
