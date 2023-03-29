import { resultsStatus } from '@modules/node/utils';
import { expect, it, describe } from 'vitest';

describe('resultsStatus', () => {
  it('should return that there are no filtered nodes', () => {
    const result = resultsStatus(0, { blockchain: [] });
    expect(result).toEqual({ isFiltered: false, isEmpty: true });
  });

  it('should return filtered nodes', () => {
    const result = resultsStatus(1, {
      blockchain: ['1'],
      node_status: ['123'],
    });
    expect(result).toEqual({ isFiltered: true, isEmpty: false });
  });
});
