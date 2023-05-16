import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

const handleGap = (size: string) => {
  switch (size) {
    case 'small':
      return '4px';
    case 'medium':
      return '8px';
    default:
      return '12px';
  }
};

export const styles = {
  base: (size: any) => (theme: ITheme) =>
    css`
      color: ${theme.colorTextGrey};
      width: 100%;
      display: flex;
      justify-content: flex-start;
      gap: ${handleGap(size)};
      align-items: center;
      min-width: 100%;
      cursor: pointer;

      &,
      &:visited {
        color: ${theme.colorTextGrey};
      }

      & :global(svg) {
        color: var(--color-text-5-o20);
        flex-basis: 12px;
        transition: color 0.18s var(--transition-easing-cubic);
        pointer-events: none;
      }

      &:hover,
      &:active,
      &:focus {
        text-decoration: none;
        background-color: rgb(255 255 255 / 10%);

        & :global(svg) {
          color: var(--color-text-5);
        }
      }
    `,
  small: css`
    padding: 8px 12px;
  `,
  medium: css`
    padding: 12px;
  `,
  large: css`
    padding: 16px 12px;
  `,
};
