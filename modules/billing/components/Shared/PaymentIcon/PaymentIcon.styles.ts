import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 19px;

    :hover .tooltip {
      opacity: 1;
      visibility: visible;
    }

    svg {
      max-width: 100%;
      max-height: 100%;
    }
  `,
  icon: css`
    border-radius: 1px;
    overflow: hidden;
  `,
  iconBgColor: (bg: string) => (theme: ITheme) =>
    css`
      background-color: ${bg === 'white' ? theme.colorText : 'transparent'};
    `,
};
