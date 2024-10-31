import { css } from '@emotion/react';

export const styles = {
  wrapper: (hasTags: boolean) => css`
    display: flex;
    flex-direction: ${hasTags ? 'column' : 'row'};
    ${!hasTags && 'align-items: center; padding-right: 2px;'}
    min-height: 25px;
  `,
  title: css`
    line-height: 1.6;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 8px;
  `,
};
