import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  dropdownMenuPosition: (
    buttonRect?: DOMRect | null,
    isSidebarOpen?: boolean,
    tagsLength?: number,
  ) => {
    const top = window.scrollY + (buttonRect?.top ?? 0);
    const topOffset = top + 30;
    const left = window.scrollX + (buttonRect?.left ?? 0);
    const leftOffset =
      (left < (isSidebarOpen ? 560 : 300) ||
        ((tagsLength ?? 0) < 3 && (tagsLength ?? 0) > 0)) &&
      window.innerWidth + 200 < left
        ? left
        : left - 200 + (buttonRect?.width ?? 0);

    const leftOffsetMobile = left > 220 ? left - 180 : left;

    return css`
      top: ${topOffset}px;
      left: ${leftOffset}px;

      @media ${breakpoints.toSml} {
        left: ${leftOffsetMobile}px;
      }
    `;
  },
  dropdown: css`
    min-width: 200px;
    max-width: 200px;
    top: 30px;
    right: 0;
    left: auto;
    overflow: initial;
  `,
  dropdownHeader: css`
    padding: 12px;
    border-bottom: 1px solid #ccc;
    display: flex;
    flex-flow: row wrap;
    gap: 5px;
  `,
  dropdownItem: css`
    display: block;
    padding: 7px 12px;
  `,
  dropdownButtonMain: (isOpen: boolean) => (theme: ITheme) =>
    css`
      border: none;
      border-radius: 8px;
      background: transparent;
      transition: box-shadow 0.3s;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &:hover,
      &:active,
      &:focus ${isOpen ? `, &` : null} {
        box-shadow: 0px 0px 0px 2px ${theme.colorInputOutline};
      }
    `,
  dropdownButton: (theme: ITheme) => css`
    width: 20px;
    height: 20px;
    transform: rotate(-90deg);
    > span {
      padding: 2px;
    }
  `,
  dropdownCount: (theme: ITheme) => css`
    font-size: 12px;
    padding: 3px 5px;
    width: auto;
    height: auto;
    color: ${theme.colorText};
    background-color: ${theme.colorOverlay};
  `,
  dropdownScrollbar: css`
    max-height: 144px;
  `,
};
