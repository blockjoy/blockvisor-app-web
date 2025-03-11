import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  icon: (color?: string) => (theme: ITheme) =>
    css`
      padding: 7px;
      background-color: ${color ?? theme.colorDefault};
      border-radius: 50%;

      svg > circle {
        fill: ${color ?? theme.colorDefault};
      }
    `,
};
