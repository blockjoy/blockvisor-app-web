import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { mapInvitesToRows } from '@modules/organization/utils/toRow';
import { it, describe, expectTypeOf } from 'vitest';
import { mockedInvitations } from '__tests__/mocks/invitations';

describe('mapMembersToRows', () => {
  it('should return empty headers and rows', () => {
    const result = mapInvitesToRows(mockedInvitations);

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
