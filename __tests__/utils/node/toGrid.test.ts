import { toGrid } from '@modules/node/utils';
import { expect, it, describe, vi, expectTypeOf } from 'vitest';
import { mockedNodesResponse } from '__tests__/mocks/nodes';

describe('toGrid', () => {
  it('should return an empty array when there are no nodes', () => {
    const callbackFunc = vi.fn();
    const res = toGrid([], callbackFunc);

    expect(res).toEqual([]);
  });

  it('should return an object whose key matches the node id', () => {
    const callbackFunc = vi.fn();
    const res = toGrid(
      mockedNodesResponse.map((n) => ({
        ...n,
        created: '',
        details: [],
        nodeTypeConfigDetails: [],
      })),
      callbackFunc,
    );
    expectTypeOf(res).toMatchTypeOf([
      { key: '5303423e-557b-4088-b24f-5835bd1b4889' },
    ]);
  });
});
