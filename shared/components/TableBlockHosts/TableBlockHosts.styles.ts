import { css, keyframes } from '@emotion/react';
import { ITheme } from 'types/theme';

const spin = keyframes`
0% {
  transform: translateX(-100%);
}
100% { 
  transform: translateX(200%); 
}
`;

export const styles = {
  wrapper: css`
    display: block;
    padding-right: 20px;
  `,
  spinner: (theme: ITheme) => css`
    display: none;
    flex: 0 0 100px;
    position: relative;
    overflow: hidden;
    width: 130px;
    height: 2px;
    border-radius: 3px;
    background: ${theme.colorLightGrey};

    @media only screen and (min-width: ${theme.screenSm}) {
      display: block;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: ${theme.colorPrimary};
      border-radius: inherit;
      animation: ${spin} 1.5s infinite cubic-bezier(0.69, 0.2, 0.9, 0.55);
    }
  `,
  name: (theme: ITheme) => css`
    display: flex;
    gap: 30px;
    align-items: center;
    margin-bottom: 10px;
    color: ${theme.colorText};
  `,
  nameText: css`
    flex: 0 0 auto;
  `,
  row: (theme: ITheme) => css`
    display: flex;
    flex-direction: column;
    gap: 8px;

    @media only screen and (min-width: ${theme.screenSm}) {
      flex-direction: row;
      gap: 0;
    }
  `,
  location: (theme: ITheme) => css`
    color: ${theme.colorDefault};

    @media only screen and (min-width: ${theme.screenSm}) {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 130px;
    }
  `,
  address: (theme: ITheme) => css`
    color: ${theme.colorLabel};

    @media only screen and (min-width: ${theme.screenSm}) {
      flex-direction: row;
      gap: 0;
    }
  `,
};
