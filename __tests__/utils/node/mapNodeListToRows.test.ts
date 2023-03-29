import { mapNodeListToRows } from '@modules/node/utils/mapNodeListToRows';
import { expect, it, describe } from 'vitest';

describe('mapNodeListToRows', () => {
  it('should retunr undefined for rows', () => {
    const result = mapNodeListToRows();
    expect(result).toEqual({
      rows: undefined,
      headers: [
        {
          name: '',
          key: '1',
          width: '30px',
          minWidth: '30px',
          maxWidth: '30px',
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
