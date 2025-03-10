import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  variants: css`
    display: flex;
    gap: 30px 50px;
    flex-wrap: wrap;

    > li {
      flex: 1 1 23%;
      max-width: 23%;
      min-width: max-content;
    }
  `,
  variantHeader: (theme: ITheme) => css`
    font-size: 14px;
    margin-bottom: 20px;
    color: ${theme.colorDefault};
  `,
  versionDescription: (theme: ITheme) =>
    css`
      color: ${theme.colorLabel};
      margin-left: 10px;
      font-size: 14px;
    `,
  versionToggle: (isVisible: boolean) => (theme: ITheme) =>
    css`
      background: transparent;
      border: 0;
      padding: 0;
      color: ${theme.colorText};
      cursor: pointer;
      display: flex;
      align-items: center;

      ${!isVisible &&
      css`
        p {
          text-decoration: line-through;
        }
      `}

      :hover {
        color: ${theme.colorText};
      }

      :hover p {
        text-decoration: underline;
      }
    `,
};
