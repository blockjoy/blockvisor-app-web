import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  tagList: (noPadding?: boolean) => css`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    ${!noPadding && `padding: 16px 0`};
    width: 100%;

    :hover .add-tag-button {
      opacity: 1;
      scale: 1;
    }
  `,
  tagListWrap: css`
    flex-wrap: wrap;
  `,
  extraTags: (theme: ITheme) => css`
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    height: 28px;
    min-width: 28px;
    padding: 0 8px;
    border-radius: 14px;
    background: ${theme.colorBorderGrey};
  `,
  tagAddButton: (isTagsEmpty?: boolean) => (theme: ITheme) =>
    css`
      background: ${theme.colorBorderGrey};
      border: 0;
      border-bottom: 1px solid transparent;
      padding: 0 14px 0 10px;
      height: 28px;
      border-radius: 28px;
      display: flex;
      gap: 6px;
      font-size: 12px;
      align-items: center;
      white-space: nowrap;
      cursor: pointer;
      color: ${theme.colorDefault};
      transition-property: opacity, visibility;
      transition-duration: 0.3s;

      @media ${breakpoints.toSml} {
        font-size: 16px;
      }

      svg path {
        transition: 0.3s;
      }

      :hover {
        color: ${theme.colorText};

        svg path {
          fill: ${theme.colorText};
        }
      }

      ${!isTagsEmpty &&
      css`
        width: 28px;
        padding: 0;
        display: grid;
        place-items: center;
      `}
    `,
  tagAddButtonNotEmpty: css`
    @media ${breakpoints.fromLrg} {
      opacity: 0;
      scale: 0;
    }
  `,
  tagAddInput: (theme: ITheme) => css`
    position: relative;
    display: inline-flex;
    align-items: center;
    outline: none;
    cursor: text;

    ::before {
      content: 'Tag Name';
      padding: inherit;
      display: flex;
      align-items: center;
      color: ${theme.colorPlaceholder};
      white-space: nowrap;
    }

    @media ${breakpoints.toSml} {
      font-size: 16px;
    }
  `,
  tagAddInputNotEmpty: css`
    ::before {
      opacity: 0;
      visibility: hidden;
      width: 0;
    }
  `,
  listItem: css`
    display: flex;
    align-items: center;
    height: 24px;
  `,
  iconButton: (theme: ITheme) => css`
    display: grid;
    place-items: center;
    padding: 0;
    width: 24px;
    height: 24px;
    margin-left: 6px;
    border-radius: 4px;
    background: ${theme.colorBorderGrey};
    border: 0;
    opacity: 0.7;
    cursor: pointer;
    transition: 0.3s;

    svg path {
      fill: ${theme.colorText};
    }

    @media ${breakpoints.toSml} {
      width: 28px;
      height: 28px;
    }

    :hover {
      opacity: 1;
      visibility: visible;
    }

    :disabled {
      opacity: 0.25;
      cursor: not-allowed;
    }
  `,
  addControls: css`
    display: flex;
    align-items: center;
  `,
};
