import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  header: css`
    display: flex;
    flex-flow: row wrap;
    gap: 20px;
  `,
  headline: css`
    margin-bottom: 20px;
  `,
  backToDefault: (theme: ITheme) => css`
    position: relative;
    display: inline-block;
    color: ${theme.colorDefault};
    margin-left: 10px;
    height: 18px;

    :hover {
      color: ${theme.colorText};

      ::after {
        opacity: 1;
        background: ${theme.colorText};
      }
    }

    ::after {
      content: '';
      display: block;
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 1px;
      background: ${theme.colorDefault};
      opacity: 0;
      transition: 0.2s;
    }
  `,
};
