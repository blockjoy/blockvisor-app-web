import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  ip: css`
    display: flex;
    align-items: center;
    gap: 10px;
  `,
  ipAssigned: css`
    opacity: 0.66;
    text-decoration: line-through;
  `,
  ipListLink: (theme: ITheme) => css`
    position: relative;
    color: ${theme.colorText};
    line-height: inherit;
    opacity: 0.88;
  `,
  ipListLinkAssigned: css`
    :hover {
      text-decoration: underline;
      opacity: 1;
    }
  `,
};
