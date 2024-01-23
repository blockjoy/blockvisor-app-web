import { css } from '@emotion/react';
import { ITheme } from 'types/theme';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: (theme: ITheme) => css`
    background-color: ${theme.colorTooltip};
    border-radius: 6px;
    padding: 20px;
    display: flex;
    max-height: calc(100vh - 388px);

    @media ${breakpoints.fromLrg} {
      max-height: calc(100vh - 268px);
    }

    @media ${breakpoints.fromXHuge} {
      margin-right: 20px;
    }
  `,
  scrollbar: css`
    flex: 1 1 auto;
    min-height: 0;
  `,
};
