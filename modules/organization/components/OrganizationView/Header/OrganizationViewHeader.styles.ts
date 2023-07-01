import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  header: (theme: ITheme) => css`
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
    min-height: 82px;
    margin-bottom: 0;
    border-bottom: 1px solid ${theme.colorBorder};

    @media ${breakpoints.toLrg} {
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 16px;
      padding: 20px 0;
    }
  `,
};
