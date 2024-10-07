import { css } from '@emotion/react';

export const styles = {
  wrapper: (hasTags: boolean) => css`
    display: flex;
    flex-direction: ${hasTags ? 'column' : 'row'};
    ${!hasTags && 'align-items: center; padding-top: 2px; padding-bottom: 2px;'}
    gap: 7px;
  `,
};
