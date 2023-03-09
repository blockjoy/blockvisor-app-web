import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    background-color: ${theme.colorCard};
    padding: 20px;
    border-radius: 4px;
    width: 100%;
    display: flex;
    flex-direction: column;

    @media ${breakpoints.fromSml} {
      flex: 1;
      width: 50%;
      max-width: 50%;
    }

    @media ${breakpoints.fromLrg} {
      width: 33%;
      max-width: 33%;
    }
  `,
  featured: (theme: ITheme) => css`
    background-color: ${theme.colorOverlay};
  `,
  titleWrapper: css`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  `,
  title: css`
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1.25px;
  `,
  featuredTitle: (theme: ITheme) => css`
    color: ${theme.colorPrimary};
  `,
  pricing: css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    text-transform: uppercase;
    margin: 32px 0 20px;
  `,
  price: css`
    font-size: 32px;
    color: #fff;
  `,
  priceLabel: (theme: ITheme) => css`
    font-size: 10px;
    line-height: 16px;
    color: ${theme.colorTextGrey};
    letter-spacing: 1.25px;
  `,
  priceInfo: css`
    font-size: 12px;
  `,
  listContainer: css`
    margin: 32px 0 20px;
    margin-bottom: 20px;
  `,
  list: css``,
  listItem: (theme: ITheme) => css`
    font-size: 14px;
    padding: 12px 0;
    border-top: 1px solid ${theme.colorBorderGrey};

    &:not(:last-child) {
      margin-bottom: 5px;
    }

    span {
      margin-left: 12px;
    }
  `,
};
