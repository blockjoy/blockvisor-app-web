import { handleTokenFromQueryString } from '@modules/auth/utils/handleTokenFromQueryString';
import { expect, vi, it, describe } from 'vitest';
import { decodedToken } from '__tests__/mocks/auth';

describe('handleTokenFromQueryString', () => {
  it('should extract email from token', () => {
    const spy = vi
      .spyOn(
        {
          setValue: () => {},
        },
        'setValue',
      )
      .mockImplementation(vi.fn);

    handleTokenFromQueryString(decodedToken, spy as any);

    expect(spy).toBeCalledWith('email', 'thomas@blockjoy.com');
  });
});
