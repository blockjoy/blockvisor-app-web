import { buildParams } from '@modules/node/utils';
import { isInQuery } from '@modules/node/utils/isInQuery';
import { loadPersistedFilters } from '@modules/node/utils/loadPersistedFilters';
import { expect, vi, it, describe, afterEach } from 'vitest';
import { mockedNodesResponse } from '__tests__/mocks/nodes';

describe('isInQuery', () => {
  it('should return true when there is no id to match', () => {
    vi.mock('@modules/node/utils/loadPersistedFilters');
    vi.mocked(loadPersistedFilters).mockReturnValue({
      blockchain: [],
      status: [],
      type: [],
      health: '',
    });

    vi.mock('@modules/node/utils/buildParams');
    vi.mocked(buildParams).mockReturnValue({
      blockchain: [],
      node_type: [],
      node_status: [],
    });
    const [only] = mockedNodesResponse;
    const result = isInQuery(only);

    expect(result).toEqual(true);
  });

  it('should return false when blockchainID is loaded from local storage ', () => {
    vi.mock('@modules/node/utils/loadPersistedFilters');
    vi.mocked(loadPersistedFilters).mockReturnValue({
      blockchain: [],
      status: [],
      type: [],
      health: '',
    });

    vi.mock('@modules/node/utils/buildParams');
    vi.mocked(buildParams).mockReturnValue({
      blockchain: ['1', 'b766f36a-4bdb-42a1-8cc1-edcfb343eb45'],
      node_type: ['6'],
      node_status: ['8'],
    });
    const [only] = mockedNodesResponse;
    const result = isInQuery(only);

    expect(result).toEqual(false);
  });
});
