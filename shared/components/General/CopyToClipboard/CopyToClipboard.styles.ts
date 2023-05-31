import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    position: relative;
    padding: 10px;
    background: ${theme.colorInput};
    border: 1px solid #F8FAF6;
    border: 1px solid rgb(248, 250, 246, .1);
    border-radius: 10px;
    display: flex;
    align-items: center;
  }`,
  value: (theme: ITheme) => css`
    padding: 5px 10px;
    font-size: 14px;
    color: #fff;
    border: none;
    outline: none;
    background-color: ${theme.colorInput};
    margin-right: auto;
  }`,
  button: css`
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
    margin-left: auto;

    &::before {
      content: "Copied";
      position: absolute;
      top: -45px;
      right: 0px;
      background: #5c81dc;
      padding: 8px 10px;
      border-radius: 20px;
      font-size: 15px;
      display: none;
    }

    &::after {
      content: "";
      position: absolute;
      top: -20px;
      right: 25px;
      width: 10px;
      height: 10px;
      background: #5c81dc;
      transform: rotate(45deg);
      display: none;
    }
  }`,

  buttonActive: css`
    ::before {
      display: block;
    }
    ::after {
      display: block;
    }
  `,
};
