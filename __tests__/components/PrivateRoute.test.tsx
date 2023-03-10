import { expect, vi, it, describe } from 'vitest';
import { render, screen } from '../renderer';
import { PrivateRoute, useIdentity } from '@modules/auth';
import { useRouter } from 'next/router';
import { useRouterSpy } from '../utils';
import { routerMockBuilder } from '__tests__/mocks/router';
import { mockUseIdentityValue } from '__tests__/mocks/auth';

describe('Private Route', () => {
  vi.mock('@modules/auth/hooks/useIdentity');

  useRouterSpy.mockImplementation(() =>
    routerMockBuilder({ pathname: '/some' }),
  );

  const router = useRouter();
  it('should redirect to /login when user is not authenticated', () => {
    vi.mocked(useIdentity).mockReturnValue({
      ...mockUseIdentityValue({ isLoggedIn: false }),
    });
    render(
      <PrivateRoute router={router}>
        <div>Dummy Component</div>
      </PrivateRoute>,
    );

    expect(router.push).toHaveBeenCalledWith({
      pathname: '/login',
      query: { redirect: router.asPath },
    });
  });

  it('should redirect to requested route', () => {
    vi.mocked(useIdentity).mockReturnValue({
      ...mockUseIdentityValue({ isLoggedIn: true, isLoading: false }),
    });
    render(
      <PrivateRoute router={router}>
        <div data-cy="dummy-component">Dummy Component</div>
      </PrivateRoute>,
    );

    expect(screen.getByDataCy('dummy-component')).toBeTruthy();
  });
});
