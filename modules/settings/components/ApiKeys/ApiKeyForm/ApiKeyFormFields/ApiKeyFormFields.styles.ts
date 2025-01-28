import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    display: grid;
    grid-template-rows: repeat(2, auto);
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  `,

  formField: css`
    margin-bottom: 0;
    grid-column: span 2;

    @media ${breakpoints.fromMed} {
      grid-column: span 1;
    }

    label + div {
      margin-bottom: 0;
    }
  `,
  permissions: css`
    grid-column: span 2;
  `,
  resourceType: css`
    @media ${breakpoints.fromMed} {
      grid-column-start: 1;
    }
  `,
  resourceId: (theme: ITheme) => css`
    button {
      background-color: ${theme.colorInput};
    }
  `,
};
