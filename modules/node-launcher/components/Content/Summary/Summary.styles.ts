import { css, keyframes } from '@emotion/react';
import { ITheme } from 'types/theme';

const spin = keyframes`
  100% {
    transform: rotate(1turn);
  }
`;

export const styles = {
  wrapper: (theme: ITheme) => css`
    background: ${theme.colorCard};
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 0px 2px ${theme.colorInputOutline};
  `,
  header: css`
    display: inline-flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    position: relative;
  `,
  title: css`
    font-weight: 700;
    font-size: 24px;
  `,
  item: css`
    display: flex;
    flex-direction: row wrap;
    gap: 50px;
  `,
  itemInner: css`
    min-width: 100px;
  `,
  itemTitle: (theme: ITheme) => css`
    font-size: 12px;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 10px;
    color: ${theme.colorTextGrey};
  `,
  itemContent: css`
    font-size: 18px;
    text-transform: capitalize;
  `,
  button: css`
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 12px;
  `,
  cogIcon: css`
    display: grid;
    place-items: center;
    width: 20px;
    height: 20px;
    animation: ${spin} 0.9s infinite linear;
  `,
  unathorized: css`
    margin-top: 20px;
    margin-bottom: 0;
    width: 100%;
  `,
  paymentMethods: css`
    position: relative;
    width: 100%;
    z-index: 4;
  `,
};
