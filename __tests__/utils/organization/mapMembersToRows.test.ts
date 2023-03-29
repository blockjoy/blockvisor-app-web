import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { mapMembersToRows } from '@modules/organization/utils/toRow';
import { it, describe, expectTypeOf } from 'vitest';

describe('mapMembersToRows', () => {
  it('should return empty headers and rows', () => {
    const result = mapMembersToRows([{ role: 'Admin', username: 'User' }]);

    expectTypeOf(result).toMatchTypeOf<
      {
        key: string;
        cells: {
          key: string;
          component: EmotionJSX.Element;
        }[];
      }[]
    >();
  });
});
