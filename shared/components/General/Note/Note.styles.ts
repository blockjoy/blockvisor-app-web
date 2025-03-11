import { css } from '@emotion/react';
import { rgba } from 'polished';
import { ITheme } from 'types/theme';

const NOTE_COLORS: Record<NoteType, keyof ITheme> = {
  info: 'colorText',
  success: 'colorSuccess',
  warning: 'colorNote',
  error: 'colorDanger',
};

export const styles = {
  wrapper: (type: NoteType) => (theme: ITheme) =>
    css`
      display: flex;
      flex-direction: row;
      gap: 10px;
      width: 100%;
      border-radius: 6px;
      padding: 1rem;
      background-color: ${rgba(theme[NOTE_COLORS[type]]!, 0.1)};
      border: 1px solid ${theme[NOTE_COLORS[type]]};
      line-height: 1.25;

      svg {
        margin-top: 2px;

        path {
          fill: ${theme[NOTE_COLORS[type]]};
        }
      }
    `,
  title: css`
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 8px;
    text-transform: uppercase;
  `,
  content: css`
    font-size: 14px;
  `,
};
