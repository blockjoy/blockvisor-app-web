import { css } from '@emotion/react';
import { reset } from 'styles/utils.reset.styles';
import { typo } from 'styles/utils.typography.styles';
import { ITheme } from 'types/theme';

export const styles = {
  pagination: css`
    display: flex;
    gap: 4px;
    margin-top: 20px;
  `,
  item: (theme: ITheme) => css`
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    padding: 0;
    border: 0;
    border-radius: 3px;
    background: ${theme.colorLightGrey};
    color: ${theme.colorText};
    font-size: 14px;
    cursor: pointer;

    :disabled {
      opacity: 0.25;
    }
  `,
  active: (theme: ITheme) => css`
    background: ${theme.colorAccent};
    color: ${theme.colorPrimaryText};
  `,
  icon: css`
    display: grid;
    place-items: center;
    width: 16px;
    height: 16px;
  `,
};
