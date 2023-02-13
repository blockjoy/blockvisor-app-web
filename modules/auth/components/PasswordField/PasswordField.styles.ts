import { css } from '@emotion/react';
import { rgba } from 'polished';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (maxWidth: number) => (theme: ITheme) =>
    css`
      position: relative;
      @media ${breakpoints.toSml} {
        max-width: ${maxWidth}px;
      }
    `,
};
