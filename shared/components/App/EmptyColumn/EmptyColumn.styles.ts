import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  columnEmpty: css`
    margin: 56px 0;
    display: flex;
    align-items: center;
    gap: 8px 28px;
    flex-direction: column;

    @media ${breakpoints.fromTny} {
      flex-direction: row;
      justify-content: center;
    }

    & > figure {
      flex-basis: 160px;
      flex-shrink: 0;
      min-width: 160px;
    }
  `,
  columnAlign: (align: any) => css`
    @media ${breakpoints.fromTny} {
      flex-direction: row;
      justify-content: ${align === 'center' ? 'center' : 'flex-start'};
    }
  `,
  description: (hasMaxWidth?: boolean) => (theme: ITheme) =>
    css`
      margin-top: 8px;
      color: var(--color-text-3);
      ${hasMaxWidth && `max-width: 300px;`}

      a {
        position: relative;
        display: inline-block;
        color: ${theme.colorDefault};

        :hover {
          color: ${theme.colorText};

          ::after {
            opacity: 1;
            background: ${theme.colorText};
          }
        }

        ::after {
          content: '';
          display: block;
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 1px;
          background: ${theme.colorDefault};
          opacity: 0;
          transition: 0.2s;
        }
      }
    `,
};
