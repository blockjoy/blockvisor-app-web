import { numOfItemsPerPage } from '@modules/node/utils';
import { mapNodeListToRows } from '@modules/node/utils/mapNodeListToRows';
import { expect, it, describe } from 'vitest';

describe('numOfItemsPerPage', () => {
  it('should return 18 items when innerWidth is < 568 px', () => {
    Object.defineProperty(window, 'innerWidth', {
      get() {
        return 500;
      },
    });

    const result = numOfItemsPerPage();
    expect(result).toEqual(18);
  });

  it('should return 48 items when innerWidth is > 2000px', () => {
    Object.defineProperty(window, 'innerWidth', {
      get() {
        return 2001;
      },
    });

    const result = numOfItemsPerPage();
    expect(result).toEqual(48);
  });

  it('should return 48 items when innerHeight is > 1000px', () => {
    Object.defineProperty(window, 'innerHeight', {
      get() {
        return 1001;
      },
    });

    const result = numOfItemsPerPage();
    expect(result).toEqual(48);
  });

  it('should return 48 items when innerHeight is > 1000px', () => {
    Object.defineProperty(window, 'innerHeight', {
      get() {
        return 1200;
      },
    });

    const result = numOfItemsPerPage();
    expect(result).toEqual(48);
  });

  it('should return 48 items when innerHeight is < 1000px', () => {
    Object.defineProperty(window, 'innerHeight', {
      get() {
        return 900;
      },
    });

    Object.defineProperty(window, 'innerWidth', {
      get() {
        return 900;
      },
    });

    const result = numOfItemsPerPage();
    expect(result).toEqual(36);
  });
});
