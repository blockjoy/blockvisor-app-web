import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  modal: css`
    padding-bottom: 24px;
    max-width: 600px;
  `,
  modalHeader: css`
    height: 20px;
    display: flex;
    align-items: center;
    margin-bottom: 32px;
  `,
  select: (theme?: ITheme) => css`
    position: relative;
    background: transparent;
    border-radius: 6px;
    border: 1px solid ${theme?.colorBorderGrey};
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    color: ${theme?.colorDefault};
    cursor: pointer;
    margin-bottom: 8px;

    :hover {
      color: ${theme?.colorText};
    }
  `,
};
