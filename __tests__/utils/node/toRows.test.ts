import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { toRows } from '@modules/node/utils';
import { expect, it, describe, vi, expectTypeOf } from 'vitest';
import { mockedNodesResponse } from '__tests__/mocks/nodes';

describe('toRows', () => {
  it('should return undefined when there are no nodes', () => {
    const res = toRows(null);

    expect(res).toEqual(undefined);
  });

  it('should return a array of objects where key matches the node id and contains cells', () => {
    const res = toRows(
      mockedNodesResponse.map((n) => ({
        ...n,
        created: '',
        details: [],
        nodeTypeConfigDetails: [],
      })),
    );

    expectTypeOf(res).toMatchTypeOf<
      | {
          key: string;
          cells: {
            key: string;
            component: EmotionJSX.Element;
          }[];
        }[]
      | undefined
    >();
  });
});
