import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  tagList: css`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 16px 0;

    :hover .add-tag-button {
      opacity: 1;
    }
  `,
  tagListWrap: css`
    flex-wrap: wrap;
  `,
  tagAddButton: (theme: ITheme) => css`
    background: transparent;
    border: 0;
    border-bottom: 1px solid transparent;
    padding: 0;
    height: 24px;
    padding-right: 20px;
    text-align: left;
    white-space: nowrap;
    display: block;
    cursor: pointer;
    color: ${theme.colorDefault};

    :hover {
      color: ${theme.colorText};
    }
  `,
  tagAddButtonNotEmpty: css`
    @media ${breakpoints.fromLrg} {
      opacity: 0;
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
    width: 24px;
    height: 24px;
    margin-left: 6px;
    border-radius: 4px;
    background: ${theme.colorBorderGrey};
    border: 0;
    opacity: 0.7;
    cursor: pointer;
    transition: 0.3s;

    :hover {
      opacity: 1;
    }

    :disabled {
      opacity: 0.25;
      cursor: not-allowed;
    }
  `,
};
