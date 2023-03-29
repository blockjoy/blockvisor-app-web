import { loadPersistedFilters } from '@modules/node/utils/loadPersistedFilters';
import { expect, vi, it, describe, afterEach } from 'vitest';

describe('loadPersisted filters', () => {
  it('should return null when nothing is found in localstorage', () => {
    const storageSpy = vi
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation(() => null);

    const result = loadPersistedFilters();

    expect(result).toEqual(null);
  });

  it('should persisted filters', () => {
    const storageSpy = vi
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation(() =>
        JSON.stringify({
          blockchain: [
            {
              name: 'some',
              id: '1',
              isChecked: true,
              isOnline: false,
            },
          ],
          status: [
            {
              name: 'status',
              id: '2',
              isChecked: true,
              isOnline: false,
            },
          ],
          type: [
            {
              name: 'type',
              id: '9',
              isChecked: true,
              isOnline: false,
            },
          ],
          health: 'ok',
        }),
      );

    const result = loadPersistedFilters();

    expect(result).toEqual({
      blockchain: [
        {
          name: 'some',
          id: '1',
          isChecked: true,
          isOnline: false,
        },
      ],
      status: [
        {
          name: 'status',
          id: '2',
          isChecked: true,
          isOnline: false,
        },
      ],
      type: [
        {
          name: 'type',
          id: '9',
          isChecked: true,
          isOnline: false,
        },
      ],
      health: 'ok',
    });
  });
});
