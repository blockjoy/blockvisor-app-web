import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';
import { styles as dropdownButtonStyles } from '@shared/components/Buttons/Dropdown/DropdownButton/DropdownButton.styles';

export const styles = {
  wrapper: css`
    @media ${breakpoints.fromXLrg} {
      min-width: 180px;
      margin-left: auto;
      display: flex;
      justify-content: flex-end;
    }
  `,
  dropdownButton: (size?: SortingSize) => (theme: ITheme) =>
    css`
      @media ${breakpoints.fromXLrg} {
        ${dropdownButtonStyles.button(theme)}

        ${size &&
        `
        height: auto;
        padding: 6px 10px;
  
        p {
          line-height: 1.25;
        }
        `}
      }

      @media ${breakpoints.toXlrg} {
        display: grid;
        place-items: center;
        background: transparent;
        border: 0;
        cursor: pointer;
        padding: 0 4px;
        height: 30px;
        width: 30px;
        border-radius: 6px;

        path {
          fill: ${theme.colorLabel};
        }

        &:hover,
        &:active,
        &:focus {
          background: ${theme.colorActive};
          & path {
            fill: ${theme.colorText};
          }
        }

        .dropdown-caret {
          display: none;
        }
      }
    `,
  dropdownButtonExtra: css`
    height: auto;
  `,
  dropdownMenu: css`
    top: 52px;
    left: 0;
    right: auto;
    overflow: hidden;
    max-width: 180px;
    min-width: 180px;

    @media ${breakpoints.toXlrg} {
      top: 36px;
    }
  `,
  buttonText: css`
    @media ${breakpoints.toXlrg} {
      display: none;
    }
  `,
};
