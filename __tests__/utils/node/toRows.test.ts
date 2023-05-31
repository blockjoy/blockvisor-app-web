import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { mapNodeListToRows } from '@modules/node/utils';
import { expect, it, describe, vi, expectTypeOf } from 'vitest';
import { mockedNodesResponse } from '__tests__/mocks/nodes';

describe('mapNodeListToRows', () => {
  it('should return undefined when there are no nodes', () => {
    const res = mapNodeListToRows();

    expect(res).toEqual({
      rows: undefined,
      headers: [
        {
          name: '',
          key: '1',
          width: '40px',
          minWidth: '40px',
          maxWidth: '40px',
        },
        {
          name: 'Name',
          key: '2',
          width: '300px',
        },
        {
          name: 'Added',
          key: '3',
          width: '200px',
        },
        {
          name: 'Status',
          key: '4',
          width: '200px',
        },
      ],
    });
  });

  it('should return a array of objects where key matches the node id and contains cells', () => {
    const res = mapNodeListToRows(
      mockedNodesResponse.map((n) => ({
        ...n,
        created: new Date(),
        details: [],
        nodeTypeConfigDetails: [],
      })),
    );

    expectTypeOf(res).toMatchTypeOf();
  });
});
