import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  content: css`
    font-size: 15px;
  `,
  button: (theme: ITheme) => css`
    position: relative;
    display: inline-block;
    color: ${theme.colorDefault};
    padding: 0;

    :hover {
      color: ${theme.colorText};
      background: none;

      ::after {
        opacity: 1;
      }
    }

    ::after {
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: ${theme.colorText};
      opacity: 0;
      transition: 0.2s;
    }
  `,
};
