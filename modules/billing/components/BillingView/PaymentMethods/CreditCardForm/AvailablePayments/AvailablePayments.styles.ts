import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    display: flex;
    flex-flow: row nowrap;
    gap: 5px;
    align-content: center;
  `,
  icon: css`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 20px;

    :hover .tooltip {
      opacity: 1;
      visibility: visible;
    }

    svg {
      max-width: 100%;
      max-height: 100%;
    }
  `,
  iconOutline: (theme: ITheme) => css`
    padding: 2px;
    border: 1px solid ${theme.colorBorderGrey};
    border-radius: 2px;
  `,
};
