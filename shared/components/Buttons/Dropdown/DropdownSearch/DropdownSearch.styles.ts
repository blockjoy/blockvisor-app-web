import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  input:
    (isValid?: boolean, isEmptyValue?: boolean, isEmpty?: boolean) =>
    (theme: ITheme) =>
      css`
        background: transparent;
        border: 0;
        border-radius: 0;
        border-bottom: 1px solid ${theme.colorBorderGrey};
        outline: none;
        color: ${isValid || isEmptyValue || !isEmpty
          ? theme.colorText
          : theme.colorDanger};
        height: 44px;
        width: 100%;
        padding: 20px 12px;

        @media ${breakpoints.toMed} {
          min-width: 100%;
        }

        @media ${breakpoints.fromXLrg} {
          min-width: 100%;
        }
      `,
  empty: (isValid?: boolean, isEmptyValue?: boolean) => (theme: ITheme) =>
    css`
      padding: 12px;
      font-size: 12px;
      text-align: center;
      color: ${isValid || isEmptyValue
        ? theme.colorPlaceholder
        : theme.colorLabel};
    `,
};
