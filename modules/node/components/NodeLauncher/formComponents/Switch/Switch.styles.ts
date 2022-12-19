import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  input: (theme: ITheme) => css`
    position: absolute;
    scale: 0;

    :checked ~ .switch {
      border-color: ${theme.colorPrimary};
    }

    :checked ~ .switch::after {
      translate: 40px 0;
      background: ${theme.colorPrimary};
    }
  `,
  switch: (theme: ITheme) => css`
    display: block;
    width: 70px;
    height: 30px;
    padding: 3px;
    border-radius: 15px;
    border: 1px solid ${theme.colorLightGrey};
    transition: 0.3s;

    ::after {
      content: '';
      display: block;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: ${theme.colorLightGrey};
      transition: translate 0.3s;
    }
  `,
};
