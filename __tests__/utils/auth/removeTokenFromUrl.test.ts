import { removeTokenFromUrl } from '@modules/auth';
import { expect, vi, it, describe, afterEach } from 'vitest';

describe('removeTokenFromUrl', () => {
  it('should remove token from url', async () => {
    Object.defineProperty(window, 'location', {
      get() {
        return {
          search: '?token=tokenValue',
          href: 'https://www.blockvisor.com/?token=tokenValue',
        };
      },
    });

    const spy = vi
      .spyOn(window.history, 'replaceState')
      .mockImplementation(async (data, unused, url) =>
        vi.fn(() => Promise.resolve()),
      );

    await removeTokenFromUrl();

    //expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith({}, '', 'https://www.blockvisor.com/');
  });
});
