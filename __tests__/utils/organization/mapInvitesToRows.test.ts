import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { mapInvitesToRows } from '@modules/organization/utils/toRow';
import { it, describe, expectTypeOf } from 'vitest';

describe('mapMembersToRows', () => {
  it('should return empty headers and rows', () => {
    const result = mapInvitesToRows([
      { inviteeEmail: 'env@test.com', createdAtString: new Date() },
    ]);

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
