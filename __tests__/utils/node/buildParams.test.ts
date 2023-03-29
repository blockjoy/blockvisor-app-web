import { buildParams } from '@modules/node/utils';
import { expect, it, describe } from 'vitest';

describe('buildParams', () => {
  it('should return empty params when there are none', () => {
    const params = buildParams([], [], []);
    expect(params).toMatchObject({
      blockchain: [],
      node_type: [],
      node_status: [],
    });
  });

  it('should return checked IDs', () => {
    const params = buildParams(
      [
        { isChecked: true, id: '1' },
        { isChecked: true, id: '2' },
      ],
      [{ isChecked: true, id: '6' }],
      [{ isChecked: true, id: '8' }],
    );
    expect(params).toMatchObject({
      blockchain: ['1', '2'],
      node_type: ['6'],
      node_status: ['8'],
    });
  });
});
