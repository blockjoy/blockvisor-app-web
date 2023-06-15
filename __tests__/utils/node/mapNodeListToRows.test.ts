import { mapNodeListToRows } from '@modules/node/utils/mapNodeListToRows';
import { expect, it, describe } from 'vitest';

describe('mapNodeListToRows', () => {
  it('should return undefined for rows', () => {
    const result = mapNodeListToRows();
    expect(result).toEqual({
      rows: undefined,
      headers: [
        {
          name: '',
          key: '1',
          width: '40px',
          minWidth: '60px',
          maxWidth: '100px',
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
});
