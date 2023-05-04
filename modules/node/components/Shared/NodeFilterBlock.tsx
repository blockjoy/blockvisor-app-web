import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

const styles = {
  filterBlock: (theme: ITheme) => css`
    margin-right: 8px;
    padding: 12px;
    border-radius: 4px;
    border: 1px solid ${theme.colorBorder};
    cursor: pointer;
  `,
};

export const NodeFilterBlock = () => {};
