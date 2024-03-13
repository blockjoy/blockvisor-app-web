import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  form: css`
    display: grid;
    width: 100%;
    align-items: left;
    gap: 25px;

    @media ${breakpoints.fromSml} {
      grid-template-columns: repeat(2, 1fr);
    }
  `,
  labelWrapper: css`
    display: flex;
    flex-direction: column;
    gap: 5px;
  `,
  label: (theme: ITheme) => css`
    font-size: 14px;
    color: ${theme.colorText};
  `,
  labelDesc: (theme: ITheme) => css`
    font-size: 13px;
    color: ${theme.colorLabel};
  `,
};
